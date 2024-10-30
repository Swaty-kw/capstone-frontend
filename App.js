import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { deleteToken, getToken, logout } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigation/MainNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import { createStackNavigator } from "@react-navigation/stack";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

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
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
