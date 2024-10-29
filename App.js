import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

const queryClient = new QueryClient();

import { Text, View } from "react-native";

import { deleteToken, getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import QuickInfo from "./src/components/QuickInfo";

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
              component={Home}
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
