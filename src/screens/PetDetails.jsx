import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BASE_URL } from "../api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#91ACBF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pet Details</Text>
            <View style={{ width: 24 }} />
          </View>
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
                  Upcoming Appointment{"\n"}for {pet.name}
                </Text>
                <View style={[styles.infoBox, styles.appointmentBox]}>
                  <Text style={styles.cardLabel}>
                    {pet.Appts.length > 0
                      ? pet.Appts[0].date.split("T")[0]
                      : "No upcoming appointments"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Second Row */}
            <View style={styles.row}>
              <View style={[styles.card, styles.ageCard]}>
                <Text style={styles.cardLabel}>Age</Text>
                <Text style={[styles.cardValue, styles.ageValue]}>{age}</Text>
              </View>
              <View style={[styles.card, styles.beakCard]}>
                <Text style={styles.cardLabel}>Allergies</Text>
                <Text style={[styles.cardValue, styles.beakValue]}>
                  {pet.allergies || "No allergies"}
                </Text>
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
    backgroundColor: "white",
    padding: 20,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "#91ACBF",
    fontWeight: "500",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F6F5",
    padding: 2,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 38,
    overflow: "hidden",
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    color: "#4EBFAC",
    fontWeight: "500",
    marginBottom: 4,
  },
  breed: {
    fontSize: 16,
    color: "#91ACBF",
  },
  grid: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    padding: 16,
    minHeight: 80,
  },
  genderCard: {
    backgroundColor: "#E8F6F5",
    marginLeft: 20,
  },
  vaccinationCard: {
    backgroundColor: "#E8F6F5",
    marginRight: 20,
  },
  ageCard: {
    backgroundColor: "#F0F4F8",
    marginLeft: 20,
  },
  beakCard: {
    backgroundColor: "#E8F6F5",
    marginRight: 20,
  },
  weightCard: {
    backgroundColor: "#F0F4F8",
    marginRight: 20,
    marginLeft: 20,
  },
  cardLabel: {
    fontSize: 20,
    color: "#91ACBF",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 16,
    color: "#91ACBF",
    fontWeight: "1000",
  },
  clinicName: {
    fontSize: 12,
    color: "#455A64",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#91ACBF",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  medicationCard: {
    backgroundColor: "#FFE8E8",
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  medicationTitle: {
    fontSize: 18,
    color: "#F26445",
    fontWeight: "500",
    marginBottom: 8,
  },
  medicationText: {
    fontSize: 14,
    color: "#F26445",
    opacity: 0.8,
  },
});

export default PetDetails;
