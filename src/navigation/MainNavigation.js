import { View, Text } from "react-native";
import React from "react";
import NAVIGATION from ".";
import HomeNavigation from "./HomeNavigation/HomeNavigation";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={NAVIGATION.HOME.INDEX} component={HomeNavigation} />
      <Tab.Screen
        name={NAVIGATION.SERVICE.INDEX}
        component={ServiceNavigation}
  
      />
      <Tab.Screen
        name={NAVIGATION.PROFILE.INDEX}
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
