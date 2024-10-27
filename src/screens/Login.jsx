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
        in to keep track of your pet's care and well-being
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
    backgroundColor: "#64C5B7",
    padding: 20,
    paddingBottom: 0,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "white",
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
