import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FloatingAiButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.icon}>🤖</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#64C5B7",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
  },
});

export default FloatingAiButton;
