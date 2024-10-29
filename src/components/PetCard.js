import { View, Text } from 'react-native'
import React from 'react'
import QuickInfo from './QuickInfo'
import WelcomeButton from './WelcomeButton'
import PetIdBlock from './PetIdBlock'

const PetCard = () => {
  return (
    <View style={{gap:5 , backgroundColor:"#f0f7f5", borderRadius:20, margin:5, padding:2}}>
            <PetIdBlock/>
            <View style={{flexDirection:'row', gap:5 }}>
              <QuickInfo color={"#F26445"} backgroundColor={"#e5eeee"} upcomingEvent={"Vaccination:"} date={"4 Feb 2025"}/>
              <QuickInfo color={"#64C5B7"} backgroundColor={"#e1f0ed"} upcomingEvent={"Medication:"} date={"No Medication"}/>
              <QuickInfo color={"#91ACBF"} backgroundColor={"#e1f0ed"} upcomingEvent={"Appointment:"} date={"20 Jan 2025"}/>
              
            </View>
            <View style={{alignItems:'center', margin:5}}>
            <WelcomeButton text={"More"} color={"#64C5B7"} width={100} height={30}/>
            </View>
        </View>
  )
}

export default PetCard