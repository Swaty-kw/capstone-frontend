import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Submitbutton from "../components/Submitbutton";
import TextField from "../components/Textfield";

const Register = () => {
  return (
    <View style={{ backgroundColor: "#F4F7EC" }}>
      <View
        //    { <Text style={styles.title}>
        //     Register to start managing your pet's health and happiness in one place.
        //   </Text> }
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <TextField
            color="black"
            backgroundColor="#f26445"
            placeholder="Email"
          />
          <TextField
            color="black"
            backgroundColor="#f26445"
            placeholder="Password"
          />
          <TextField
            color="black"
            backgroundColor="#f26445"
            placeholder="Confirm Password"
          />
          <Submitbutton />
        </View>
      </View>
    </View>
  );
};

export default Register;
