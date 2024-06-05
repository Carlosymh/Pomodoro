import { View, Text, TouchableOpacity, StyleSheet} from "react-native"

const options = ["Work", "Long Break", "Short Break"]
export default function Header({currentTime, setCurrentTime,setTime}){
    function handlesPress(index){
        const newTime= index === 0 ? 25: index === 1 ? 15 :5;
        setCurrentTime(index);
        setTime(newTime*60);

    }

    return <View style ={{flexDirection:"row", margin:"auto"}}>
        {options.map((item, index)=>(
            <TouchableOpacity 
            key={index} 
            onPress={()=>handlesPress(index)}
            style={[
                styles.itemStyle,
                currentTime !== index && {borderColor: "transparent",backgroundColor: "transparent"},
                ]}
            >
                <Text style={{fontWeight:"bold",fontSize:15, color:'#1C2833'}}>{item}</Text>
            </TouchableOpacity>
        
        ))}
    </View>

}

const styles = StyleSheet.create({
    itemStyle:{
        width:"33%",
        alignItems:"center",
        borderWidth:3,
        padding:5,
        borderRadius:10,
        borderColor:"white",
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        marginVertical:20,

    }
})