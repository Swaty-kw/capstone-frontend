import { View, Text } from "react-native";
import React from "react";
import NAVIGATION from ".";
import HomeNavigation from "./HomeNavigation/HomeNavigation";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#64C5B7",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION.HOME.INDEX}
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION.SERVICE.INDEX}
        component={ServiceNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION.PROFILE.INDEX}
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
