import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
const queryClient = new QueryClient();
import TextField from "./src/components/Textfield";
import { TextInput } from "react-native";
import WelcomeButton from "./src/components/WelcomeButton";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="welcome button" component={WelcomeButton} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
