import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppointmentCard = ({ date, clinic }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.leftColumn}>
        <View style={styles.appointmentImage} />
        <View style={styles.bottomRow}>
          <View style={styles.reminderContainer}>
            <Switch
              trackColor={{ false: "#E0E0E0", true: "#E3EAFF" }}
              thumbColor={isEnabled ? "#2F5FE3" : "#f4f3f4"}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.reminderSwitch}
            />
            <Text style={styles.reminderText}>30 min before</Text>
          </View>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDate}>{date}</Text>
        <Text style={styles.clinicName}>{clinic}</Text>
      </View>
    </View>
  );
};

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
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
    animateUnderline(tab === "upcoming" ? 0 : 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>My appointments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#2F5FE3" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("upcoming")}
        >
          <Text
            style={
              activeTab === "upcoming" ? styles.tabActive : styles.tabInactive
            }
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress("past")}
        >
          <Text
            style={activeTab === "past" ? styles.tabActive : styles.tabInactive}
          >
            Past
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
      <View style={styles.appointmentsList}>
        <AppointmentCard
          date="October 20, 2024, 10:30 AP"
          clinic="City Pet Clinic"
        />
        <AppointmentCard
          date="October 20, 2024, 10:30 AP"
          clinic="City Pet Clinic"
        />
        <AppointmentCard
          date="October 20, 2024, 10:30 AP"
          clinic="City Pet Clinic"
        />
        <AppointmentCard
          date="October 20, 2024, 10:30 AP"
          clinic="City Pet Clinic"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed from #F5F5F5 to white
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
  addButton: {
    padding: 8,
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
    color: "#2F5FE3", // Changed to blue
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
    backgroundColor: "#2F5FE3", // Changed to blue
  },
  appointmentsList: {
    padding: 16,
  },
  appointmentCard: {
    flexDirection: "row",
    backgroundColor: "#F5F8FF", // Changed to light blue
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start", // Changed from 'center' to 'flex-start'
  },
  leftColumn: {
    flex: 1,
  },
  appointmentImage: {
    width: 60,
    height: 60,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginTop: -8, // Added negative margin to lift it up
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -4, // Changed from -8 to -4 to shift right
  },
  reminderSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: -4,
  },
  reminderText: {
    fontSize: 14,
    color: "#757575",
  },
  rescheduleButton: {
    backgroundColor: "#E3EAFF", // Changed to light blue
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rescheduleText: {
    color: "#2F5FE3", // Changed to blue
    fontSize: 14,
  },
  appointmentDetails: {
    marginLeft: 12,
    position: "absolute",
    left: 88, // Adjust based on image width + padding
    top: 16,
  },
});

export default MyAppointments;
