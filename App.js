import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigation/MainNavigation";

const queryClient = new QueryClient();

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
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
