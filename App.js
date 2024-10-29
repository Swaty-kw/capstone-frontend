import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from './src/screens/BookingScreen';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

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
          <Stack.Navigator>
            <Stack.Screen 
              name="Booking" 
              component={BookingScreen}
              options={{ title: 'Booking' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
