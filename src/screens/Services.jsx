import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceCard = ({ name, price, duration }) => {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.leftColumn}>
        <View style={styles.serviceImage} />
        <View style={styles.bottomRow}>
          <Text style={styles.duration}>{duration}</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceName}>{name}</Text>
        <Text style={styles.servicePrice}>${price}</Text>
      </View>
    </View>
  );
};

export default function Services() {
  const [activeTab, setActiveTab] = useState("all");
  const [underlineAnim] = useState(new Animated.Value(0));

  const animateUnderline = (toValue) => {
    Animated.timing(underlineAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    animateUnderline(tab === "all" ? 0 : 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Services</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("all")}
        >
          <Text
            style={activeTab === "all" ? styles.tabActive : styles.tabInactive}
          >
            All Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("popular")}
        >
          <Text
            style={
              activeTab === "popular" ? styles.tabActive : styles.tabInactive
            }
          >
            Popular
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
      <View style={styles.servicesList}>
        <ServiceCard name="Regular Checkup" price="50" duration="30 min" />
        <ServiceCard name="Vaccination" price="75" duration="45 min" />
        <ServiceCard name="Dental Cleaning" price="120" duration="60 min" />
        <ServiceCard name="Grooming" price="80" duration="90 min" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    position: "relative",
  },
  tabButton: {
    paddingBottom: 16,
    width: "50%",
    alignItems: "center",
  },
  tabActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F5FE3",
  },
  tabInactive: {
    fontSize: 16,
    color: "#757575",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#2F5FE3",
  },
  servicesList: {
    padding: 16,
  },
  serviceCard: {
    flexDirection: "row",
    backgroundColor: "#F5F8FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
  },
  serviceImage: {
    width: 60,
    height: 60,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginTop: -8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  duration: {
    fontSize: 14,
    color: "#757575",
  },
  bookButton: {
    backgroundColor: "#E3EAFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookText: {
    color: "#2F5FE3",
    fontSize: 14,
  },
  serviceDetails: {
    marginLeft: 12,
    position: "absolute",
    left: 88,
    top: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    color: "#2F5FE3",
    fontWeight: "bold",
  },
});
