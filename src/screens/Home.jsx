import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import PetCard from "../components/PetCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
const Home = () => {


  const {data} = useQuery({
    queryKey: ["getUserPets"],
    queryFn: getUserPets
  })

console.log(data);

  const samplePets = [
    {
      name: "Grace",
      breed: "Rainbow Lorikeet parrot",
      medications: null,
      nextVaccination: "4 Feb 2026",
      nextAppointment: "24 Feb 2026",
      image: require("../../assets/icon.png"),
    },
    {
      name: "Alex",
      breed: "Maine Coon cat",
      medications: "FelineRx\nTwice daily",
      nextVaccination: "4 Feb 2026",
      nextAppointment: "24 Feb 2026",
      image: require("../../assets/icon.png"),
    },
    {
      name: "Luna",
      breed: "Persian cat",
      medications: null,
      nextVaccination: "4 Feb 2026",
      nextAppointment: "24 Feb 2026",
      image: require("../../assets/icon.png"),
    },
    {
      name: "Max",
      breed: "Siberian Husky",
      medications: null,
      nextVaccination: "4 Feb 2026",
      nextAppointment: "24 Feb 2026",
      image: require("../../assets/icon.png"),
    },
  ];

  console.log("Sample pets data:", samplePets);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {samplePets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    padding: 10,
  },
});

export default Home;
