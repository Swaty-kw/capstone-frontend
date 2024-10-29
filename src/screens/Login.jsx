import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import TextField from "../components/Textfield";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import WelcomeButton from "../components/WelcomeButton";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/Auth";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation";

const Login = () => {
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <View style={styles.tealBackground} />
      <Text style={styles.headerText}>
        Signin to keep track of your pet's care and well-being
      </Text>

      <View style={styles.formContainer}>
        <TextField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#64C5B7"
          color="#64C5B7"
          borderColor="#64C5B7"
        />
        <TextField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#64C5B7"
          color="#64C5B7"
          borderColor="#64C5B7"
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ paddingBottom: 10, color: "#64C5B7" }}>
            Dont have an Account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.AUTH.REGISTER)}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
  tealBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "45%",
    backgroundColor: "#64C5B7",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  headerText: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    lineHeight: 42,
    paddingHorizontal: 40,
    marginTop: 60,
  },
  formContainer: {
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 40,
    paddingTop: 60,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 0.5,
    borderColor: "#64C5B7",
    borderRadius: 30,
    paddingHorizontal: 25,
    marginBottom: 20,
    fontSize: 20,
    color: "#64C5B7",
  },
  signInButton: {
    backgroundColor: "#64C5B7",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 80,
  },
  signInText: {
    color: "white",
    fontSize: 20,
    fontWeight: "300",
  },
  signUpText: {
    color: "#64C5B7",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Login;
