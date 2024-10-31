import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import StarRating from "../components/StarRating"; // You'll need to create this component
import BottomNavBar from "../components/BottomNavBar"; // You'll need to create this component
import Ionicons from "react-native-vector-icons/Ionicons";

const Review = ({ route }) => {
  const { clinicName, clinicLocation, clinicRating } = route.params;

  // Add coordinates for each location
  const locationCoordinates = {
    "City Pet Clinic": {
      lat: 29.3399,
      lng: 47.9337,
      address: "Block 1, Street 2, Shuwaikh Industrial, Kuwait",
    },
    "Pet Care Center": {
      lat: 29.3317,
      lng: 48.0258,
      address: "Salem Al Mubarak Street, Salmiya, Kuwait",
    },
    "Animal Care Hospital": {
      lat: 29.3267,
      lng: 48.0163,
      address: "Block 12, Street 103, Jabriya, Kuwait",
    },
    "Paws & Claws Clinic": {
      lat: 29.3378,
      lng: 47.9755,
      address: "Tunis Street, Block 4, Hawally, Kuwait",
    },
    "Pets Grooming Center": {
      lat: 29.3317,
      lng: 48.0258,
      address: "Block 10, Salem Al Mubarak Street, Salmiya, Kuwait",
    },
    "Pampered Paws": {
      lat: 29.3267,
      lng: 48.0163,
      address: "Block 8, Street 105, Jabriya, Kuwait",
    },
    "Furry Friends Salon": {
      lat: 29.3378,
      lng: 47.9755,
      address: "Block 2, Ibn Khaldoun Street, Hawally, Kuwait",
    },
  };

  const openMaps = () => {
    const location = locationCoordinates[clinicName];
    if (location) {
      const { lat, lng, address } = location;
      const scheme = Platform.select({
        ios: "maps:0,0?q=",
        android: "geo:0,0?q=",
      });
      const latLng = `${lat},${lng}`;
      const label = clinicName;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.openURL(url).catch((err) =>
        console.error("An error occurred", err)
      );
    }
  };

  // Reviews database
  const reviewsDatabase = {
    // Vet Clinics Reviews
    "City Pet Clinic": {
      totalReviews: 156,
      ratingDistribution: [85, 45, 15, 8, 3], // 5 star to 1 star
      reviews: [
        {
          userName: "Sarah M.",
          rating: 5,
          date: "March 15, 2024",
          review:
            "Dr. Ahmad was amazing with my anxious cat. Very patient and professional staff.",
          helpful: 24,
        },
        {
          userName: "Mohammed K.",
          rating: 5,
          date: "March 10, 2024",
          review:
            "Best veterinary clinic in Kuwait. They took great care of my dog during surgery.",
          helpful: 18,
        },
        {
          userName: "Fatima A.",
          rating: 4,
          date: "March 5, 2024",
          review:
            "Very clean facility and friendly staff. Slightly expensive but worth it.",
          helpful: 15,
        },
      ],
    },
    "Pet Care Center": {
      totalReviews: 124,
      ratingDistribution: [70, 35, 12, 5, 2],
      reviews: [
        {
          userName: "Abdullah H.",
          rating: 5,
          date: "March 12, 2024",
          review: "Excellent emergency service. They saved my puppy at 2 AM!",
          helpful: 31,
        },
        {
          userName: "Lisa R.",
          rating: 4,
          date: "March 8, 2024",
          review: "Good service but sometimes the wait time is long.",
          helpful: 12,
        },
      ],
    },

    // Grooming Services Reviews
    "Pets Grooming Center": {
      totalReviews: 198,
      ratingDistribution: [95, 65, 25, 8, 5],
      reviews: [
        {
          userName: "Noura S.",
          rating: 5,
          date: "March 14, 2024",
          review:
            "They did an amazing job with my Persian cat. Very gentle and professional.",
          helpful: 28,
        },
        {
          userName: "James L.",
          rating: 5,
          date: "March 11, 2024",
          review:
            "Best grooming service in Kuwait! My dog looks fantastic every time.",
          helpful: 22,
        },
      ],
    },
    "Pampered Paws": {
      totalReviews: 145,
      ratingDistribution: [75, 45, 15, 7, 3],
      reviews: [
        {
          userName: "Dana K.",
          rating: 5,
          date: "March 13, 2024",
          review:
            "Love how they handle nervous pets. My cat actually enjoys going there now!",
          helpful: 19,
        },
        {
          userName: "Ahmed M.",
          rating: 4,
          date: "March 9, 2024",
          review:
            "Great service but booking can be difficult due to high demand.",
          helpful: 15,
        },
      ],
    },
  };

  // Get the specific service reviews
  const serviceReviews = reviewsDatabase[clinicName] || {
    totalReviews: 0,
    ratingDistribution: [0, 0, 0, 0, 0],
    reviews: [],
  };

  const ReviewCard = ({ review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.userName}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <StarRating rating={review.rating} size={20} style={styles.reviewStars} />
      <Text style={styles.reviewText}>{review.review}</Text>
      <View style={styles.helpfulContainer}>
        <Ionicons name="thumbs-up-outline" size={16} color="#436B9B" />
        <Text style={styles.helpfulText}>
          {review.helpful} found this helpful
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Clinic Info Section */}
      <View style={styles.clinicSection}>
        <View style={[styles.clinicImage, { backgroundColor: "#F0F0F0" }]} />
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinicName}</Text>
          <TouchableOpacity onPress={openMaps} style={styles.locationButton}>
            <Ionicons name="location" size={16} color="#64C5B7" />
            <Text style={styles.clinicAddress}>
              {locationCoordinates[clinicName]?.address || clinicLocation}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rating Overview Section */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingHeader}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingNumber}>{clinicRating}</Text>
            <StarRating rating={parseFloat(clinicRating)} size={24} />
            <Text style={styles.reviewCount}>
              {serviceReviews.totalReviews} reviews
            </Text>
          </View>

          {/* Rating Distribution Bars */}
          <View style={styles.ratingBars}>
            {serviceReviews.ratingDistribution.map((count, index) => (
              <View key={5 - index} style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>{5 - index}</Text>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        width: `${
                          (count / serviceReviews.totalReviews) * 100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.ratingCount}>{count}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsList}>
        {serviceReviews.reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  clinicSection: {
    flexDirection: "row",
    padding: 16,
  },
  clinicImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  clinicInfo: {
    marginLeft: 16,
    flex: 1,
  },
  clinicName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#436B9B",
  },
  clinicAddress: {
    fontSize: 14,
    color: "#64C5B7",
    flex: 1,
    textDecorationLine: "underline",
  },
  ratingSection: {
    padding: 16,
    paddingRight: 24,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingLeft: {
    alignItems: "flex-start",
    width: 100, // Increased slightly
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: "500",
    color: "#436B9B",
    lineHeight: 48,
    marginBottom: -4, // Added to reduce space below the number
  },
  reviewCount: {
    fontSize: 16,
    color: "#436B9B",
    marginTop: 4,
  },
  ratingBars: {
    flex: 1,
    paddingTop: 0, // Reduced from 8 to 0
    marginLeft: 40,
    marginTop: -8, // Added negative margin to move up
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 22, // Slightly reduced from 24
  },
  ratingLabel: {
    width: 20,
    fontSize: 14,
    color: "#436B9B",
    textAlign: "center",
    marginRight: 4,
  },
  barContainer: {
    width: 180,
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    marginLeft: 8,
  },
  bar: {
    height: "100%",
    backgroundColor: "#436B9B",
    borderRadius: 4,
  },
  reviewsList: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  reviewCard: {
    backgroundColor: "#F5F7F9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    height: 120, // Adjust height as needed
    width: "100%",
  },
  reviewStars: {
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#436B9B",
  },
  reviewDate: {
    fontSize: 14,
    color: "#436B9B",
    opacity: 0.7,
  },
  reviewText: {
    fontSize: 14,
    color: "#436B9B",
    lineHeight: 20,
    marginTop: 8,
  },
  helpfulContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  helpfulText: {
    fontSize: 12,
    color: "#436B9B",
    opacity: 0.7,
  },
  ratingCount: {
    fontSize: 14,
    color: "#436B9B",
    marginLeft: 8,
    width: 30,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    padding: 4, // Add some padding for better touch area
  },
});

export default Review;
