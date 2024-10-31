import { View, Text, ScrollView, Switch, Button } from "react-native";
import React, { useState } from "react";
import TextField from "../components/Textfield";
import { TouchableOpacity } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { addPet } from "../api/pets";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AddPet = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAllergies, setPetAllergies] = useState("");
  const [weight, setWeight] = useState(0.0);
  const [selectedImage, setSelectedImage] = useState("");
  const [petGender, setPetGender] = useState(false);
  const [petMedication, setPetMedication] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const increaseWeight = () => {
    setWeight(weight + 1);
  };
  const decreaseWeight = () => {
    setWeight(weight - 1);
    if (weight < 1) {
      setWeight(weight + 1);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const { data } = useMutation({
    mutationKey: ["AddPet"],
    mutationFn: () =>
      addPet({
        name: petName,
        species: petSpecies,
        breed: petBreed,
        image: selectedImage,
        gender: petGender,
        allergies: petAllergies,
        weight: weight,
        medication: petMedication,
      }),
  });

  return (
    <View>
      <Text>AddPet</Text>

      <ScrollView>
        <TextField
          color={"#1239"}
          backgroundColor={"#987654"}
          placeholder={"name"}
          placeholderTextColor={"#555555"}
          secureTextEntry={false}
          borderColor={"#333A33"}
          onChangeText={setPetName}
        />
        <TextField
          color={"#1239"}
          backgroundColor={"#987654"}
          placeholder={"species"}
          placeholderTextColor={"#555555"}
          secureTextEntry={false}
          borderColor={"#333A33"}
          onChangeText={setPetSpecies}
        />
        <TextField
          color={"#1239"}
          backgroundColor={"#987654"}
          placeholder={"breed"}
          placeholderTextColor={"#555555"}
          secureTextEntry={false}
          borderColor={"#333A33"}
          onChangeText={setPetBreed}
        />
        <TextField
          color={"#1239"}
          backgroundColor={"#987654"}
          placeholder={"allergies"}
          placeholderTextColor={"#555555"}
          secureTextEntry={false}
          borderColor={"#333A33"}
          onChangeText={setPetAllergies}
        />
        <TextField
          color={"#1239"}
          backgroundColor={"#987654"}
          placeholder={"medication"}
          placeholderTextColor={"#555555"}
          secureTextEntry={false}
          borderColor={"#333A33"}
          onChangeText={setPetMedication}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Female</Text>
          <Switch
            trackColor={{ false: "blue", true: "pink" }}
            thumbColor={isEnabled ? "#64C5B7" : "#64C5B7"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>Male</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#64C5B7",
            borderWidth: 1,
            borderRadius: 5,
            width: 30,
            height: 30,
            backgroundColor: "white",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            elevation: 3,
            shadowColor: "#000",
            shadowRadius: 8,
          }}
          onPress={increaseWeight}
        >
          <Text>+</Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#64C5B7",
            height: 50,
            width: 40,
            borderRadius: 55,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {weight}.0 Kg
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 50 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#64C5B7",
              borderWidth: 1,
              borderRadius: 5,
              width: 30,
              height: 30,
              backgroundColor: "white",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              elevation: 3,
              shadowColor: "#000",
              shadowRadius: 8,
            }}
            onPress={decreaseWeight}
          >
            <Text>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button title="Pick An Image" onPress={pickImage} />
      <Button
        title="Add Birth date field here"
        onPress={() => setShowDateTimePicker(true)}
      />
      {showDateTimePicker && (
        <RNDateTimePicker
          mode="date"
          dateFormat="dayofweek day month"
          value={date}
          onChange={(event, selectedDate) => {
            setDate(selectedDate);
            console.log(selectedDate);
            setShowDateTimePicker(false);
          }}
          display="inline"
        />
      )}
    </View>
  );
};

export default AddPet;
