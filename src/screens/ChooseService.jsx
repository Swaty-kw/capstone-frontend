import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

const ChooseService = () => {
  const [selectedService, setSelectedService] = useState("Doctor");

  const appointments = [
    { date: "October 20, 2024, 10:30 AM", location: "City Pet Clinic" },
    { date: "October 21, 2024, 11:00 AM", location: "City Pet Clinic" },
    // Add more appointments as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSelectedService("Doctor Vet")}>
          <Text
            style={
              selectedService === "Doctor Vet" ? styles.active : styles.inactive
            }
          >
            Doctor Vet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedService("Pet Store")}>
          <Text
            style={
              selectedService === "Pet Store" ? styles.active : styles.inactive
            }
          >
            Pet Store
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appointmentsContainer}>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentCard}>
            <Text>{appointment.date}</Text>
            <Text>{appointment.location}</Text>
            <Text>30 min before</Text>
            <TouchableOpacity>
              <Text style={styles.reschedule}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  active: {
    fontWeight: "bold",
    color: "blue",
  },
  inactive: {
    color: "gray",
  },
  appointmentsContainer: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  reschedule: {
    color: "green",
  },
});

export default ChooseService;
