import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "../index";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import OnBoarding from "../../screens/OnBoarding";

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  const navigator = useNavigation();
  const [user] = useContext(UserContext);
  if (user) {
    navigator.navigate(NAVIGATION.MAIN.HOME);
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION.AUTH.ONBOARDING} component={OnBoarding} />
      <Stack.Screen name={NAVIGATION.AUTH.LOGIN} component={Login} />
      <Stack.Screen name={NAVIGATION.AUTH.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
