import {Image, useWindowDimensions,  View, Text } from 'react-native'
import React from 'react'

const CarouselItem = ({item}) => {

    const {width} = useWindowDimensions();
  return (
    <View style={[{width}]}>
        <View >
            <Text style={{color:"green", fontWeight:'bold' }}>{item.text}</Text>
        </View>
      <Image style={{borderRadius:20,  width:250, resizeMode:'contain'}} source={item.image}/>
    </View>
  )
}

export default CarouselItem
