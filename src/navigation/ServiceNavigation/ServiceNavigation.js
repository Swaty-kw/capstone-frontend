import { View, Text } from "react-native";
import React from "react";
import Review from "../../screens/Review";
import BookAppointment from "../../screens/BookAppointment";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "../index";
import ChooseService from "../../screens/ChooseService";
const Stack = createNativeStackNavigator();

const ServiceNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.SERVICE.CHOOSE_SERVICE}
        component={ChooseService}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.SERVICE.BOOK_APPOINTMENT}
        component={BookAppointment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.SERVICE.REVIEW}
        component={Review}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ServiceNavigation;
