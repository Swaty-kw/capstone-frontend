import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import TextField from "../components/Textfield";
import Submitbutton from "../components/Submitbutton";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greenBackground} />
      <View style={styles.whiteOverlay} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Sign in to keep track of your pet's care and well-being.
        </Text>
        <View style={styles.formContainer}>
          <TextField
            color="#64C5B7"
            backgroundColor="white"
            placeholder="Username"
            style={styles.input}
            borderRadius={50}
            borderColor="#64C5B7"
          />
          <TextField
            color="#64C5B7"
            backgroundColor="white"
            placeholder="Password"
            style={styles.input}
            borderRadius={25}
            borderColor="#64C5B7"
          />
          <Submitbutton title="Sign in" color="#64C5B7" />
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
  greenBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "80%",
    backgroundColor: "#64C5B7",
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
    paddingTop: 40,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    width: "100%",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
    height: 50,
  },
});

export default Login;
