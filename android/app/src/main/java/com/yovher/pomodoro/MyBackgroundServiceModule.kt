import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import androidx.core.content.ContextCompat.getSystemService
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import kotlinx.coroutines.*

class MyBackgroundService : Service(isActive,) {

    private val TAG = "MyBackgroundService"
    private val INTERVAL_MILLIS = 1000L // 1 second
    private var timerJob: Job? = null
    private val localBroadcastManager = LocalBroadcastManager.getInstance(this)

    private var time = 5 * 60 // Initial time in seconds
    private var currentTime = "SHORT" // Initial current time state

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Service onCreate")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "Service onStartCommand")

        // Start timer in a coroutine to avoid blocking the main thread
        timerJob = CoroutineScope(Dispatchers.IO).launch {
            while (isActive()) {
                delay(INTERVAL_MILLIS)
                time -= 1

                // Update time and broadcast changes to React Native
                updateTimerAndBroadcast()

                if (time == 0) {
                    stopTimer()
                    sendStateChangeBroadcast("BREAK") // Change state to "BREAK"
                    time = when (currentTime) {
                        "SHORT" -> 5 * 60
                        "BREAK" -> 15 * 60
                        "POMO" -> 25 * 60
                        else -> throw IllegalStateException("Unexpected currentTime state")
                    }
                }
            }
        }

        return START_STICKY // Restart service if killed unexpectedly
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "Service onDestroy")
        stopTimer()
    }

    private fun isActive(): Boolean {
        // Implement logic to check if the service should be running based on your app's requirements
        // This could involve checking a flag set from React Native or user interaction
        return true // Placeholder for your logic
    }

    private fun stopTimer() {
        timerJob?.cancel()
        timerJob = null
    }

    private fun updateTimerAndBroadcast() {
        val formattedTime = formatTime(time)

        // Send the updated time to React Native using a LocalBroadcast
        val intent = Intent("time_update")
            .putExtra("currentTime", formattedTime)
            .putExtra("remainingTime", time)
        localBroadcastManager.sendBroadcast(intent)
    }

    private fun sendStateChangeBroadcast(newState: String) {
        val intent = Intent("state_change")
            .putExtra("currentState", newState)
        localBroadcastManager.sendBroadcast(intent)
    }

    private fun formatTime(seconds: Int): String {
        val minutes = seconds / 60
        val remainingSeconds = seconds % 60
        return String.format("%02d:%02d", minutes, remainingSeconds)
    }
}
