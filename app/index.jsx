import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image
} from "react-native";
import Header  from './../src/components/Header';
import Timer  from './../src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#A9DFBF","#EFFBA8","#D5F0FE"];

export default function HomeScreen() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25*60);
  const [currentTime, setCurrentTime] = useState( "WORK" | "SHORT" | "BREAK" );
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
      setTime(Number(currentTime) === 0 ? 25*60 : Number(currentTime) === 1 ? 15*60 :5*60);
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
          flex: 0.6,
          paddingHorizontal: 15,  
          paddingTop: Platform.OS === "android" && 35 }}>
        <View style={styles.containersheader}>
            <View style={styles.leftContainer}>
                <Image source={require('../assets/images/Logo-PlayStore.png')} style={styles.image}>
                </Image>
            </View>
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Pomodoro</Text>
                
            </View>
        </View>
        <Header  currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime}/>
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color:"white",fontSize:22, fontWeight: "bold"}}>
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
  button:{
    alignItems:"center",
    backgroundColor:"#1C2833",
    padding:10,
    marginTop:20,
    borderRadius:25,
    marginBotton:10,
  },
  containersheader:{
    flexDirection:'row',
  },
  leftContainer:{
  },
  rightContainer:{
      marginLeft:2

  },
  title:{
    fontSize:37,
    fontWeight: "bold",
    color:'#1C2833'
  },
  image:{
      width:50,
      height:50,

  }
});
