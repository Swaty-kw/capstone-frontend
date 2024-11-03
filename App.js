import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "./src/screens/OnBoarding";
import UserProfile from "./src/screens/UserProfile";
import Home from "./src/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import MainNavigation from "./src/navigation/MainNavigation";

const queryClient = new QueryClient();

import { Text, View } from "react-native";

import { deleteToken, getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Services from "./src/screens/Services";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      console.log(token);
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {user ? <MainNavigation /> : <AuthNavigation />}
          {/* <Login /> */}
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
