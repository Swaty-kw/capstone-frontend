import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { addPet } from "../api/pets";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AddPet = () => {
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAllergies, setPetAllergies] = useState("");
  const [petMedication, setPetMedication] = useState("");
  const [petGender, setPetGender] = useState(false);
  const [weight, setWeight] = useState(0.0);
  const [selectedImage, setSelectedImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const toggleGenderSwitch = () =>
    setPetGender((previousState) => !previousState);

  const increaseWeight = () => setWeight(weight + 1);
  const decreaseWeight = () => setWeight(weight > 0 ? weight - 1 : 0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
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
        birthDate: date,
      }),
  });

  const handleAddPet = () => {
    mutate();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Add Pet
      </Text>
      <ScrollView>
        <TextInput
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Name"
          onChangeText={setPetName}
        />
        <TextInput
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Species"
          onChangeText={setPetSpecies}
        />
        <TextInput
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Breed"
          onChangeText={setPetBreed}
        />
        <TextInput
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Allergies"
          onChangeText={setPetAllergies}
        />
        <TextInput
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Medication"
          onChangeText={setPetMedication}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text>Female</Text>
          <Switch
            trackColor={{ false: "blue", true: "pink" }}
            thumbColor={petGender ? "#64C5B7" : "#64C5B7"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleGenderSwitch}
            value={petGender}
          />
          <Text>Male</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#007BFF",
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={decreaseWeight}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>-</Text>
          </TouchableOpacity>
          <Text>{weight} Kg</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#007BFF",
              padding: 10,
              borderRadius: 5,
              marginLeft: 10,
            }}
            onPress={increaseWeight}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Pick An Image" onPress={pickImage} />
        <Button
          title="Select Birth Date"
          onPress={() => setShowDateTimePicker(true)}
        />
        {showDateTimePicker && (
          <RNDateTimePicker
            mode="date"
            value={date}
            onChange={(event, selectedDate) => {
              setDate(selectedDate || date);
              setShowDateTimePicker(false);
            }}
          />
        )}
        <Button title="Add Pet" onPress={handleAddPet} />
      </ScrollView>
    </View>
  );
};

export default AddPet;
