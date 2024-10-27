import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import TextField from "../components/Textfield";
import Constants from "expo-constants";
import WelcomeButton from "../components/WelcomeButton";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/Auth";
import UserContext from "../context/UserContext";


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const STATUSBAR_HEIGHT = Constants.statusBarHeight;
  const [user, setUser] = useContext(UserContext);

  const {mutate} = useMutation({
    mutationKey: ["register"],
    mutationKey: () => register({
      email: email,
      username: username,
      password: password
    }),
    onSuccess: () => {
    //  setUser(true);
     // alert("successfuly registerd!");
      console.log("successfuly registerd!")
       // Direct to main navigation
    }
  });

  const userInfo = {
    email: email,
    username: username,
    password: password
  }

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
        Register to start managing your pet's health and happiness in one place.
      </Text>

      <View style={styles.formContainer}>
        <TextField
          color="#f26445"
          placeholder="Email"
          backgroundColor="white"
          borderColor="#f26445"
          placeholderTextColor="white"
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          color="#f26445"
          placeholder="Username"
          placeholderTextColor="white"
          borderColor="#f26445"
          backgroundColor="white"
          secureTextEntry={false}
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          color="#f26445"
          placeholder="Password"
          placeholderTextColor="white"
          borderColor="#f26445"
          backgroundColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextField
          color="#f26445"
          placeholder="Confirm password"
          placeholderTextColor="white"
          borderColor="#f26445"
          backgroundColor="white"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <WelcomeButton
          text="Register"
          color="#f26445"
          width="50%"
          height="10%"

          onPress={() => {
            /* Handle registration */
        //    console.log(userInfo);
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
    backgroundColor: "#f26445",
    padding: 20,
    paddingBottom: 0,
    justifyContent: "center",
    radius: 0.25,
  },
  headerText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    // height: "	100%",
    flex: 1,
    // backgroundColor: "white",
  },
});

export default Register;
