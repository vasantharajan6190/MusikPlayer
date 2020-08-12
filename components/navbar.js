import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
function Navbar(){
    return(
        <View style={styles.navbar}>
        <Image style={styles.tinyLogo} source={{uri:"https://yt3.ggpht.com/Xr6clny0x026rDtZrYxyjknGPjWB3ty_mlzBfff0JFrbhJkd-FA3vFPVcWD-x7umG77U_ZEJ-Q=s900-c-k-c0xffffffff-no-rj-mo"}}/>
        <Text style={styles.moosik} >MUSIK</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    navbar:{
        height:60,
        backgroundColor:"#404040",
        flexDirection:"row",
        marginTop:27,
        paddingVertical:6
      },
      tinyLogo: {
        width: 50,
        height: 50,
        paddingTop:10
      },
      moosik:{
        fontWeight:"700",
        fontSize:20,
        color:"white",
        paddingLeft:0,
        paddingTop:10,
      }
})

export default Navbar