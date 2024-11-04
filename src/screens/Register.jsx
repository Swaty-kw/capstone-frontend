import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import TextField from "../components/Textfield";
import Constants from "expo-constants";
import WelcomeButton from "../components/WelcomeButton";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/Auth";
import UserContext from "../context/UserContext";
import Submitbutton from "../components/Submitbutton";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const STATUSBAR_HEIGHT = Constants.statusBarHeight;
  const [user, setUser] = useContext(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () =>
      register({
        email: email,
        username: username,
        password: password,
        phone: phone,
      }),
    onSuccess: () => {
      setUser(true);
      alert("successfuly registerd!");

      // Direct to main navigation
    },
    onError: (error) => {
      console.log("Error fetching data");
    },
  });

  const userInfo = {
    email: email,
    username: username,
    password: password,
    phone: phone,
  };

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
            color="#F37558"
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "#F37558" }}>Already have an account ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(NAVIGATION.AUTH.LOGIN)}
            >
              <Text style={styles.signInText}> Sign in</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 40,
  },
  input: {
    marginBottom: 15,
  },
  signInText: {
    color: "#F37558",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Register;
