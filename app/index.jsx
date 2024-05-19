import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Header  from './../src/components/Header';
import Timer  from './../src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#F7DC6F","#A2D9CE","#D7BDE2"];

export default function HomeScreen() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25*60);
  const [currentTime, setCurrentTime] = useState( "POMO" || "SHORT" || "BREAK" );
  const [isActive, setIsActive] = useState(false);
  useEffect(()=>{
    let interval= null;

    if(isActive){
      interval = setInterval(()=>{
        setTime(time-1);
      },1000);
    }else{
      clearInterval(interval);
    }

    if(time == 0){
      setIsActive(false);
      setIsWorking((prev)=>!prev);
      setTime(Number(currentTime) === 0 ? 25*60 : Number(currentTime) === 1 ? 5*60 :15*60);
    }

    return ()=> clearInterval(interval);
  },[isActive, time])

  function handleStartStop(){
    playSound();
    setIsActive(!isActive);
  }
  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("./../assets/notifications_34.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[Number(currentTime) || 0]}]}>
      <View style={{
          flex: 0.5,
          paddingHorizontal: 15,  
          paddingTop: Platform.OS === "android" && 35 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header  currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime}/>
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color:"white", fontWeight: "bold"}}>
            {isActive ? "STOP": "START"}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  text:{
    fontSize:32,
    fontWeight: "bold"
  },
  button:{
    alignItems:"center",
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius:15,
    marginBotton:20,
  }
});
