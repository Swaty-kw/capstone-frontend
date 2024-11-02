import {
  View,
  Text,
  ScrollView,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add a New Pet</Text>

      <TextField label="Pet Name" onChangeText={setPetName} />
      <TextField label="Species" onChangeText={setPetSpecies} />
      <TextField label="Breed" onChangeText={setPetBreed} />
      <TextField label="Allergies" onChangeText={setPetAllergies} />
      <TextField label="Medication" onChangeText={setPetMedication} />

      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Text>Female</Text>
        <Switch
          trackColor={{ false: "blue", true: "pink" }}
          thumbColor={isEnabled ? "#64C5B7" : "#64C5B7"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>Male</Text>
      </View>

      <View style={styles.weightContainer}>
        <TouchableOpacity style={styles.weightButton} onPress={increaseWeight}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <View style={styles.weightDisplay}>
          <Text style={styles.weightText}>{weight}.0 Kg</Text>
        </View>

        <TouchableOpacity style={styles.weightButton} onPress={decreaseWeight}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <Button title="Pick An Image" onPress={pickImage} />
      <Button
        title="Add Birth Date"
        onPress={() => setShowDateTimePicker(true)}
      />

      {showDateTimePicker && (
        <RNDateTimePicker
          mode="date"
          value={date}
          onChange={(event, selectedDate) => {
            setDate(selectedDate);
            setShowDateTimePicker(false);
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  weightButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#64C5B7",
    borderWidth: 1,
    borderRadius: 5,
    width: 40,
    height: 40,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  weightDisplay: {
    backgroundColor: "#64C5B7",
    height: 50,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  weightText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
  },
});

export default AddPet;
