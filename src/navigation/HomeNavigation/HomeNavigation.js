import Home from "../../screens/Home";
import PetDetails from "../../screens/PetDetails";
import BookAppointment from "../../screens/BookAppointment";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "../index";
import AddPet from "../../screens/AddPet";
import FloatingAiButton from "../../components/FloatingAiButton";
import AiVet from "../../screens/AiVet";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const [showAiChat, setShowAiChat] = useState(false);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name={NAVIGATION.HOME.HOME} component={Home} />
        <Stack.Screen
          name={NAVIGATION.HOME.PET_DETAILS}
          component={PetDetails}
          options={{
            title: "Pet Details",
            headerStyle: {
              backgroundColor: "#F0F8F8",
            },
            headerTintColor: "#64C5B7",
          }}
        />
        <Stack.Screen
          name={NAVIGATION.SERVICE.BOOK_APPOINTMENT}
          component={BookAppointment}
        />
        <Stack.Screen name={NAVIGATION.HOME.ADD_PET} component={AddPet} />
      </Stack.Navigator>

      {/* <FloatingAiButton onPress={() => setShowAiChat(true)} /> */}
      {/* <AiVet visible={showAiChat} onClose={() => setShowAiChat(false)} /> */}
    </>
  );
};

export default HomeNavigation;
