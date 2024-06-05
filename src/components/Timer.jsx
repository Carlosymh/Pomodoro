import { View, Text, StyleSheet } from "react-native";

export default function Timer({time}){
    const fomattedTime = `${Math.floor(time/60).toString().padStart(2,"0")}:${(time%60).toString().padStart(2,"0")}`
    return (
        <View style={styles.timeContairner}>
            <Text style={styles.time}>{fomattedTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timeContairner:{
        flex:1,
        width:'80%',
        marginHorizontal:'auto',
        justifyContent:"center",
        backgroundColor: "#F2F3F2",
        padding:15,
        borderRadius:250,
    },
    time:{
        fontSize:80,
        fontWeight:"bold",
        textAlign:"center",
        color:'#1C2833'
    }
})