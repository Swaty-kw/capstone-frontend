import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const WelcomeButton = ({text, color, width, height}) => {
  return (
    <TouchableOpacity style={{backgroundColor:color, width:width, height:height, borderRadius:30, alignItems:"center", justifyContent:"center"}}><Text style={{color: "white"}}>{text}</Text></TouchableOpacity>
  )
}




export default WelcomeButton