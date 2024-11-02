import { View, Text } from 'react-native'
import React from 'react'

const QuickInfo = ({color, backgroundColor, upcomingEvent, date}) => {
  return (
    <View style={{backgroundColor:backgroundColor, width:120, height:120 , borderRadius:40, padding:20, justifyContent:'space-around' }}>
      
      <Text style={{color:color, fontWeight:"bold", fontSize:15 }}>Next</Text>
      <Text style={{color:color, fontWeight:"bold", fontSize:12}}>{upcomingEvent}</Text>
      <Text style={{color:color, fontWeight:'medium', fontSize:13}}>{date}</Text>
    </View>
  )
}

export default QuickInfo