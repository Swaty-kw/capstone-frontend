import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo icons if not already
import { BASE_URL } from "../api";

const PetDetails = ({ route }) => {
  const { pet } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Header with image and name */}
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: BASE_URL + pet.image }}
                style={styles.petImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.breed}>{pet.breed}</Text>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={[styles.infoBox, styles.mintBox]}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>Male</Text>
            </View>

            <View style={[styles.infoBox, styles.mintBox, styles.wideBox]}>
              <Text style={styles.infoLabel}>Vaccination for {pet.name}</Text>
              <Text style={styles.infoSubtext}>//add data</Text>
              <Text style={styles.infoDate}>{pet.nextVaccination}</Text>
            </View>

            <View style={[styles.infoBox, styles.grayBox]}>
              <Text style={styles.infoLabel}>Birth date</Text>
              <Text style={styles.infoValue}>{pet.birthdate.slice(0, 10)}</Text>
            </View>

            <View style={[styles.infoBox, styles.grayBox]}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{pet.weight}</Text>
            </View>

            <View style={[styles.infoBox, styles.grayBox, styles.wideBox]}>
              <Text style={styles.infoLabel}>Allergies</Text>
              <Text style={styles.infoSubtext}>{pet.allergies}</Text>
              <Text style={styles.infoDate}>{pet.nextAppointment}</Text>
            </View>
          </View>

          {/* Medications Section */}
          <View style={styles.medicationBox}>
            <Text style={styles.medicationTitle}>Current medications</Text>
            <Text style={styles.medicationText}>
              {pet.medication || "No current medications"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#E8F6F5",
  },
  petImage: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 32,
    color: "#64C5B7",
    fontWeight: "500",
  },
  breed: {
    fontSize: 20,
    color: "#A8D3CF",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 20,
  },
  infoBox: {
    borderRadius: 20,
    padding: 15,
    minWidth: "45%",
  },
  wideBox: {
    width: "100%",
  },
  mintBox: {
    backgroundColor: "#E8F6F5",
  },
  grayBox: {
    backgroundColor: "#E8EFF1",
  },
  infoLabel: {
    fontSize: 16,
    color: "#64C5B7",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 24,
    color: "#64C5B7",
    fontWeight: "500",
  },
  infoSubtext: {
    fontSize: 14,
    color: "#64C5B7",
    marginBottom: 5,
  },
  infoDate: {
    fontSize: 16,
    color: "#64C5B7",
    fontWeight: "500",
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  medicationBox: {
    backgroundColor: "#FFE8E8",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  medicationTitle: {
    fontSize: 20,
    color: "#F26445",
    marginBottom: 10,
  },
  medicationText: {
    fontSize: 18,
    color: "#F26445",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#64C5B7",
    borderRadius: 30,
    padding: 15,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default PetDetails;
