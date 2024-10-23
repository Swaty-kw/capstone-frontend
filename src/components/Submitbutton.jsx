import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Submitbutton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10, // Adjust margin as needed to position under the input
  },
  button: {
    backgroundColor: "#f26445",
    // Button color
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Submitbutton;
