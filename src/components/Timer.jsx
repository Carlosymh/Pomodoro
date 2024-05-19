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
        justifyContent:"center",
        backgroundColor: "#f2f2f2",
        padding:15,
        borderRadius:15,

    },
    time:{
        fontSize:80,
        fontWeight:"bold",
        textAlign:"center"
    }
})