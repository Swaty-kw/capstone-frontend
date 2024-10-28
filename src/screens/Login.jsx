import { View, Text } from "react-native";
import React, { useState, useContext } from "react";
import TextField from "../components/Textfield";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import WelcomeButton from "../components/WelcomeButton";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/Auth";
import UserContext from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const STATUSBAR_HEIGHT = Constants.statusBarHeight;

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () =>
      login({
        username: username,
        password: password,
      }),
    onSuccess: () => {
      setUser(true);
      // Direct to main navigation
    },
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: STATUSBAR_HEIGHT,
        },
      ]}
    >
      <Text style={styles.headerText}>
        Signin to keep track of your pet's care and well-being
      </Text>

      <View style={styles.formContainer}>
        <TextField
          color="#5CCBAB"
          placeholder="Username"
          borderColor="#64C5B7"
          placeholderTextColor="#5CCBAB"
          backgroundColor="white"
          secureTextEntry={false}
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          color="#5CCBAB"
          borderColor="#64C5B7"
          placeholder="Password"
          placeholderTextColor="#5CCBAB"
          backgroundColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <WelcomeButton
          text="Sign in"
          color="#64C5B7"
          width="50%"
          height="10%"
          onPress={() => {
            /* Handle sign in */
            console.log({
              username: username,
              password: password,
            });
            mutate();
          }}
        />
      </View>
    </View>
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
    backgroundColor: "#64C5B7",
    padding: 20,
    paddingBottom: 0,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 15,
    color: "#64C5B7",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "rrgba(175, 230, 218, 0.8)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    // height: "	100%",
    flex: 1,
    // backgroundColor: "white",
  },
});

export default Login;
