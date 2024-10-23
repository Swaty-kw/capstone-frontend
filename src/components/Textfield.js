import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Submitbutton from "./Submitbutton";

const TextField = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Register to start managing your pet's health and happiness in one place.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
        />
        <Submitbutton />
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
    height: "100%",

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
    borderColor: "#e0a3a3", // Light red border color
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8d7da", // Light red background for inputs
    marginBottom: 10,
    // Additional styles to match the design
    fontSize: 16,
    color: "#333", // Dark text color for input
    width: "100%",
  },
});

export default TextField;
