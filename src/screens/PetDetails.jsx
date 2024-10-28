import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PetDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>Grace</Text>
          <Text style={styles.petBreed}>Rainbow Lorikeet parrot</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <DetailItem title="Gender" value="Male" color="#E0F2F1" />
        <DetailItem title="Age" value="16 Months" color="#F3F3F3" />
        <DetailItem title="Weight" value="4 oz" color="#F3F3F3" />
        <DetailItem
          title="Vaccination for Grace"
          value="Zoo Care Veterinary Clinic"
          subValue="4 Feb 2026"
          color="#E0F2F1"
        />
        <DetailItem
          title="Beak and nails care"
          value="Pet zone"
          subValue="24 Feb 2026"
          color="#F3F3F3"
        />
      </View>

      <View style={styles.medicationContainer}>
        <Text style={styles.medicationTitle}>Current medications</Text>
        <Text style={styles.medicationValue}>No current medications</Text>
      </View>

      <View style={styles.navbar}>
        <Ionicons name="home-outline" size={24} color="#4DB6AC" />
        <Ionicons name="calendar-outline" size={24} color="#4DB6AC" />
        <Ionicons name="person-outline" size={24} color="#4DB6AC" />
      </View>
    </ScrollView>
  );
};

const DetailItem = ({ title, value, subValue, color }) => (
  <View style={[styles.detailItem, { backgroundColor: color }]}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
    {subValue && <Text style={styles.detailSubValue}>{subValue}</Text>}
  </View>
);

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 20,
  },
  petInfo: {
    alignItems: "center",
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4DB6AC",
  },
  petBreed: {
    fontSize: 16,
    color: "#4DB6AC",
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  detailSubValue: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
  },
  medicationContainer: {
    backgroundColor: "#FFEBEE",
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  medicationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E57373",
    marginBottom: 5,
  },
  medicationValue: {
    fontSize: 16,
    color: "#E57373",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
