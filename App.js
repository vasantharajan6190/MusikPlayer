import React,{useState,createContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from "react-router-native";
import Homepage from "./components/homepage"
import Allsongs from "./components/allsongs"
import Song from "./components/song"

export const Context = createContext()
export const Contextvariables = props=>{
  const [song,setsong] = useState({})
  const [url,seturl] = useState({})
  const [allsongs,setallsongs] = useState([])
  const [pause,setpause] = useState(false)
  return(
    <Context.Provider value={{
      song:[song,setsong],
    allsongs:[allsongs,setallsongs],
    pause:[pause,setpause],
    url:[url,seturl]
    }}>
    {props.children}
    </Context.Provider>
  )
}
export default function App() {
  return (
   
    <NativeRouter> 
    <Contextvariables>
    <View>
      <Route path="/" exact component={Homepage} />
      <Route path="/allsongs" exact component={Allsongs} />
      <Route path="/song" exact component={Song} />
    </View>
    </Contextvariables>
    </NativeRouter>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar:{
    height:50,
    backgroundColor:"#404040",
    flexDirection:"row"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  moosik:{
    fontWeight:"700",
    fontSize:20,
    color:"white",
    paddingLeft:0,
    paddingTop:9,
  }
});
