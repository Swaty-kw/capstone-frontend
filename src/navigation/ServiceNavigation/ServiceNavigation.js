import { View, Text } from 'react-native'
import React from 'react'
import Review from '../../screens/Review'
import MyAppointments from '../../screens/MyAppointments'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NAVIGATION from '../index';
const Stack = createNativeStackNavigator();

const ServiceNavigation = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name={NAVIGATION.SERVICE.MY_APPOINTMENTS} component={MyAppointments}/>
    <Stack.Screen name={NAVIGATION.SERVICE.REVIEW} component={Review}/>
   </Stack.Navigator>
  )
}

export default ServiceNavigation