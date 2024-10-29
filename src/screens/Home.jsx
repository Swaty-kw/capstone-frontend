import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PetCard from '../components/PetCard'
const Home = () => {
    // 
  return (
    <View>
        <ScrollView>
            <PetCard/>
            <PetCard/>
            <PetCard/>
            <PetCard/>
            <PetCard/>
            

        
        </ScrollView>
    </View>
  )
}

export default Home