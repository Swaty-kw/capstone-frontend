import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Submitbutton from "../components/Submitbutton";
import TextField from "../components/Textfield";

const Register = () => {
  return (
    <View style={{ backgroundColor: "#F4F7EC" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <TextField />
        </View>
      </View>
    </View>
  );
};

export default Register;
