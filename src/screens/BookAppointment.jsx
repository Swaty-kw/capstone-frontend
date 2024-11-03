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
import { fetchAppointments } from "../api/Services";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_PLACES_API_KEY } from "../api/config";
import { BASE_URL } from "../api/index";
import { SelectList } from "react-native-dropdown-select-list";
import { getUserPets } from "../api/pets";
import { useQuery } from "@tanstack/react-query";

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
  const [userPets, setUserPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const { data: petsData, isLoading: petsLoading } = useQuery({
    queryKey: ["getUserPets"],
    queryFn: getUserPets,
  });

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

        {selectedTime && (
          <>
            <View style={styles.petSelectWrapper}>
              <Text style={styles.availableText}>Select Pet</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.petsScrollView}
              >
                {petsData?.pets?.map((pet) => (
                  <TouchableOpacity
                    key={pet._id}
                    style={[
                      styles.petCard,
                      selectedPet?._id === pet._id && styles.selectedPetCard,
                    ]}
                    onPress={() => {
                      setSelectedPet(pet);
                      setSelectedService(null); // Reset service when changing pet
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URL}/${pet.image?.replace(/\\/g, "/")}`,
                      }}
                      style={styles.petImage}
                    />
                    <Text
                      style={[
                        styles.petName,
                        selectedPet?._id === pet._id && styles.selectedPetText,
                      ]}
                    >
                      {pet.name}
                    </Text>
                    <Text
                      style={[
                        styles.petBreed,
                        selectedPet?._id === pet._id && styles.selectedPetText,
                      ]}
                    >
                      {pet.breed}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {selectedPet && (
              <View style={styles.serviceSelectWrapper}>
                <Text style={styles.availableText}>Services</Text>
                <View style={styles.servicesGrid}>
                  {route.params.clinicType === "Vet Clinic" ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.serviceCard,
                          selectedService === "checkup" &&
                            styles.selectedServiceCard,
                        ]}
                        onPress={() => setSelectedService("checkup")}
                      >
                        <View style={styles.iconCircle}>
                          <Ionicons
                            name="medical-outline"
                            size={24}
                            color="#64C5B7"
                          />
                        </View>
                        <Text style={styles.serviceText}>Check Up</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.serviceCard,
                          selectedService === "vaccination" &&
                            styles.selectedServiceCard,
                        ]}
                        onPress={() => setSelectedService("vaccination")}
                      >
                        <View style={styles.iconCircle}>
                          <Ionicons
                            name="fitness-outline"
                            size={24}
                            color="#64C5B7"
                          />
                        </View>
                        <Text style={styles.serviceText}>Vaccination</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.serviceCard,
                          selectedService === "grooming" &&
                            styles.selectedServiceCard,
                        ]}
                        onPress={() => setSelectedService("grooming")}
                      >
                        <View style={styles.iconCircle}>
                          <Ionicons
                            name="cut-outline"
                            size={24}
                            color="#64C5B7"
                          />
                        </View>
                        <Text style={styles.serviceText}>Grooming</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.serviceCard,
                          selectedService === "spa" &&
                            styles.selectedServiceCard,
                        ]}
                        onPress={() => setSelectedService("spa")}
                      >
                        <View style={styles.iconCircle}>
                          <Ionicons
                            name="water-outline"
                            size={24}
                            color="#64C5B7"
                          />
                        </View>
                        <Text style={styles.serviceText}>Spa</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          </>
        )}

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedDate ||
                !selectedTime ||
                !selectedPet ||
                !selectedService) &&
                styles.confirmButtonDisabled,
            ]}
            disabled={
              !selectedDate || !selectedTime || !selectedPet || !selectedService
            }
          >
            <Text style={styles.confirmText}>Confirm</Text>
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
    padding: 13,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
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
    borderRadius: 20,
  },
  clinicInfo: {
    flex: 1,
    justifyContent: "center",
  },
  clinicName: {
    fontSize: 16,
    color: "#64C5B7",
    fontWeight: "400",
    marginBottom: 5,
  },
  clinicAddress: {
    fontSize: 14,
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
  // whiteLine: {
  //   height: 5,
  //   backgroundColor: "#FFFFFF",
  //   width: "15%",
  //   alignSelf: "center",
  //   borderRadius: 3,
  //   marginTop: 15,
  //   marginBottom: 25,
  // },
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
    padding: 8,
    borderRadius: 13,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: 58,
    height: 58,
  },
  selectedDate: {
    backgroundColor: "#FFFFFF",
  },
  dayText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginBottom: 4,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 14,
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
    borderRadius: 13,
    minWidth: 88,
    alignItems: "center",
  },
  selectedTime: {
    backgroundColor: "#FFFFFF",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 12,
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
    alignSelf: "center",
    width: 150,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmText: {
    color: "#64C5B7",
    fontSize: 20,
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
  confirmButtonText: {
    fontSize: 13,
  },
  dropdownContainer: {
    marginTop: 15,
  },
  dropdown: {
    width: "100%",
    height: 40,
    backgroundColor: "#F8FAFB",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E8EEF1",
  },
  dropdownText: {
    fontSize: 14,
    color: "#91ACBF",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#64C5B7",
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  petSelectContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#64C5B7",
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "400",
    marginBottom: 10,
  },
  petSelectWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  petsScrollView: {
    marginTop: 10,
  },
  petCard: {
    width: 100,
    marginHorizontal: 8,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedPetCard: {
    backgroundColor: "#FFFFFF",
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  petName: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
    fontWeight: "500",
  },
  petBreed: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  selectedPetText: {
    color: "#64C5B7",
  },
  serviceOption: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    gap: 8,
  },
  selectedServiceOption: {
    backgroundColor: "#FFFFFF",
  },
  serviceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedServiceText: {
    color: "#64C5B7",
  },
  serviceSelectWrapper: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 10,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
    marginTop: 10,
  },
  serviceCard: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedServiceCard: {
    backgroundColor: "#FFFFFF",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 13,
    padding: 12,
    marginTop: 5,
  },
  selectedItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedPetImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  selectedServiceIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default BookAppointment;
