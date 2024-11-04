import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteToken } from "../api/storage";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION from "../navigation";
import UserContext from "../context/UserContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  getUserPetsWithDetails,
  updateUserInfo,
  updateUserProfileImage,
} from "../api/user";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../api/index";
const Greeting = ({ name }) => (
  <Text style={styles.greeting}>Hey, {name}!</Text>
);

const UpcomingEvents = ({ appointments }) => (
  <View style={styles.upcomingEvents}>
    <View style={styles.eventsContainer}>
      {appointments?.Appts?.map((appointment, index) => (
        <View key={index} style={styles.eventCardTeal}>
          <Text style={styles.eventText}>
            Upcoming appointment for {appointment.name} on:
          </Text>
          <Text style={styles.eventDate}>{appointment.date.split("T")[0]}</Text>
        </View>
      ))}
    </View>
  </View>
);

const PersonalInfo = ({ userInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userInfo) {
      setEditedInfo({
        username: userInfo.username || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedInfo);
    setIsEditing(false);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        <Ionicons name="person-outline" size={20} color="#91ACBF" />
        Personal informations
      </Text>
      {Object.entries(editedInfo).map(([key, value], index) => (
        <View key={index} style={styles.infoItem}>
          {isEditing ? (
            <TextInput
              style={styles.infoText}
              value={value}
              onChangeText={(text) =>
                setEditedInfo((prev) => ({ ...prev, [key]: text }))
              }
              placeholder={key}
            />
          ) : (
            <Text style={styles.infoText}>{value}</Text>
          )}
          {!isEditing && (
            <TouchableOpacity onPress={handleEdit}>
              <Ionicons name="pencil" size={20} color="#64C5B7" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const PetInfo = ({ petsInfo }) => (
  <View style={styles.section}>
    <Text style={styles.petSectionTitle}>
      <Ionicons name="gift-outline" size={20} color="#F26445" /> Your pet
      Dashboard
    </Text>
    <View style={styles.petInfoContainer}>
      <Text style={styles.petInfoTitle}>Current favourite service</Text>
      <Text style={styles.petInfoText}>Pet grooming at PetPoint</Text>
      <Text style={styles.petInfoTitle}>Number of pets</Text>
      <Text style={styles.petInfoText}>{petsInfo?.length || 0}</Text>
    </View>
  </View>
);

const BottomNavigation = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="home-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="calendar-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-outline" size={24} color="#64C5B7" />
    </TouchableOpacity>
  </View>
);

const UserImage = ({ imageUri, onImageSelect, userInfo }) => {
  console.log("UserImage Props:", {
    imageUri,
    userInfo: userInfo?.image,
    BASE_URL,
  });

  const displayImage =
    imageUri ||
    (userInfo?.image
      ? `${BASE_URL}/${userInfo.image.replace(/\\/g, "/")}`
      : null);

  console.log("Display Image URL:", displayImage);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        onImageSelect(localUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error selecting image. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
      {displayImage ? (
        <View>
          <Image
            source={{ uri: displayImage }}
            style={styles.profileImage}
            onError={(error) =>
              console.log("Image Error:", error.nativeEvent.error)
            }
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={12} color="#FFFFFF" />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="person" size={30} color="#91ACBF" />
          </View>
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={12} color="#FFFFFF" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const queryClient = useQueryClient();

  console.log("UserInfo from API:", userInfo);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    onSuccess: (data) => {
      console.log("User Info Success:", data);
      if (data?.image) {
        const imageUrl = `${BASE_URL}/${data.image.replace(/\\/g, "/")}`;
        console.log("Setting Profile Image:", imageUrl);
        setProfileImage(imageUrl);
      }
    },
  });

  console.log("USERINFO", userInfo);
  const { data: petsInfo } = useQuery({
    queryKey: ["userPetsDetails"],
    queryFn: getUserPetsWithDetails,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userData) => updateUserInfo(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userInfo"]);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: (formData) => updateUserProfileImage(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userInfo"]);
      alert("Profile image updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating image:", error);
      alert("Failed to update profile image. Please try again.");
      setProfileImage(null);
    },
  });

  const handleImageSelect = async (imageFile) => {
    setProfileImage(imageFile);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      updateImageMutation.mutate(formData);
    } catch (error) {
      console.error("Error handling image upload:", error);
      alert("Error uploading image. Please try again.");
      setProfileImage(null);
    }
  };

  const handleUpdateProfile = async (updatedInfo) => {
    try {
      updateProfileMutation.mutate(updatedInfo);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    navigation.navigate(NAVIGATION.AUTH.LOGIN);
    return null;
  }

  const handleLogout = async () => {
    try {
      await deleteToken();
      setUser(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  console.log("PROFILE", petsInfo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ScrollView style={styles.content}>
          <View style={styles.headerContainer}>
            {/* <UserImage
              imageUri={`${BASE_URL}/${userInfo?.image.replace(/\\/g, "/")}`}
              onImageSelect={handleImageSelect}
              userInfo={userInfo}
            /> */}
            <Greeting name={userInfo?.username} />
          </View>
          <UpcomingEvents appointments={petsInfo} />
          <PersonalInfo userInfo={userInfo} onSave={handleUpdateProfile} />
          <PetInfo petsInfo={userInfo?.pets} />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  greeting: {
    fontFamily: "Telugu MN",
    fontSize: 28,
    fontWeight: "bold",
    color: "#64C5B7",
    marginBottom: 20,
    marginTop: 20,
  },
  upcomingEvents: {
    marginBottom: 20,
  },
  upcomingTitle: {
    fontFamily: "Telugu MN",
    fontSize: 20,
    color: "#64C5B7",
    marginBottom: 10,
  },
  eventsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventCardTeal: {
    backgroundColor: "rgba(100, 197, 183, 0.3)",
    borderRadius: 10,
    padding: 10,
    width: "48%",
    height: 100,
    justifyContent: "space-between",
  },
  eventText: {
    fontFamily: "Telugu MN",
    fontSize: 14,
    color: "#4F9F9B",
  },
  eventDate: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F9F9B",
    alignSelf: "flex-end",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#91ACBF",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#91ACBF",
  },
  infoText: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    color: "#91ACBF",
  },
  petInfoContainer: {
    backgroundColor: "#FFE4E1",
    borderRadius: 10,
    padding: 15,
  },
  petInfoTitle: {
    fontFamily: "Telugu MN",
    fontSize: 16,
    color: "#F26445",
    marginBottom: 5,
  },
  petInfoText: {
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#F26445",
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    padding: 10,
  },
  petSectionTitle: {
    fontFamily: "Telugu MN",
    fontSize: 18,
    fontWeight: "bold",
    color: "#F26445",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#F26445",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Telugu MN",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  imageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8EEF1",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#64C5B7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontFamily: "Telugu MN",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default UserProfile;
