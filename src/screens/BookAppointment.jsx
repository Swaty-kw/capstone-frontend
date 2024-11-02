import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Linking,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_PLACES_API_KEY } from "../api/config";
import { BASE_URL } from "../api/index";
const BookAppointment = ({ route }) => {
  const { clinicName, clinicLocation, clinicRating, clinicImage } =
    route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add this console log to check the image path
  console.log("Clinic Image Path:", {
    fullPath: `${BASE_URL}/${clinicImage?.replace(/\\/g, "/")}`,
    clinicImage: clinicImage,
    BASE_URL: BASE_URL,
  });

  // Generate months for the next 2 years
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 24; i++) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() + i);
      months.push(date);
    }
    return months;
  };

  // Generate dates for the selected month
  const generateDatesForMonth = (month) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dates = [];
    const today = new Date();

    // If selected month is current month, start from today
    // Otherwise, start from the 1st of the month
    const startDate =
      month.getMonth() === today.getMonth() ? today.getDate() : 1;

    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    for (let i = startDate; i <= lastDay.getDate(); i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      dates.push({
        day: days[date.getDay()],
        date: date.getDate(),
        full: date,
      });
    }
    return dates;
  };

  // Generate available time slots based on selected date
  const generateTimeSlots = (selectedDate) => {
    const times = [];
    const now = new Date();
    const isToday =
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear();

    // Clinic hours: 8 AM to 8 PM
    const startHour = isToday ? now.getHours() + 1 : 8; // If today, start from next hour
    const endHour = 20; // 8 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Add slots every 30 minutes
      ["00", "30"].forEach((minutes) => {
        if (
          isToday &&
          hour === now.getHours() &&
          parseInt(minutes) <= now.getMinutes()
        ) {
          return; // Skip past times for today
        }

        const timeString = `${hour.toString().padStart(2, "0")}:${minutes}`;
        const displayTime = new Date(
          `2000-01-01T${timeString}`
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        times.push(displayTime);
      });
    }

    return times;
  };

  const dates = generateDatesForMonth(selectedMonth);

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date.full);
    setSelectedTime(null); // Reset time when date changes
    setAvailableTimes(generateTimeSlots(date.full));
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthPicker(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const months = generateMonths();

  const fetchPlaceDetails = async () => {
    try {
      const searchQuery = `${clinicName} ${clinicLocation} Kuwait`;

      const searchResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          searchQuery
        )}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const searchData = await searchResponse.json();

      if (searchData.results && searchData.results[0]) {
        const placeId = searchData.results[0].place_id;

        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,formatted_address,geometry,opening_hours,formatted_phone_number,website,business_status&key=${GOOGLE_PLACES_API_KEY}`
        );
        const detailsData = await detailsResponse.json();

        if (detailsData.result) {
          setPlaceDetails(detailsData.result);
        }
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaceDetails();
  }, [clinicName, clinicLocation]);

  const formatReviewCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  const handlePhoneCall = (phoneNumber) => {
    if (phoneNumber) {
      const phoneUrl = `tel:${phoneNumber.replace(/\s+/g, "")}`;
      Linking.canOpenURL(phoneUrl)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(phoneUrl);
          }
        })
        .catch((error) => console.log("Error making phone call:", error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#64C5B7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book an appointment</Text>
      </View>

      {/* Clinic Info */}
      <View style={styles.clinicContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${BASE_URL}/${clinicImage?.replace(/\\/g, "/")}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>
            {placeDetails?.name || clinicName}
          </Text>
          <Text style={styles.clinicAddress}>
            {placeDetails?.formatted_address || clinicLocation}
          </Text>
        </View>
      </View>

      {/* Rating and Phone Number */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          {placeDetails?.rating?.toFixed(1) || clinicRating} (
          {formatReviewCount(placeDetails?.user_ratings_total || 0)} reviews)
        </Text>
        <Text style={styles.ratingText}> | </Text>
        <TouchableOpacity
          style={styles.phoneContainer}
          onPress={() => handlePhoneCall(placeDetails?.formatted_phone_number)}
        >
          <Ionicons name="call" size={20} color="#64C5B7" />
          <Text style={[styles.ratingText, styles.phoneText]}>
            {placeDetails?.formatted_phone_number || "No phone"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        {/* White line at top */}
        <View style={styles.whiteLine} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            style={styles.monthSelector}
            onPress={() => setShowMonthPicker(true)}
          >
            <Text style={styles.monthText}>
              {selectedMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Date Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateScrollContainer}
          >
            <View style={styles.dateContainer}>
              {dates.map((item) => (
                <TouchableOpacity
                  key={item.date}
                  style={[
                    styles.dateButton,
                    selectedDate &&
                      selectedDate.getDate() === item.date &&
                      styles.selectedDate,
                  ]}
                  onPress={() => handleDateSelect(item)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selectedDate &&
                        selectedDate.getDate() === item.date &&
                        styles.selectedText,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate &&
                        selectedDate.getDate() === item.date &&
                        styles.selectedText,
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedDate && (
            <>
              <Text style={styles.availableText}>Available appointments</Text>
              <View style={styles.timeContainer}>
                {availableTimes.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      selectedTime === time && styles.selectedTime,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        selectedTime === time && styles.selectedTimeText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedDate || !selectedTime) && styles.confirmButtonDisabled,
            ]}
            disabled={!selectedDate || !selectedTime}
          >
            <Text style={styles.confirmText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Month Picker Modal */}
      <Modal visible={showMonthPicker} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                <Ionicons name="close" size={24} color="#64C5B7" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.monthOption}
                  onPress={() => handleMonthSelect(month)}
                >
                  <Text style={styles.monthOptionText}>
                    {month.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 15,
  },
  headerTitle: {
    fontSize: 28,
    color: "#64C5B7",
    fontWeight: "400",
  },
  clinicContainer: {
    flexDirection: "row",
    gap: 15,
    padding: 15,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#E8EEF1",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  clinicInfo: {
    flex: 1,
    justifyContent: "center",
  },
  clinicName: {
    fontSize: 24,
    color: "#64C5B7",
    fontWeight: "400",
    marginBottom: 5,
  },
  clinicAddress: {
    fontSize: 18,
    color: "#91ACBF",
    lineHeight: 24,
    opacity: 0.8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  ratingText: {
    fontSize: 20,
    color: "#64C5B7",
    fontWeight: "400",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
  },
  phoneText: {
    textDecorationLine: "underline",
  },
  calendarSection: {
    flex: 1,
    backgroundColor: "#64C5B7",
    marginTop: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  whiteLine: {
    height: 5,
    backgroundColor: "#FFFFFF",
    width: "15%",
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 15,
    marginBottom: 25,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 25,
  },
  monthText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  dateContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 5,
  },
  dateButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: 70,
    height: 70,
  },
  selectedDate: {
    backgroundColor: "#FFFFFF",
  },
  dayText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  selectedText: {
    color: "#64C5B7",
  },
  availableText: {
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 25,
    fontWeight: "400",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  timeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    minWidth: 110,
    alignItems: "center",
  },
  selectedTime: {
    backgroundColor: "#FFFFFF",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
  },
  selectedTimeText: {
    color: "#64C5B7",
  },
  confirmButton: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 35,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmText: {
    color: "#64C5B7",
    fontSize: 24,
    fontWeight: "400",
  },
  scrollContent: {
    padding: 20,
  },
  bottomPadding: {
    height: 80, // Space for the confirm button
  },
  confirmButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#64C5B7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: "#64C5B7",
    fontWeight: "400",
  },
  monthOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F6F5",
  },
  monthOptionText: {
    fontSize: 18,
    color: "#64C5B7",
  },
  dateScrollContainer: {
    marginBottom: 40,
  },
});

export default BookAppointment;
