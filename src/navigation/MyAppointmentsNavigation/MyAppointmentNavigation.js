import { View, Text } from 'react-native'
import React from 'react'
import MyAppointments from '../../screens/MyAppointments'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "../index";

const Stack = createNativeStackNavigator();


const MyAppointmentNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={NAVIGATION.MY_APPOINTMENTS.MY_APPOINTMENTS} component={MyAppointments} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default MyAppointmentNavigation

