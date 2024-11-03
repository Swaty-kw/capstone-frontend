import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import NAVIGATION from ".";
import HomeNavigation from "./HomeNavigation/HomeNavigation";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AiVet from "../screens/AiVet";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, color, icon }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Ionicons
      name={focused ? icon : `${icon}-outline`}
      size={24}
      color={focused ? "#64C5B7" : "#91ACBF"}
    />
  </View>
);

const MainNavigation = () => {
  const [isDrPawVisible, setIsDrPawVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "#91ACBF",
          tabBarActiveTintColor: "#64C5B7",
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 20,
            right: 20,
            backgroundColor: "#FFFFFF",
            borderRadius: 50,
            height: 60,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            borderTopWidth: 0,
            paddingTop: 5,
            paddingBottom: 5,
            opacity: 1,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name={NAVIGATION.HOME.INDEX}
          component={HomeNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} icon="home" />
            ),
          }}
        />
        <Tab.Screen
          name={NAVIGATION.SERVICE.INDEX}
          component={ServiceNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} icon="calendar" />
            ),
          }}
        />
        <Tab.Screen
          name="DrPaw"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setIsDrPawVisible(true);
            },
          }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} icon="chatbubble" />
            ),
          }}
        />
        <Tab.Screen
          name={NAVIGATION.PROFILE.INDEX}
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} icon="person" />
            ),
          }}
        />
      </Tab.Navigator>

      <AiVet
        visible={isDrPawVisible}
        onClose={() => setIsDrPawVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  activeIconContainer: {
    backgroundColor: "rgba(100, 197, 183, 0.1)", // Light version of your theme color
    transform: [{ scale: 1 }],
  },
});

export default MainNavigation;
