import {TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import NAVIGATION from '../navigation/index'
const AddButton = () => {

  const navigation = useNavigation();

    const handleButton = () => {
      navigation.navigate(NAVIGATION.HOME.ADD_PET);
        console.log("Add button clicked");
    }

  return (
    <TouchableOpacity style={{backgroundColor:"white",borderColor:"green", justifyContent:'center', alignItems: 'center', borderRadius:30 , height:200, margin:10, shadowOffset:{width:0, height:2}, shadowOpacity:0.05, elevation:3, shadowColor:"#000", shadowRadius:8}} onPress={handleButton}>
        <Text style={{fontSize:25, fontWeight:'bold', color: '#64C5B7'}}>Add Pet</Text>
        <Text style={{fontSize:30, fontWeight:'bold', color: '#64C5B7'}}>+</Text>
    </TouchableOpacity>
  )
}

export default AddButton