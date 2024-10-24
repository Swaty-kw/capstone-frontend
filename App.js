import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import Profile from "./src/screens/Profile";
const queryClient = new QueryClient();

import { TextInput } from "react-native";
import WelcomeButton from "./src/components/WelcomeButton";
import PetIdBlock from "./src/components/PetIdBlock";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="pet Id Blok" component={PetIdBlock} /> */}
          {/* <Stack.Screen name="Profile" component={Profile} /> */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
