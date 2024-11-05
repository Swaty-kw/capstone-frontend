import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Submitbutton from "./Submitbutton";

const TextField = ({
  color,
  backgroundColor,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  value,
  borderColor,
  onChangeText,
}) => {
  return (
    <View style={{ width: "100%" }}>
      {/* <Text style={styles.title}>
        Register to start managing your pet's health and happiness in one place.
      </Text> */}
      <View style={{ width: "100%", marginBottom: 15 }}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholderTextColor={color}
          backgroundColor={"white"}
          value={value}
          style={{
            color: color,
            height: 50,
            borderColor: borderColor, // Light red border color
            borderWidth: 1,
            borderRadius: 50,
            paddingHorizontal: 15,
            backgroundColor: "white",
            marginBottom: 10,
            alignSelf: "stretch",
            width: "100%",
            fontFamily: "TeluguMN",
          }}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f26445",
    backgroundOpacity: 66,
    height: "60",

    // Light background color
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Dark text color
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#e0a3a3",
    borderWidth: 2,
    borderRadius: 25, // Changed from 10 to 25 for more rounded corners
    paddingHorizontal: 15,
    backgroundColor: "#f8d7da",
    marginBottom: 10,
    // Additional styles to match the design
    fontSize: 16,
    color: "#333", // Dark text color for input
    width: "100%",
    fontFamily: "TeluguMN", // Add this line to use the new font
  },
  registerButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
  },
  loginButton: {
    borderColor: "#f26445",
    borderWidth: 1,
    borderRadius: 25,
  },
});

export default TextField;
