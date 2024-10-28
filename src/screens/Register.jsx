import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import TextField from "../components/Textfield";
import Submitbutton from "../components/Submitbutton";

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orangeBackground} />
      <View style={styles.whiteOverlay} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Register to start managing your pet's health and happiness in one
          place.
        </Text>
        <View style={styles.formContainer}>
          <TextField
            color="#F37558"
            backgroundColor="white"
            placeholder="Email"
            style={styles.input}
            borderColor="#F37558"
          />
          <TextField
            color="#F37558"
            backgroundColor="green"
            placeholder="Username"
            style={styles.input}
            borderColor="#F37558"
          />
          <TextField
            color="#64C5B7"
            backgroundColor="white"
            placeholder="Password"
            style={styles.input}
            borderColor="#F37558"
          />
          <TextField
            color="#F37558"
            backgroundColor="white"
            placeholder="Confirm password"
            style={styles.input}
            borderColor="#F37558"
          />
          <Submitbutton title="Register" color="#F37558" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  orangeBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "80%",
    backgroundColor: "#F37558",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  whiteOverlay: {
    position: "absolute",
    top: "27%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    zIndex: 2,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    width: "100%",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 60,
  },
  input: {
    marginBottom: 15,
  },
});

export default Register;
