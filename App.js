import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "./src/screens/OnBoarding";
import UserProfile from "./src/screens/UserProfile";
import Home from "./src/screens/Home";
const queryClient = new QueryClient();

import { Text, View } from "react-native";

import { deleteToken, getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Services from "./src/screens/Services";
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
          {user ? (
            <View style={{ flex: 1 }}>
              <Text>Home Page</Text>
            </View>
          ) : (
            <Stack.Navigator>
              {/* <Stack.Screen name="Services" component={Services} /> */}

              <Stack.Screen name="OnBoarding" component={OnBoarding} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
