import { View, Text } from "react-native";
import React from "react";
import UserProfile from "../../screens/UserProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "../index";
const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.PROFILE.PROFILE}
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
