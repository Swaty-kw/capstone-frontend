import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

const AppointmentTimeCard = () => {
  const [backgroundColor, setBackgroundColor] = useState("#CEF9F2");
  return (
    <TouchableOpacity
      onPress={() => {
        setBackgroundColor("#FFFFFF");
      }}
      style={{
        backgroundColor: backgroundColor,
        height: 65,
        width: 130,
        borderRadius: 25,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    
        <Text
          style={{
            fontSize: 17,
          }}
        >
          {" "}
          7:30 AM
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentTimeCard;
