import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import PetCard from "../components/PetCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
import AddButton from "../components/AddButton";
import { BASE_URL } from "../api";
import Ionicons from "@expo/vector-icons/Ionicons";
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUserPets"],
    queryFn: getUserPets,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  // Debug log to see the data structure
  console.log("Pet data:", data?.pets);

  // Simplify the image URL creation
  const formattedPets = data?.pets?.map((pet) => ({
    ...pet,
  }));

  console.log("Testing image URL:", formattedPets?.[0]?.imageUrl); // Debug log

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#64C5B7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#64C5B7"]}
              tintColor="#64C5B7"
            />
          }
        >
          {formattedPets?.map((pet) => (
            <PetCard
              key={pet._id}
              pet={{
                ...pet,
                image: pet.image?.replace(/\\/g, "/"),
              }}
            />
          ))}
          <View style={{ width: "auto", marginBottom: 100 }}>
            <AddButton />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
    color: "#91ACBF",
  },
});

export default Home;
