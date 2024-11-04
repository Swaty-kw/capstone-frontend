import React, { useState, useEffect } from "react";
import { getPetAppointments } from "../api/pets";
import { getUserInfo } from "../api/user";
import { fetchAppointments } from "../api/Services";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation/index";
import { useQuery } from "@tanstack/react-query";
import { getUserPets } from "../api/pets";
import { BASE_URL } from "../api";
import * as Calendar from "expo-calendar";
import { Platform, Alert } from "react-native";

const AppointmentCard = ({
  showCalendar,
  date,
  time,
  pet,
  petImage,
  serviceType,
  clinicName,
}) => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [eventId, setEventId] = useState(null);

  // Request calendar permissions
  const getCalendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      return true;
    }
    Alert.alert(
      "Permission Required",
      "Calendar permission is required to set reminders"
    );
    return false;
  };

  // Get default calendar
  const getDefaultCalendarSource = async () => {
    const defaultCalendar =
      Platform.OS === "ios"
        ? await Calendar.getDefaultCalendarAsync()
        : (await Calendar.getCalendarsAsync())[0];
    return defaultCalendar;
  };

  // Add event to calendar
  const addToCalendar = async () => {
    try {
      const hasPermission = await getCalendarPermission();
      if (!hasPermission) return;

      const calendar = await getDefaultCalendarSource();

      // Create appointment date object
      const appointmentDate = new Date(date);
      const [hours, minutes] = time.split(":");
      appointmentDate.setHours(parseInt(hours), parseInt(minutes));

      // Create end time (1 hour after start)
      const endTime = new Date(appointmentDate);
      endTime.setHours(endTime.getHours() + 1);

      const eventDetails = {
        title: `Pet Appointment - ${pet}`,
        startDate: appointmentDate,
        endDate: endTime,
        timeZone: "GMT+3", // Kuwait timezone
        location: clinicName,
        notes: `${serviceType} appointment for ${pet} at ${clinicName}`,
        alarms: [{ relativeOffset: -60 }], // Reminder 1 hour before
        calendarId: calendar.id,
      };

      const eventId = await Calendar.createEventAsync(
        calendar.id,
        eventDetails
      );
      setEventId(eventId);
      Alert.alert("Success", "Appointment added to calendar");
      setIsEnabled(true);
    } catch (error) {
      console.error("Calendar error:", error);
      Alert.alert("Error", "Failed to add appointment to calendar");
      setIsEnabled(false);
    }
  };

  // Remove event from calendar
  const removeFromCalendar = async () => {
    try {
      if (eventId) {
        await Calendar.deleteEventAsync(eventId);
        setEventId(null);
        Alert.alert("Success", "Appointment removed from calendar");
      }
      setIsEnabled(false);
    } catch (error) {
      console.error("Remove calendar error:", error);
      Alert.alert("Error", "Failed to remove appointment from calendar");
    }
  };

  // Handle switch toggle
  const toggleSwitch = async () => {
    if (!isEnabled) {
      await addToCalendar();
    } else {
      await removeFromCalendar();
    }
  };

  // console.log("date", date);
  // console.log("pet", pet);
  // console.log("petImage", petImage);

  // console.log("AppointmentCard Props:", {
  //   date,
  //   pet,
  //   petImage,
  //   serviceType,
  //   clinicName,
  // });

  // Add debug log to see what data we're receiving
  // console.log("Appointment Details:", {
  //   serviceType,
  //   clinicName,
  //   date,
  //   time,
  // });

  // Format the appointment date and time
  const formatAppointment = (date, time) => {
    if (!date || !time) return "No date available";

    // Create a date object from the appointment date
    const appointmentDate = new Date(date);

    // Format the date part
    const formattedDate = appointmentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Return formatted date and time
    return `${formattedDate} at ${time}`;
  };

  // Format service type to be more readable
  const getServiceType = (type) => {
    switch (type) {
      case "VetClinic":
        return "Vet Clinic";
      case "checkup":
        return "Check Up";
      case "vaccination":
        return "Vaccination";
      case "Grooming":
        return "Grooming";
      default:
        return type;
    }
  };

  // Get clinic name from the booking data
  // console.log("Clinic Data:", clinicName); // Debug log

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.leftColumn}>
        <Image
          source={{ uri: `${BASE_URL}/${petImage.replace(/\\/g, "/")}` }}
          style={styles.appointmentImage}
        />
        {showCalendar && (
          <View style={styles.bottomRow}>
            <View style={styles.reminderContainer}>
              <Switch
                trackColor={{ false: "#E0E0E0", true: "#E3EAFF" }}
                thumbColor={isEnabled ? "#64C5B7" : "#f4f3f4"}
                ios_backgroundColor="#E0E0E0"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.reminderSwitch}
              />
              <Text style={styles.rescheduleText}>
                {isEnabled ? "Added to Calendar" : "Add to Calendar"}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDate}>
          {formatAppointment(date, time)}
        </Text>
        <Text style={styles.petName}>{pet}</Text>
      </View>
    </View>
  );
};

const MyAppointments = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [underlineAnim] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getPetAppointments"],
    queryFn: getPetAppointments,
  });

  console.log("Raw Appointments Data:", appointments);

  const petAppt = appointments?.filter((pet) => {
    // console.log("Pet and its appointments:", {
    //   petName: pet.name,
    //   appointments: pet.Appts,
    // });
    return pet.Appts && pet.Appts.length > 0;
  });

  console.log("PETAPPT", petAppt);
  const pastAppts = [];
  petAppt?.forEach((pet) => {
    pet.Appts?.forEach((appt) => {
      if (new Date(appt.date) < new Date()) {
        pastAppts.push(pet);
      }
    });
  });

  console.log("PASTAPPTS", pastAppts);
  const upcomingAppts = [];
  petAppt?.forEach((pet) => {
    pet.Appts?.forEach((appt) => {
      console.log("APPT", appt.date);
      console.log("NEW DATE", new Date());
      if (new Date(appt.date) > new Date()) {
        upcomingAppts.push(pet);
      }
    });
  });
  console.log("UPCOMINGAPPTS", upcomingAppts);

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

  const handleBookAppointment = () => {
    navigation.navigate(NAVIGATION.SERVICE.CHOOSE_SERVICE);
  };

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

  const flattenAppointments = (pets) => {
    if (!pets) return [];
    return pets.flatMap((pet) =>
      pet.Appts.map((appt) => ({
        ...appt,
        petName: pet.name,
        petImage: pet.image,
        petId: pet._id,
      }))
    );
  };
  const allAppointments = flattenAppointments(petAppt);
  console.log("ALLAPPOINTMENTS", allAppointments);
  const upcomingApptsFlat = allAppointments.filter(
    (appt) => new Date(appt.date) > new Date()
  );
  const pastApptsFlat = allAppointments.filter(
    (appt) => new Date(appt.date) < new Date()
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#91ACBF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Appointments</Text>
        <View style={{ width: 24 }} />
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

      <ScrollView
        style={styles.appointmentsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <Text>Loading appointments...</Text>
        ) : activeTab === "upcoming" ? (
          upcomingApptsFlat.length > 0 ? (
            upcomingApptsFlat.map((appt, index) => {
              return (
                <AppointmentCard
                  key={`${appt.petId}-${index}`}
                  showCalendar={true}
                  date={appt.date}
                  time={appt.time}
                  pet={appt.petName}
                  petImage={appt.petImage}
                  serviceType={appt.notes}
                  clinicName={appt.clinicName} // This was saved during booking
                />
              );
            })
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No upcoming appointments
              </Text>
            </View>
          )
        ) : activeTab === "past" ? (
          pastApptsFlat.length > 0 ? (
            pastApptsFlat.map((appt, index) => {
              return (
                <AppointmentCard
                  key={`${appt.petId}-${index}`}
                  showCalendar={false}
                  date={appt.date}
                  time={appt.time}
                  pet={appt.petName}
                  petImage={appt.petImage}
                  serviceType={appt.notes}
                  clinicName={appt.clinicName} // This was saved during booking
                />
              );
            })
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No past appointments</Text>
            </View>
          )
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No appointments available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    color: "#91ACBF",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
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
  tabActive: {
    fontSize: 18,
    color: "#91ACBF",
    fontWeight: "500",
  },
  tabInactive: {
    fontSize: 18,
    color: "#64C5B7",
    fontWeight: "400",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#91ACBF",
  },
  appointmentsList: {
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: "#F0F8F8",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  leftColumn: {
    width: "40%",
  },
  appointmentImage: {
    width: 60,
    height: 60,
    backgroundColor: "#E8EFF1",
    borderRadius: 12,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderSwitch: {
    transform: [{ scale: 0.8 }],
  },
  reminderText: {
    fontSize: 12,
    color: "#91ACBF",
    marginRight: 5,
  },
  rescheduleButton: {
    backgroundColor: "#E8F6F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 5,
  },
  rescheduleText: {
    color: "#64C5B7",
    fontSize: 12,
  },
  appointmentDetails: {
    flex: 1,
    marginRight: 15,
  },
  appointmentDate: {
    fontSize: 16,
    color: "#91ACBF",
    marginBottom: 5,
  },
  petName: {
    fontSize: 14,
    color: "#64C5B7",
    marginBottom: 5,
  },
  serviceDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  serviceName: {
    fontSize: 14,
    color: "#91ACBF",
    opacity: 0.8,
  },
  clinicName: {
    fontSize: 14,
    color: "#91ACBF",
    opacity: 0.8,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#91ACBF",
  },
});

export default MyAppointments;
