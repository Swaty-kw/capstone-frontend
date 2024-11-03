import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { BASE_URL } from "../api";

// Add this function at the top of your file, outside the component
const calculateAge = (birthdate) => {
  if (!birthdate) return "";

  const birth = new Date(birthdate);
  const today = new Date();

  let months = (today.getFullYear() - birth.getFullYear()) * 12;
  months -= birth.getMonth();
  months += today.getMonth();

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return `${years} ${years === 1 ? "Year" : "Years"}`;
  } else {
    return `${remainingMonths} ${remainingMonths === 1 ? "Month" : "Months"}`;
  }
};

const PetDetails = ({ route }) => {
  const { pet } = route.params;

  console.log("Pet Image:", pet.image);

  // Use the same format as Home.jsx
  const imageUrl = `${BASE_URL}/${pet.image.replace(/\\/g, "/")}`;

  console.log("Final Image URL in Details:", imageUrl);

  // Calculate age from birthdate
  const age = calculateAge(pet.birthdate);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.petImage}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.breed}>{pet.breed}</Text>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.grid}>
            {/* First Row */}
            <View style={styles.row}>
              <View style={[styles.card, styles.genderCard]}>
                <Text style={styles.cardLabel}>Gender</Text>
                <Text style={[styles.cardValue, styles.genderValue]}>
                  {pet.gender}
                </Text>
              </View>
              <View style={[styles.card, styles.vaccinationCard]}>
                <Text style={styles.cardLabel}>
                  Vaccination{"\n"}for {pet.name}
                </Text>
                {pet.vaccinationClinic && (
                  <>
                    <Text style={styles.clinicName}>
                      {pet.vaccinationClinic}
                    </Text>
                    <Text style={styles.date}>{pet.vaccinationDate}</Text>
                  </>
                )}
              </View>
            </View>

            {/* Second Row */}
            <View style={styles.row}>
              <View style={[styles.card, styles.ageCard]}>
                <Text style={styles.cardLabel}>Age</Text>
                <Text style={[styles.cardValue, styles.ageValue]}>{age}</Text>
              </View>
              <View style={[styles.card, styles.beakCard]}>
                <Text style={styles.cardLabel}>Beak and nails{"\n"}care</Text>
                <Text style={styles.clinicName}>{pet.serviceClinic}</Text>
                <Text style={styles.date}>{pet.serviceDate}</Text>
              </View>
            </View>

            {/* Third Row */}
            <View style={styles.row}>
              <View style={[styles.card, styles.weightCard]}>
                <Text style={styles.cardLabel}>Weight</Text>
                <Text style={[styles.cardValue, styles.weightValue]}>
                  {pet.weight}
                </Text>
              </View>
            </View>

            {/* Medications Card */}
            <View style={styles.medicationCard}>
              <Text style={styles.medicationTitle}>Current medications</Text>
              <Text style={styles.medicationText}>
                {pet.medication || "No current medications"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
    padding: 20,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: "#E8F6F5",
    padding: 2,
    marginRight: 16,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 38,
    overflow: "hidden",
  },
  petImage: {
    marginTop: 10,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    color: "#4EBFAC",
    fontWeight: "600",
    marginBottom: 4,
  },
  breed: {
    fontSize: 16,
    color: "#4EBFAC",
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    minHeight: 90,
  },
  genderCard: {
    backgroundColor: "#E8F6F5",
  },
  vaccinationCard: {
    backgroundColor: "#E8F6F5",
  },
  ageCard: {
    backgroundColor: "#F0F4F8",
  },
  beakCard: {
    backgroundColor: "#E8F6F5",
  },
  weightCard: {
    backgroundColor: "#F0F4F8",
    width: "48%",
  },
  cardLabel: {
    fontSize: 15,
    color: "#8FA5B3",
    marginBottom: 12,
    lineHeight: 20,
  },
  cardValue: {
    fontSize: 22,
    color: "#455A64",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  clinicName: {
    fontSize: 13,
    color: "#455A64",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  date: {
    fontSize: 13,
    color: "#8FA5B3",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  medicationCard: {
    backgroundColor: "#FFE8E8",
    borderRadius: 24,
    padding: 20,
    height: 130,
  },
  medicationTitle: {
    fontSize: 22,
    color: "#F26445",
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  medicationText: {
    fontSize: 17,
    color: "#F26445",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
});

export default PetDetails;
