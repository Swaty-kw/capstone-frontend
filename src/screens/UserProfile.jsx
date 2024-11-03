import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteToken } from "../api/storage";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation";
import UserContext from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getUserPetsWithDetails } from "../api/user";
import { SafeAreaView } from "react-native-safe-area-context";

const Greeting = ({ name }) => (
  <Text style={styles.greeting}>Hey, {name}!</Text>
);

const UpcomingEvents = ({ appointments }) => (
  <View style={styles.upcomingEvents}>
    <Text style={styles.upcomingTitle}>Coming up!</Text>
    <View style={styles.eventsContainer}>
      {appointments?.Appts?.map((appointment, index) => (
        <View key={index} style={styles.eventCardTeal}>
          <Text style={styles.eventText}>
            Upcoming appointment for {appointment.name} on:
          </Text>
          <Text style={styles.eventDate}>{appointment.date}</Text>
        </View>
      ))}
    </View>
  </View>
);

const PersonalInfo = ({ userInfo }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>
      <Ionicons name="person-outline" size={20} color="#91ACBF" />
      Personal informations
    </Text>
    {[userInfo?.username, userInfo?.email, userInfo?.phone].map(
      (info, index) => (
        <View key={index} style={styles.infoItem}>
          <Text style={styles.infoText}>{info}</Text>
          <TouchableOpacity>
            <Ionicons name="pencil" size={20} color="#64C5B7" />
          </TouchableOpacity>
        </View>
      )
    )}
  </View>
);

const PetInfo = ({ petsInfo }) => (
  <View style={styles.section}>
    <Text style={styles.petSectionTitle}>
      <Ionicons name="gift-outline" size={20} color="#F26445" /> Your pet
    </Text>
    <View style={styles.petInfoContainer}>
      <Text style={styles.petInfoTitle}>Current favourite service</Text>
      <Text style={styles.petInfoText}>Pet grooming at petzone</Text>
      <Text style={styles.petInfoTitle}>Number of pets</Text>
      <Text style={styles.petInfoText}>{petsInfo?.length || 0}</Text>
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
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { data: petsInfo } = useQuery({
    queryKey: ["userPetsDetails"],
    queryFn: getUserPetsWithDetails,
  });

  if (!user) {
    navigation.navigate(NAVIGATION.AUTH.LOGIN);
    return null;
  }

  const handleLogout = async () => {
    try {
      await deleteToken();
      setUser(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  console.log("PROFILE", petsInfo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Greeting name={userInfo?.username} />
        <UpcomingEvents appointments={petsInfo} />
        <PersonalInfo userInfo={userInfo} />
        <PetInfo petsInfo={userInfo?.pets} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  logoutButton: {
    backgroundColor: "#F26445",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Telugu MN",
  },
});

export default UserProfile;
