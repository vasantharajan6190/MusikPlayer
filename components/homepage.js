import React from "react"
import { StyleSheet, Text, View,ImageBackground,Image} from "react-native"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
function Homepage(){
    const history = useHistory()
    setTimeout(function(){ 
        history.push("/allsongs")
     }, 5000)
    return(
        <View style={{marginTop:28}}>
        <ImageBackground style={{width:"100%",height:"100%"}} source={{uri:"https://cutewallpaper.org/21/background-gif-1920x1080/gif-Backgrounds-Wallpaper-Cave.gif"}}>
       <View style={styles.center}>
       <Image style={styles.tinyLogo} source={{uri:"https://yt3.ggpht.com/Xr6clny0x026rDtZrYxyjknGPjWB3ty_mlzBfff0JFrbhJkd-FA3vFPVcWD-x7umG77U_ZEJ-Q=s900-c-k-c0xffffffff-no-rj-mo"}}/>
       <Text style={styles.font}>
        MUSIK
        </Text>
        <Text style={{color:"azure",marginTop:10,fontStyle:"italic",fontSize:16}}>
        Welcome to world of Rhythm
        </Text>
        </View>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },
    font:{
        fontSize:32,
        fontWeight:"700",
        color:"white",
        marginTop:15
    },
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius:10,
        borderWidth: 3,
        marginTop:25,
        borderColor: "azure"
      }
})

export default Homepage