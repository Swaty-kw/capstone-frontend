import React, { useState, useEffect } from "react";
import { getPetAppointments } from "../api/pets";
import { getUserInfo } from "../api/user";
import { fetchAppointments } from "../api/Services";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation/index";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
import { BASE_URL } from "../api";

const AppointmentCard = ({ date, pet, service, petImage }) => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  console.log("date", date);
  console.log("pet", pet);
  console.log("petImage", petImage);

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.leftColumn}>
        <Image
          source={{ uri: `${BASE_URL}/${petImage.replace(/\\/g, "/")}` }}
          style={styles.appointmentImage}
        />
        <View style={styles.bottomRow}>
          <View style={styles.reminderContainer}>
            <Switch
              trackColor={{ false: "#E0E0E0", true: "#E3EAFF" }}
              thumbColor={isEnabled ? "#64C5B7" : "#f4f3f4"}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.reminderSwitch}
            />
            {/* <Text style={styles.reminderText}>
              {new Date(date).toLocaleString()}
            </Text> */}
          </View>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDate}>
          {new Date(date).toLocaleString()}
        </Text>
        <Text style={styles.petName}>{pet}</Text>
        <Text style={styles.serviceName}>{service}</Text>
      </View>
    </View>
  );
};

const MyAppointments = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [underlineAnim] = useState(new Animated.Value(0));

  const { data: appointments } = useQuery({
    queryKey: ["getPetAppointments"],
    queryFn: getPetAppointments,
  });
  const animateUnderline = (toValue) => {
    Animated.timing(underlineAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  // console.log("APPT", appointments);
  const petAppt = appointments?.filter((appt) => appt.Appts.length > 0);
  console.log("PETAPPT", petAppt);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    animateUnderline(tab === "upcoming" ? 0 : 1);
  };

  const handleBookAppointment = () => {
    navigation.navigate(NAVIGATION.SERVICE.CHOOSE_SERVICE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#91ACBF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleBookAppointment}
        >
          <Ionicons name="add" size={24} color="#64C5B7" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("upcoming")}
        >
          <Text
            style={
              activeTab === "upcoming" ? styles.tabActive : styles.tabInactive
            }
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("past")}
        >
          <Text
            style={activeTab === "past" ? styles.tabActive : styles.tabInactive}
          >
            Past
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlineAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "50%"],
              }),
            },
          ]}
        />
      </View>

      <ScrollView style={styles.appointmentsList}>
        {petAppt?.length > 0 ? (
          petAppt.map((apptpet, index) =>
            apptpet.Appts.map((appt, index) => (
              <AppointmentCard
                key={index}
                date={appt.date}
                pet={apptpet.name}
                service={appt.service.name}
                petImage={apptpet.image}
              />
            ))
          )
        ) : (
          <Text>No appointments available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    position: "relative",
    marginBottom: 20,
    marginTop: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  tabActive: {
    fontSize: 18,
    color: "#91ACBF",
    fontWeight: "500",
  },
  tabInactive: {
    fontSize: 18,
    color: "#64C5B7",
    fontWeight: "400",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#91ACBF",
  },
  appointmentsList: {
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: "#F0F8F8",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  leftColumn: {
    width: "40%",
  },
  appointmentImage: {
    width: 60,
    height: 60,
    backgroundColor: "#E8EFF1",
    borderRadius: 12,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderSwitch: {
    transform: [{ scale: 0.8 }],
  },
  reminderText: {
    fontSize: 12,
    color: "#91ACBF",
    marginLeft: 5,
  },
  rescheduleButton: {
    backgroundColor: "#E8F6F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  rescheduleText: {
    color: "#64C5B7",
    fontSize: 12,
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 15,
  },
  appointmentDate: {
    fontSize: 16,
    color: "#91ACBF",
    marginBottom: 5,
  },
  petName: {
    fontSize: 14,
    color: "#64C5B7",
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 14,
    color: "#91ACBF",
    opacity: 0.8,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#91ACBF",
  },
});

export default MyAppointments;
