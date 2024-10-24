import {Image, View, Text } from 'react-native'
import React from 'react'
// {width, height, petImage, petName, petBreed}
const PetIdBlock = () => {
  return (
    <View style={{flexDirection:'row', gap:20 , height:100, width:'100%'}}>
      <View>
            <Image style={{ width:100, height:100, borderRadius:50}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfqqNGW1yUTzEtl3OsyaP_X9zHGaLVI_S9A&s"}} />
      </View>
      <View style={{flexDirection:'column', gap:10 , justifyContent:'center'}}>
            <Text style={{fontSize:30, fontWeight:'bold', color:"#64C5B7"}}>Pet name</Text>
            <Text style={{color:"#64C5B7"}}>Pet breed</Text>
      </View>
    </View>
  )
}

export default PetIdBlock