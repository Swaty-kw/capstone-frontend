import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Greeting = ({ name }) => (
  <Text style={styles.greeting}>Hey, {name}!</Text>
);

const UpcomingEvents = () => (
  <View style={styles.upcomingEvents}>
    <Text style={styles.upcomingTitle}>Coming up!</Text>
    <View style={styles.eventsContainer}>
      <View style={styles.eventCardTeal}>
        <Text style={styles.eventText}>Upcoming appointment for Alex on:</Text>
        <Text style={styles.eventDate}>24 Feb 2026</Text>
      </View>
      <View style={styles.eventCardTeal}>
        <Text style={styles.eventText}>Upcoming Vaccination for Grace on:</Text>
        <Text style={styles.eventDate}>2 Feb 2026</Text>
      </View>
    </View>
  </View>
);

const PersonalInfo = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>
      <Ionicons name="person-outline" size={20} color="#91ACBF" />{" "}
      {/* Updated icon color */}
      Personal informations
    </Text>
    {[
      "Dalal Salam",
      "dalaly2005@outlook.com",
      "9910****",
      "vhebuwlj42q@#fs",
    ].map((info, index) => (
      <View key={index} style={styles.infoItem}>
        <Text style={styles.infoText}>{info}</Text>
        <TouchableOpacity>
          <Ionicons name="pencil" size={20} color="#64C5B7" />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const PetInfo = () => (
  <View style={styles.section}>
    <Text style={styles.petSectionTitle}>
      <Ionicons name="gift-outline" size={20} color="#F26445" /> Your pet
    </Text>
    <View style={styles.petInfoContainer}>
      <Text style={styles.petInfoTitle}>Current favourite service</Text>
      <Text style={styles.petInfoText}>Pet grooming at petzone</Text>
      <Text style={styles.petInfoTitle}>Number of pets</Text>
      <Text style={styles.petInfoText}>4</Text>
    </View>
  </View>
);

const BottomNavigation = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="home-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="calendar-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
  </View>
);

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Greeting name="Dalal Salam" />
        <UpcomingEvents />
        <PersonalInfo />
        <PetInfo />
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed background color to white
  },
  content: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontFamily: "Telugu MN",
    fontSize: 28,
    fontWeight: "bold",
    color: "#64C5B7",
    marginBottom: 20,
  },
  upcomingEvents: {
    marginBottom: 20,
  },
  upcomingTitle: {
    fontFamily: "Telugu MN",
    fontSize: 20,
    color: "#64C5B7",
    marginBottom: 10,
  },
  eventsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventCardTeal: {
    backgroundColor: "rgba(100, 197, 183, 0.3)", // Changed opacity to 30%
    borderRadius: 10,
    padding: 10,
    width: "48%",
    height: 100,
    justifyContent: "space-between",
  },
  eventText: {
    fontFamily: "Telugu MN",
    fontSize: 14,
    color: "#4F9F9B", // Changed to a medium shade of teal
  },
  eventDate: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F9F9B", // Changed to a medium shade of teal
    alignSelf: "flex-end",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    flexDirection: "row", // Added to align icon and text horizontally
    alignItems: "center", // Added to vertically center align icon and text
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#91ACBF", // Updated header color to match icon
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1, // Added border width
    borderColor: "#91ACBF", // Added border color
  },
  infoText: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    color: "#91ACBF", // Changed text color to #91ACBF
  },
  petInfoContainer: {
    backgroundColor: "#FFE4E1",
    borderRadius: 10,
    padding: 15,
  },
  petInfoTitle: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    color: "#F26445",
    marginBottom: 5,
  },
  petInfoText: {
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#F26445",
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    padding: 10,
  },
  petSectionTitle: {
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#F26445", // Changed text color to #F26445
    marginBottom: 10,
  },
});

export default UserProfile;
