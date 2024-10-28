import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CalanderButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "red",
        borderRadius: 35,
        padding: 10,
        height: 100,
        width: 85,
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 17 }}>Sun</Text>
        <Text style={{ fontSize: 17 }}>12</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CalanderButton;
