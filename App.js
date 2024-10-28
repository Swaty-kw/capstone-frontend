import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import UserProfile from "./src/screens/UserProfile";
const queryClient = new QueryClient();
import Register from "./src/screens/Register";
import PetDetails from "./src/screens/PetDetails";
import MyAppointments from "./src/screens/MyAppointments";
import Review from "./src/screens/Review";
import { registerCallableModule, TextInput } from "react-native";
import WelcomeButton from "./src/components/WelcomeButton";
import PetIdBlock from "./src/components/PetIdBlock";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="pet Id Blok" component={PetIdBlock} /> */}
          <Stack.Screen name="Profile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
