import React, { useState, useContext, useEffect } from "react";
import { Context } from "../App";
import { StyleSheet, Text, TouchableOpacity,Image,Slider, View,ScrollView } from "react-native";
import Navbar from "./navbar";
import { Entypo,
  FontAwesome5,
  Fontisto,
  MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library'
import { useHistory } from "react-router-dom";
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

function Allsongs() {
  const main = useContext(Context);
  const [song, setsong] = main.song;
  const [allsongs, setallsongs] = main.allsongs;
  const [pause, setpause] = main.pause;
  const [songpage,setsongpage]  = useState(false)
  const [playing,setplaying] = useState(false)
  const [seconds,setseconds] = useState(0)
  const [intervalid,setintervalid] = useState(0)
  const [minutes,setminutes] = useState(0)
  const [audiodata,setaudiodata] = useState({
    isPlaying:true,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false
  })
  const [playpause,setplaypause] = useState()
  const permiss = Permissions.askAsync(Permissions.CAMERA_ROLL);
  const soundObject = new Audio.Sound();
  useEffect(()=>{
   getsongs()
  },[])
  async function getsongs(){
    let { status } = await MediaLibrary.requestPermissionsAsync()
    let media = await MediaLibrary.getAssetsAsync({
      first: 1000,
      mediaType: MediaLibrary.MediaType.audio,
    })
    let insert = []
    media.assets.map((e,index=0)=>{
      let newdata = e
      newdata.name = e.filename
      newdata.id = index
      newdata.duration = (e.duration/60).toFixed(2)
      insert.push(newdata)
    })
    setallsongs(insert)
}
  function gotosong(){
    setsongpage(true)
    // history.push("/song")
  }
  function back(){
    setsongpage(false)
    // history.push("/allsongs")
  }
  useEffect(()=>{
    if(song.name){
    handlePlayPause()
    }
  },[playing])
  useEffect(()=>{
    if( song.name ){
    pause?setplaying(true):setplaying(false) 
    pause?timeset():clearInterval(intervalid)
    }
  },[pause])
  async function pausepress(){
    setpause(!pause)
  }
  useEffect(()=>{
   if(seconds>0){
    setminutes(seconds%3600/60)
   }
  },[seconds])
  function timeset(){
    let interval = setInterval(()=>{
      setseconds(prev=>prev+1)
  },1500)
  setintervalid(interval)
  }
  async function loadAudio(){
    const {currentIndex, isPlaying, volume,isBuffering} = audiodata
    try {
      const playbackInstance = new Audio.Sound()
      const status = {
        shouldPlay: isPlaying,
        volume,
        isBuffering
      }
      const source = {
        uri: song.uri.slice(7)
      }
      setplaying(true)
       playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate(status))     
       await playbackInstance.loadAsync(source, status, false)
      setaudiodata({...audiodata,playbackInstance})
      handlePlayPause()
      } catch (e) {
        console.log(e)
      }
  }
 const handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = audiodata
    playing ?await playbackInstance.playAsync(): await playbackInstance.pauseAsync()
  }
  
  const onPlaybackStatusUpdate = status => {
    setaudiodata({
      ...audiodata,
      isBuffering:status.isBuffering
    })
  }
  async function audiodefault(){
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      setAudioStreamType : Audio.STREAM_MUSIC,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false
    })
    loadAudio()
  }
  async function some(){
if(song.name){
    setsongpage(true)
      setpause(true)
     
      let {playbackInstance }= audiodata
      if(playbackInstance){
        await playbackInstance.unloadAsync()
      }
      audiodefault()
    }
  }
  useEffect(()=>{
    if(song.name){
      some()
    }
  },[song])
  async function selectedsong(e){
    const soundObject = new Audio.Sound();
    clearInterval(intervalid)
    setsong(e) 
    setseconds(0)
    setminutes(0)
    // history.push("/song")
  }
   async function forward(){
    let songid = song.id
    setpause(true)
    setseconds(0)
    clearInterval(intervalid)
    setminutes(0)
    let playbackInstance = audiodata.playbackInstance
    await playbackInstance.unloadAsync()
    if(songid === allsongs.length-1){
    songid=0
     allsongs.map(async e=>{
      if(e.id===songid){
         setsong(e)
      }
    })
    }
    else{
      songid +=1
      allsongs.map(e=>{
        if(e.id===songid){
            setsong(e)
        }
      })
    }
  }
  async function backward(){
    clearInterval(intervalid)
    let songid = song.id
    let playbackInstance = audiodata.playbackInstance
    await playbackInstance.unloadAsync()
    setpause(true)
    setseconds(0)
    setminutes(0)
    if(songid === 0){
    songid=allsongs.length-1
     allsongs.map(e=>{
      if(e.id===songid){
         setsong(e)
      }
    })
    }
    else{
      songid -=1
      allsongs.map(e=>{
        if(e.id===songid){
           setsong(e)
        }
      })
    }
  }
  
  return (
    <View>
    {songpage?
      <View>
      <Navbar />
      <View style={styles.container}>
        <View style={{ alignSelf: "stretch",marginTop:20 }}>
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

              <Text style={{ fontSize: 22, fontWeight: "700", color: "black",width:300 }}>
                {song.name}
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
        <Text style={{ fontWeight: "700", fontSize: 16 }}>{minutes.toFixed(2)}</Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>{song.duration}</Text>
      </View>
      <View style={{ marginTop: 0 }}>
        <Slider
          style={{ height: 40 }}
          maximumTrackTintColor="black"
          minimumTrackTintColor="orange"
          thumbTintColor="orange"
          step = {1}
         minimumValue={0}
         onValueChange = {e=>{
            setseconds(e)
         }}
         maximumValue={(song.duration)*60}
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
      :
    <View>
    <View style={styles.container}>
      <Navbar />
{ song.name?
      <View style={{alignItems:"center",marginTop:4}}>
      <Text style={{paddingLeft:10,fontWeight:"700",marginTop:7,marginBottom:8,height:27,padding:2}}>PLAYING NOW</Text>
      </View>:null
  }
  {song.name?
      <View style={styles.bottomitems}>
      <TouchableOpacity onPress={gotosong} style={{paddingTop:2,flexDirection:"row",width:330,overflow:"hidden"}}>
        <Text style={{ fontWeight: "600", fontSize: 20,width:300 }}>{song.name}</Text>
        </TouchableOpacity>
        {pause ? (
          <FontAwesome5
            name="pause"
            onPress={pausepress}
            size={27}
            color="black"
            style={{paddingTop:4}}
          />
        ) : (
          <FontAwesome5
            name="play"
            onPress={pausepress}
            size={27}
            color="black"
            style={{paddingTop:4}}
          />
        )}
      </View>
        :null}
      <View style={{alignItems:"flex-start",paddingLeft:10}}>
      <Text style={{paddingLeft:10,fontWeight:"700",marginTop:20,color:"gray"}}>ALL SONGS</Text>
      </View>
  
    </View>
    {song.name?
      <View style={{marginTop:240}}>
    <ScrollView>
      {
        allsongs.map((data,index)=>
          (
            <TouchableOpacity onPress={()=>selectedsong(data)} key={index} style={{width:380,marginLeft:6,flexDirection:"row",paddingHorizontal:20,paddingVertical:10,justifyContent:"space-between",marginVertical:5,backgroundColor:"#fcfcfc"}}>
            <View>
            {data.name.length>30?
              <Text style={{fontWeight:"700",fontSize:16}}>{data.name.slice(0,30)}</Text>
              :
              <Text style={{fontWeight:"700",fontSize:16}}>{data.name}</Text>
            }
            </View>
            <Text style={{fontWeight:"700",fontSize:14}}>{data.duration}</Text>
            </TouchableOpacity>
          )
        )
      }
      </ScrollView>
    </View>
      :
      <View style={{marginTop:140}}>
      <ScrollView>
        {
          allsongs.map((data,index)=>
            (
              <TouchableOpacity onPress={()=>selectedsong(data)} key={index} style={{width:380,marginLeft:6,flexDirection:"row",paddingHorizontal:20,paddingVertical:10,justifyContent:"space-between",marginVertical:5,backgroundColor:"#fcfcfc"}}>
              <View>
{data.name.length>30?
  <Text style={{fontWeight:"700",fontSize:16}}>{data.name.slice(0,30)}</Text>
  :
  <Text style={{fontWeight:"700",fontSize:16}}>{data.name}</Text>
}

              <Text>{data.artist}</Text>
              </View>
              <Text style={{fontWeight:"700",fontSize:14}}>{data.duration}</Text>
              </TouchableOpacity>
            )
          )
        }
        </ScrollView>
      </View>
    }
    </View>
  }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  bottomitems: {
    width:380,
    marginLeft:6,
    paddingTop:15,
    paddingHorizontal:16,
    marginTop:34,
    flexDirection:"row",
    justifyContent: "space-between",
    height:70,
    shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 3
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

export default Allsongs;
