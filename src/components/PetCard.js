import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Add this import
import NAVIGATION from "../navigation/index"; // Import navigation constants
import { BASE_URL } from "../api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PetCard = ({ pet }) => {
  const navigation = useNavigation(); // Add this hook

  // Add this function to handle navigation
  const handleMorePress = () => {
    navigation.navigate(NAVIGATION.HOME.PET_DETAILS, { pet }); // Simplified navigation call
  };

  console.log("PET", pet);
  console.log("IMAGEEEE", pet?.image?.replace("\\", "/"));
  return (
    <TouchableOpacity onPress={handleMorePress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}/${pet.image}` }}
            style={styles.petImage}
            // resizeMode="cover"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <FontAwesome6
            name="briefcase-medical"
            size={24}
            color="#64C5B7"
            style={styles.icon}
          />
          {pet.medication ? (
            <>
              <Text style={styles.medicationText}>{pet.medication}</Text>
              <Text style={styles.medicationText}>Twice daily</Text>
            </>
          ) : (
            <Text style={styles.medicationText}>
              No current{"\n"}medications
            </Text>
          )}
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons
            name="paw-off"
            size={24}
            color="#64C5B7"
            style={styles.icon}
          />
          {pet.allergies ? (
            <>
              <Text style={styles.medicationText}>{pet.allergies}</Text>
            </>
          ) : (
            <Text style={styles.medicationText}>No allergies</Text>
          )}
        </View>

        <View style={[styles.infoBox, styles.appointmentBox]}>
          <FontAwesome
            name="calendar"
            size={24}
            color="#64C5B7"
            style={styles.icon}
          />
          <Text style={styles.appointmentText}>Upcoming{"\n"}appointment</Text>
          <Text style={styles.appointmentDate}>
            {pet.Appts.length > 0
              ? pet.Appts[0].date.split("T")[0]
              : "No upcoming appointments"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0F8F8",
    borderRadius: 25,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    activeOpacity: 0.7,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#E8F6F5",
  },
  petImage: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 24,
    color: "#64C5B7",
    fontWeight: "600",
  },
  breed: {
    fontSize: 16,
    color: "#A8D3CF",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 15,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#E8EFF1",
    padding: 12,
    borderRadius: 15,
    height: 150,
    justifyContent: "center",
  },
  vaccineBox: {
    backgroundColor: "#E8F6F5",
  },
  appointmentBox: {
    backgroundColor: "#E8EFF1",
  },
  medicationText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "bold",
  },
  vaccineText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  appointmentText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    fontWeight: "bold",
  },
  appointmentDate: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 4,
  },
});

export default PetCard;
