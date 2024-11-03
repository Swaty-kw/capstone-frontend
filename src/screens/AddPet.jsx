import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPet } from "../api/pets";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AddPet = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    allergies: "",
    medications: [{ name: "", frequency: "Twice daily" }],
    gender: false, // false for female, true for male
    weight: 0,
    image: null,
    birthDate: new Date(),
    vaccinationClinic: "Zoo Creek Veterinary Clinic",
    careClinic: "Pet Zone",
    vaccinationDate: new Date(),
    careDate: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState({
    birth: false,
    vaccination: false,
    care: false,
  });

  // Mutation
  const { mutate, isLoading } = useMutation({
    mutationKey: ["Add Pet"],
    mutationFn: () => addPet(formData),
    onSuccess: () => {
      queryClient.invalidateQueries("pets");
      Alert.alert("Success", "Pet added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    },
    onError: (error) => {
      console.error("Add Pet Error:", error);
      Alert.alert(
        "Error",
        "Failed to add pet. Please check all required fields."
      );
    },
  });

  // Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  // Form handlers
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...formData.medications];
    newMedications[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      medications: newMedications,
    }));
  };

  const addMedicationField = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { name: "", frequency: "Twice daily" },
      ],
    }));
  };

  const removeMedicationField = (index) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    // if (!formData.name || !formData.species || !formData.breed) {
    //   Alert.alert("Error", "Please fill in all required fields");
    //   return;
    // }
    // try {
    //   // Create FormData object
    //   const formDataToSend = new FormData();
    //   // Append image if exists
    //   if (formData.image) {
    //     const imageUri = formData.image;
    //     const filename = imageUri.split("/").pop();
    //     const match = /\.(\w+)$/.exec(filename);
    //     const type = match ? `image/${match[1]}` : "image";
    //     formDataToSend.append("image", {
    //       uri: imageUri,
    //       name: filename,
    //       type,
    //     });
    //   }
    //   // Append all other data
    //   formDataToSend.append("name", formData.name);
    //   formDataToSend.append("species", formData.species);
    //   formDataToSend.append("breed", formData.breed);
    //   formDataToSend.append("gender", formData.gender ? "Male" : "Female");
    //   formDataToSend.append("allergies", formData.allergies || "");
    //   formDataToSend.append("weight", `${formData.weight} Kg`);
    //   formDataToSend.append("birthDate", formData.birthDate.toISOString());
    //   formDataToSend.append("vaccinationClinic", formData.vaccinationClinic);
    //   formDataToSend.append("careClinic", formData.careClinic);
    //   formDataToSend.append(
    //     "vaccinationDate",
    //     formData.vaccinationDate.toISOString()
    //   );
    //   formDataToSend.append("careDate", formData.careDate.toISOString());
    //   // Append medications as JSON string
    //   const medications = formData.medications.filter(
    //     (med) => med.name.trim() !== ""
    //   );
    //   formDataToSend.append("medications", JSON.stringify(medications));
    //   // Log what we're sending
    //   console.log("Sending data to backend:", formDataToSend);
    //   // Send to backend
    //   mutate(formDataToSend);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   Alert.alert("Error", "Failed to add pet. Please try again.");
    // }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add Pet</Text>

          {/* Basic Information */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#8FA5B3"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Species"
            placeholderTextColor="#8FA5B3"
            value={formData.species}
            onChangeText={(value) => handleInputChange("species", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Breed"
            placeholderTextColor="#8FA5B3"
            value={formData.breed}
            onChangeText={(value) => handleInputChange("breed", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Allergies"
            placeholderTextColor="#8FA5B3"
            value={formData.allergies}
            onChangeText={(value) => handleInputChange("allergies", value)}
          />

          {/* Medications */}
          {formData.medications.map((med, index) => (
            <View key={index} style={styles.medicationContainer}>
              <TextInput
                style={[styles.input, styles.medicationInput]}
                placeholder="Medication Name"
                placeholderTextColor="#8FA5B3"
                value={med.name}
                onChangeText={(value) =>
                  handleMedicationChange(index, "name", value)
                }
              />
            </View>
          ))}

          {/* Gender Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Female</Text>
            <Switch
              trackColor={{ false: "#DDF1ED", true: "#6C88BE" }}
              thumbColor={formData.gender ? "#EEE5DF" : "#EEE5DF"}
              ios_backgroundColor="#E3EEEE"
              onValueChange={(value) => handleInputChange("gender", value)}
              value={formData.gender}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
            <Text style={styles.switchLabel}>Male</Text>
          </View>

          {/* Weight Controls */}
          <View style={styles.weightContainer}>
            <TouchableOpacity
              style={styles.weightButton}
              onPress={() =>
                handleInputChange("weight", Math.max(0, formData.weight - 1))
              }
            >
              <Text style={styles.weightButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.weightText}>{formData.weight} Kg</Text>
            <TouchableOpacity
              style={styles.weightButton}
              onPress={() => handleInputChange("weight", formData.weight + 1)}
            >
              <Text style={styles.weightButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Birth Date:</Text>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateText}>
                {formData.birthDate.toLocaleDateString()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker((prev) => ({ ...prev, birth: true }))
                }
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="calendar-outline" size={24} color="#6C88BE" />
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker.birth && (
            <RNDateTimePicker
              mode="date"
              value={formData.birthDate}
              onChange={(_, selectedDate) => {
                setShowDatePicker((prev) => ({ ...prev, birth: false }));
                if (selectedDate) handleInputChange("birthDate", selectedDate);
              }}
              accentColor="#6C88BE"
            />
          )}

          {/* Image Picker */}
          <View style={styles.imageSection}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={pickImage}
              >
                {formData.image ? (
                  <>
                    <Image
                      source={{ uri: formData.image }}
                      style={styles.selectedImage}
                    />
                    <View style={styles.editIconContainer}>
                      <MaterialCommunityIcons
                        name="pencil-circle"
                        size={28}
                        color="#FFFFFF"
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color="#6C88BE" />
                    <Text style={styles.placeholderText}>Add Pet Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={mutate}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              {isLoading ? "Adding Pet..." : "Add Pet"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#6C88BE",
    marginBottom: 24,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDF1ED",
    color: "#455A64",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDF1ED",
  },
  switchLabel: {
    fontSize: 16,
    color: "#455A64",
    marginHorizontal: 16,
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDF1ED",
  },
  weightButton: {
    backgroundColor: "#6C88BE",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  weightButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  weightText: {
    fontSize: 18,
    color: "#455A64",
    marginHorizontal: 20,
    minWidth: 80,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDF1ED",
  },
  buttonText: {
    color: "#6C88BE",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#DDF1ED",
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonText: {
    color: "#6C88BE",
  },
  medicationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  medicationInput: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#FF6B6B",
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#FFFFFF",
  },
  addMedButton: {
    backgroundColor: "#DDF1ED",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addMedButtonText: {
    color: "#6C88BE",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#EEE5DF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  imageSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  imageWrapper: {
    position: "relative",
    width: 120,
    height: 120,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDF1ED",
    overflow: "hidden",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editIconContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#6C88BE",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  datePickerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDF1ED",
  },
  dateLabel: {
    fontSize: 16,
    color: "#8FA5B3",
    marginBottom: 8,
  },
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "#455A64",
  },
});

export default AddPet;
