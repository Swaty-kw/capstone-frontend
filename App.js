import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import Profile from "./src/screens/Profile";
const queryClient = new QueryClient();

import { TextInput } from "react-native";
import WelcomeButton from "./src/components/WelcomeButton";
import PetIdBlock from "./src/components/PetIdBlock";
import AppointmentCard from "./src/components/AppointmentCard";
import Register from "./src/screens/Register";
import { getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import CalanderButton from "./src/components/CalanderButton";
import apointmentCard from "./src/components/AppointmentTimeCard";
import AppointmentTimeCard from "./src/components/AppointmentTimeCard";
import BookingAppointment from "./src/components/BookingAppointment";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="pet Id Blok" component={PetIdBlock} /> */}
            <Stack.Screen
              name="Register"
              component={BookingAppointment}
              options={{
                headerTitle: "Book an appointment",
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
