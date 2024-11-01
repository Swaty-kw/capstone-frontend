import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import PetCard from "../components/PetCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
import AddButton from "../components/AddButton";
import { BASE_URL } from "../api";

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
    imageUrl: `${BASE_URL}/media/image-1730496710531-910315736-Labrador Retriever.jpeg`, // Hardcode temporarily to test
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
    <View style={styles.container}>
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
              image: pet.imageUrl,
            }}
          />
        ))}
        <View style={{ width: "auto" }}>
          <AddButton />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
});

export default Home;
