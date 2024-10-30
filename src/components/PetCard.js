import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Add this import
import NAVIGATION from "../navigation/index"; // Import navigation constants
import { BASE_URL } from "../api";

const PetCard = ({ pet }) => {
  const navigation = useNavigation(); // Add this hook

  // Add this function to handle navigation
  const handleMorePress = () => {
    navigation.navigate(NAVIGATION.HOME.PET_DETAILS, { pet }); // Simplified navigation call
  };

  console.log("IMAGEEEE", pet?.image?.replace("\\", "/"));
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: BASE_URL + pet.image }}
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
          {pet.medications ? (
            <>
              <Text style={styles.medicationText}>{pet.medications}</Text>
              <Text style={styles.medicationText}>Twice daily</Text>
            </>
          ) : (
            <Text style={styles.medicationText}>
              No current{"\n"}medications
            </Text>
          )}
        </View>

        <View style={[styles.infoBox, styles.vaccineBox]}>
          <Text style={styles.vaccineText}>Upcoming{"\n"}vaccination on:</Text>
          <Text style={styles.dateText}>{pet.nextVaccination}</Text>
        </View>

        <View style={[styles.infoBox, styles.appointmentBox]}>
          <Text style={styles.appointmentText}>
            Upcoming{"\n"}appointment on:
          </Text>
          <Text style={styles.appointmentDate}>{pet.nextAppointment}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.moreButton} onPress={handleMorePress}>
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
    </View>
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
    height: 85,
    justifyContent: "center",
  },
  vaccineBox: {
    backgroundColor: "#E8F6F5",
  },
  appointmentBox: {
    backgroundColor: "#FFE8E8",
  },
  medicationText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    lineHeight: 20,
  },
  vaccineText: {
    fontSize: 12,
    color: "#64C5B7",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
  },
  appointmentText: {
    fontSize: 12,
    color: "#F26445",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#64C5B7",
    textAlign: "center",
    fontWeight: "500",
  },
  appointmentDate: {
    fontSize: 12,
    color: "#F26445",
    textAlign: "center",
    fontWeight: "500",
  },
  moreButton: {
    backgroundColor: "#64C5B7",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "30%",
    alignSelf: "center",
  },
  moreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PetCard;
