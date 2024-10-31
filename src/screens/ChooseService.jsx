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
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../api/Services";

export default ChooseService = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState("VetClinic");
  const [underlineAnim] = useState(new Animated.Value(0));
  const Services = [
    {
      type: String,
      name: String,
      image: String,
      Location: String,
      // Appts: mongoose.Schema.Types.ObjectId,
      // reviews: [mongoose.Schema.Types.ObjectId],
      averageRating: Number,
    },
  ];

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

  const filterServices = (type) => {
    return Services.filter((service) => service.type === type);
  };

  const vetServices = filterServices("Veterinary");

  const { data, isLoading, error } = useQuery({
    queryKey: ["AllServices"],
    queryFn: getAllServices,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching services</Text>;
  }

  // const filteredServices =
  //   activeTab === "all" ? data : filterServices("activeTab");

  console.log({ data: data.map((d) => d.location) });
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
          ? data
              .filter((d) => d.serviceType == "Vet Clinic")
              .map((clinic, index) => (
                <View key={index} style={styles.serviceCard}>
                  <View style={styles.imageContainer} />
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{clinic.name}</Text>
                    <Text style={styles.locationText}>{clinic.location?.address}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#64C5B7" />
                      <Text style={styles.ratingText}>
                        {clinic.averageRating}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => {
                        navigation.navigate(
                          NAVIGATION.SERVICE.BOOK_APPOINTMENT,
                          {
                            clinicName: clinic.name,
                            clinicLocation: clinic.location?.address,
                            clinicRating: clinic.averageRating,
                          }
                        );
                      }}
                    >
                      <Text style={styles.bookText}>Book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bookButton, styles.reviewsButton]}
                      onPress={() =>
                        navigation.navigate("Review", {
                          clinicName: clinic.name,
                          clinicLocation: clinic.location?.address,
                          clinicRating: clinic.averageRating,
                        })
                      }
                    >
                      <Text style={styles.bookText}>Reviews</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
          : data
              .filter((d) => d.serviceType == "Grooming Service")
              .map((service, index) => (
                <View key={index} style={styles.serviceCard}>
                  <View style={styles.imageContainer} />
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.locationText}>
                      {service.location?.address}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#64C5B7" />
                      <Text style={styles.ratingText}>
                        {service.averageRating}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => {
                        navigation.navigate(
                          NAVIGATION.SERVICE.BOOK_APPOINTMENT,
                          {
                            clinicName: service.name,
                            clinicLocation: service.location?.address,
                            clinicRating: service.averageRating,
                          }
                        );
                      }}
                    >
                      <Text style={styles.bookText}>Book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bookButton, styles.reviewsButton]}
                      onPress={() =>
                        navigation.navigate("Review", {
                          clinicName: service.name,
                          clinicLocation: service.location?.address,
                          clinicRating: service.averageRating,
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
