import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import StarRating from "../components/StarRating"; // You'll need to create this component
import BottomNavBar from "../components/BottomNavBar"; // You'll need to create this component

const Review = () => {
  const clinicInfo = {
    name: "City Pet Clinic",
    address:
      "next to city centre, Shuwaikh Industrial, infront of Al, Ghazali St",
    rating: 4.2,
    totalReviews: 28,
    ratingDistribution: [5, 4, 3, 2, 1],
  };

  const ReviewCard = () => (
    <View style={styles.reviewCard}>
      <StarRating rating={4} size={20} style={styles.reviewStars} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Clinic Info Section */}
      <View style={styles.clinicSection}>
        {/* Replace the Image component with this */}
        <View style={[styles.clinicImage, { backgroundColor: "#F0F0F0" }]} />
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinicInfo.name}</Text>
          <Text style={styles.clinicAddress}>{clinicInfo.address}</Text>
        </View>
      </View>

      {/* Rating Overview Section */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingHeader}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingNumber}>{clinicInfo.rating}</Text>
            <StarRating rating={clinicInfo.rating} size={24} />
            <Text style={styles.reviewCount}>
              {clinicInfo.totalReviews} reviews
            </Text>
          </View>

          {/* Rating Distribution Bars */}
          <View style={styles.ratingBars}>
            {clinicInfo.ratingDistribution.map((_, index) => (
              <View key={5 - index} style={styles.ratingBar}>
                <Text style={styles.ratingLabel}>{5 - index}</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: "80%" }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsList}>
        {[...Array(6)].map((_, index) => (
          <ReviewCard key={index} />
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar />
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
    color: "#436B9B",
    opacity: 0.8,
    marginTop: 4,
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
});

export default Review;
