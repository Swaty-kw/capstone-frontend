import Home from '../../screens/Home';
import PetDetails from '../../screens/PetDetails';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NAVIGATION from '../index';
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.HOME.HOME} component={Home}/>
      <Stack.Screen name={NAVIGATION.HOME.PET_DETAILS} component={PetDetails}/>
    </Stack.Navigator>
  )
}

export default HomeNavigation