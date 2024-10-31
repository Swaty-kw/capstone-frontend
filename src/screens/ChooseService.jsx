import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation/index";

const ChooseService = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState("VetClinic");
  const [underlineAnim] = useState(new Animated.Value(0));

  const animateUnderline = (toValue) => {
    Animated.timing(underlineAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (tab) => {
    setSelectedService(tab);
    animateUnderline(tab === "VetClinic" ? 0 : 1);
  };

  const vetClinics = [
    {
      name: "City Pet Clinic",
      location: "Shuwaikh Industrial, Kuwait",
      rating: "4.8",
    },
    { name: "Pet Care Center", location: "Salmiya, Kuwait", rating: "4.5" },
    {
      name: "Animal Care Hospital",
      location: "Jabriya, Kuwait",
      rating: "4.7",
    },
    { name: "Paws & Claws Clinic", location: "Hawally, Kuwait", rating: "4.6" },
  ];

  const groomingServices = [
    {
      name: "Pets Grooming Center",
      location: "Salmiya, Kuwait",
      rating: "4.9",
    },
    { name: "Pampered Paws", location: "Jabriya, Kuwait", rating: "4.7" },
    { name: "Furry Friends Salon", location: "Hawally, Kuwait", rating: "4.8" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#91ACBF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Services</Text>
        <View style={{ width: 24 }} />
      </View> */}

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("VetClinic")}
        >
          <Text
            style={[
              styles.tabText,
              selectedService === "VetClinic" && styles.activeTab,
            ]}
          >
            Vet Clinic
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("Grooming")}
        >
          <Text
            style={[
              styles.tabText,
              selectedService === "Grooming" && styles.activeTab,
            ]}
          >
            Grooming
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

      {/* Services List */}
      <View style={styles.servicesContainer}>
        {selectedService === "VetClinic"
          ? vetClinics.map((clinic, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.imageContainer} />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{clinic.name}</Text>
                  <Text style={styles.locationText}>{clinic.location}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#64C5B7" />
                    <Text style={styles.ratingText}>{clinic.rating}</Text>
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => {
                      navigation.navigate(NAVIGATION.SERVICE.BOOK_APPOINTMENT, {
                        clinicName: clinic.name,
                        clinicLocation: clinic.location,
                        clinicRating: clinic.rating,
                      });
                    }}
                  >
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.bookButton, styles.reviewsButton]}
                    onPress={() =>
                      navigation.navigate("Review", {
                        clinicName: clinic.name,
                        clinicLocation: clinic.location,
                        clinicRating: clinic.rating,
                      })
                    }
                  >
                    <Text style={styles.bookText}>Reviews</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          : groomingServices.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.imageContainer} />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.locationText}>{service.location}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#64C5B7" />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => {
                      navigation.navigate(NAVIGATION.SERVICE.BOOK_APPOINTMENT, {
                        clinicName: service.name,
                        clinicLocation: service.location,
                        clinicRating: service.rating,
                      });
                    }}
                  >
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.bookButton, styles.reviewsButton]}
                    onPress={() =>
                      navigation.navigate("Review", {
                        clinicName: service.name,
                        clinicLocation: service.location,
                        clinicRating: service.rating,
                      })
                    }
                  >
                    <Text style={styles.bookText}>Reviews</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: "#91ACBF",
    fontWeight: "500",
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
  tabText: {
    fontSize: 18,
    color: "#64C5B7",
    fontWeight: "400",
  },
  activeTab: {
    color: "#91ACBF",
    fontWeight: "500",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#91ACBF",
  },
  servicesContainer: {
    flex: 1,
    gap: 15,
  },
  serviceCard: {
    backgroundColor: "#F8FAFB",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#E8EEF1",
    borderRadius: 15,
  },
  serviceInfo: {
    flex: 1,
    gap: 5,
  },
  serviceName: {
    fontSize: 16,
    color: "#91ACBF",
    fontWeight: "500",
  },
  locationText: {
    fontSize: 14,
    color: "#91ACBF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#91ACBF",
    fontWeight: "500",
  },
  buttonsContainer: {
    alignItems: "center",
    gap: 8,
  },
  bookButton: {
    backgroundColor: "#64C5B7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  reviewsButton: {
    backgroundColor: "#91ACBF",
  },
  bookText: {
    color: "white",
    fontSize: 14,
  },
});

export default ChooseService;
