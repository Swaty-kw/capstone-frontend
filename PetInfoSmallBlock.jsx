import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PetInfoSmallBlock = () => {
  return (
    <SafeAreaView style={{
        backgroundColor: "#d8f3f0",
        height: "35%",
        width: "50%",
        borderRadius: 25,
        justifyContent: "center",
      
    }}>
        <View style={{
            alignItems: "flex-start",
            justifyContent: 'flex-end',
            
            padding: 10,
            
            
        }}>
            <Text style={{ fontSize: 16, color: "#5db7a3" }}>Gender</Text>
            <Text style={{ fontSize: 20, color: "#5db7a3", fontWeight: "bold" }}>Male</Text>
        </View>
    </SafeAreaView>
  )
}

export default PetInfoSmallBlock
