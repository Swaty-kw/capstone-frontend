import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import PetCard from "../components/PetCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
import AddButton from "../components/AddButton";
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
      nextVaccination: "7 Nov 2024",
      nextAppointment: "25 Dec 2024",
      image: require("../../assets/parrot.jpg"),
    },
    {
      name: "Alex",
      breed: "Maine Coon cat",
      medications: "FelineRx\nTwice daily",
      nextVaccination: "15 Jan 2025",
      nextAppointment: "25 Dec 2024",
      image: require("../../assets/cat1.jpg"),
    },
    {
      name: "Luna",
      breed: "Persian cat",
      medications: null,
      nextVaccination: "4 Feb 2025",
      nextAppointment: "12 Mar 2025",
      image: require("../../assets/cat2.jpg"),
    },
    {
      name: "Max",
      breed: "Siberian Husky",
      medications: null,
      nextVaccination: "7 Dec 2024",
      nextAppointment: "17 Nov 2024",
      image: require("../../assets/dog.jpg"),
    },
  ];

  console.log("Sample pets data:", samplePets);

  // Call createService to test its functionality

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {samplePets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
        <View style={{width:'auto'}}>
        <AddButton/>
        </View>
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
