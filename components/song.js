import React, { useState, useContext,useEffect } from "react";
import { Context } from "../App";
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { useHistory } from "react-router-dom"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider
} from "react-native";
import Navbar from "./navbar";

import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialIcons
} from "@expo/vector-icons";
function Song() {
  const main = useContext(Context);
  const [song, setsong] = main.song;
  const [allsongs, setallsongs] = main.allsongs;
  const [pause, setpause] = main.pause
  const [url,seturl] = main.url
  const history = useHistory()
  const soundObject = new Audio.Sound();
  const gray = "#91A1BD";
  function back(){
    // history.push("/allsongs")
  }
  function pausepress(){
    setpause(!pause)
  }
  function forward(){
    let songid = song.id
    if(songid === allsongs.length-1){
    songid=0
     allsongs.map(e=>{
      if(e.id===songid){
         return setsong(e)
      }
    })
    }
    else{
      songid +=1
      allsongs.map(e=>{
        if(e.id===songid){
           return setsong(e)
        }
      })
    }
  }
  function backward(){
    let songid = song.id
    if(songid === 0){
    songid=allsongs.length-1
     allsongs.map(e=>{
      if(e.id===songid){
         return setsong(e)
      }
    })
    }
    else{
      songid -=1
      allsongs.map(e=>{
        if(e.id===songid){
           return setsong(e)
        }
      })
    }
  }
  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <View style={{ alignSelf: "stretch" }}>
          <View style={{ marginHorizontal: 32, marginTop: 22 }}>
            <View style={styles.topcontainer}>
            <MaterialIcons name="keyboard-backspace" size={27} onPress={back} style={{borderRadius:50,padding:5,borderWidth:1}} color="black"  />
            <Text style={styles.playing}>PLAYING NOW</Text>
              <Entypo
                name="menu"
                size={26}
                style={{borderRadius:50,padding:5,borderWidth:1}}
              />
            </View>
            <View style={{ marginTop: 130, alignItems: "center" }}>
              {pause ? (
                <Image
                  style={{ width: 700, height: 150 }}
                  source={{
                    uri:
                      "https://flevix.com/wp-content/uploads/2019/07/Music-Preloader-1.gif",
                  }}
                />
              ) : (
                <Image
                  style={{ width: 700, height: 150 }}
                  source={require("../assets/pauseimg.jpg")}
                />
              )}

              <Text style={{ fontSize: 22, fontWeight: "700", color: "black" }}>
                {song.name}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "grey" }}>
                {song.artist}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 510,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>0.00</Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>{song.duration}</Text>
      </View>
      <View style={{ marginTop: 0 }}>
        <Slider
          style={{ height: 40 }}
          maximumTrackTintColor="black"
          minimumTrackTintColor="orange"
          thumbTintColor="orange"
        />
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Fontisto onPress={backward} name="step-backwrad" size={25} color="black" />
        {pause ? (
          <FontAwesome5
            name="pause"
            onPress={pausepress}
            size={27}
            color="black"
          />
        ) : (
          <FontAwesome5
            name="play"
            onPress={pausepress}
            size={25}
            color="black"
          />
        )}
        <Fontisto  onPress={forward} name="step-forward" size={25} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:7
  },
  playing: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Song;
