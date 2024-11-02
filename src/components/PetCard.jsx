import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BASE_URL } from "../api";

const PetCard = ({ pet }) => {
  const [imageError, setImageError] = useState(false);

  // Format the image path correctly
  const imageUrl = pet.image
    ? `${BASE_URL}/${pet.image.split("\\").join("/")}`
    : null;

  console.log("Image URL:", imageUrl); // Debug log

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={
              imageUrl
                ? {
                    uri: imageUrl,
                    // Add cache busting
                    cache: "reload",
                    headers: {
                      Pragma: "no-cache",
                    },
                  }
                : require("../../assets/default-pet.png")
            }
            style={styles.petImage}
            onError={(e) => {
              console.log("Image Error:", e.nativeEvent.error);
              setImageError(true);
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          {pet.medications ? (
            <>
              <Text style={styles.medicationText}>{pet.medications}</Text>
              <Text style={styles.medicationText}>Twice daily</Text>
            </>
          ) : (
            <Text style={styles.medicationText}>
              No current{"\n"}medications
            </Text>
          )}
        </View>

        <View style={[styles.infoBox, styles.vaccineBox]}>
          <Text style={styles.vaccineText}>Upcoming{"\n"}vaccination on:</Text>
          <Text style={styles.dateText}>{pet.nextVaccination}</Text>
        </View>

        <View style={[styles.infoBox, styles.appointmentBox]}>
          <Text style={styles.appointmentText}>
            Upcoming{"\n"}appointment on:
          </Text>
          <Text style={styles.appointmentDate}>{pet.nextAppointment}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0F8F8",
    borderRadius: 30,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#E8F6F5", // Fallback color
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 28,
    color: "#64C5B7",
    fontWeight: "500",
    marginBottom: 4,
  },
  breed: {
    fontSize: 18,
    color: "#A8D3CF",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#E8EFF1",
    padding: 15,
    borderRadius: 20,
    minHeight: 90,
    justifyContent: "center",
  },
  vaccineBox: {
    backgroundColor: "#E8F6F5",
  },
  appointmentBox: {
    backgroundColor: "#FFE8E8",
  },
  medicationText: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    lineHeight: 22,
  },
  vaccineText: {
    fontSize: 12,
    color: "#64C5B7",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 6,
  },
  appointmentText: {
    fontSize: 12,
    color: "#F26445",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 6,
  },
  dateText: {
    fontSize: 12,
    color: "#64C5B7",
    textAlign: "center",
    fontWeight: "500",
  },
  appointmentDate: {
    fontSize: 12,
    color: "#F26445",
    textAlign: "center",
    fontWeight: "500",
  },
  moreButton: {
    backgroundColor: "#64C5B7",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    width: "35%",
    alignSelf: "center",
  },
  moreButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default PetCard;
