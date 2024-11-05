import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import StarRating from "../components/StarRating";
import BottomNavBar from "../components/BottomNavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BASE_URL } from "../api/index";
import { GOOGLE_PLACES_API_KEY } from "../api/config";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const Review = ({ route }) => {
  const { clinicName, clinicLocation, clinicRating, coordinates, clinicImage } =
    route.params;
  const [googleReviews, setGoogleReviews] = useState(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchGoogleReviews();
  }, [clinicName, clinicLocation]);

  const fetchGoogleReviews = async () => {
    try {
      const searchQuery = `${clinicName} ${clinicLocation} Kuwait`;
      console.log("Search Query:", searchQuery);

      const searchResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          searchQuery
        )}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const searchData = await searchResponse.json();
      console.log("Search API Response:", searchData);

      if (searchData.results && searchData.results[0]) {
        const placeId = searchData.results[0].place_id;
        console.log("Place ID:", placeId);

        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,opening_hours,formatted_phone_number,website,business_status&key=${GOOGLE_PLACES_API_KEY}`
        );
        const detailsData = await detailsResponse.json();
        console.log("Details API Response:", detailsData);

        if (detailsData.result) {
          setGoogleReviews(detailsData.result);
          setAllReviews(detailsData.result.reviews || []);
          setBusinessInfo(detailsData.result);
        }
      }
    } catch (error) {
      console.error("Error fetching Google reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const openMaps = () => {
    // Create search query with clinic name and Kuwait
    const searchQuery = encodeURIComponent(
      `${clinicName} veterinary clinic Kuwait`
    );

    // Use Google Maps search URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

    Linking.openURL(mapsUrl).catch((err) => {
      console.error("Error opening Google Maps:", err);

      // Fallback to address search if the name search fails
      const addressUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        clinicLocation + " Kuwait"
      )}`;
      Linking.openURL(addressUrl).catch((err) =>
        console.error("Error opening fallback maps:", err)
      );
    });
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

  // Combine local and Google reviews
  const combinedReviews = {
    ...reviewsDatabase[clinicName],
    googleReviews: googleReviews
      ? {
          rating: googleReviews.rating,
          totalReviews: googleReviews.user_ratings_total,
          reviews: googleReviews.reviews,
        }
      : null,
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

  // Calculate total reviews (combine Google and local reviews)
  const totalReviews =
    (googleReviews?.user_ratings_total || 0) +
    (reviewsDatabase[clinicName]?.totalReviews || 0);

  // Use Google rating if available, otherwise fallback to local rating
  const overallRating = googleReviews?.rating || clinicRating || 0;

  // Calculate rating distribution from Google reviews
  const calculateRatingDistribution = () => {
    if (!googleReviews?.reviews) return [0, 0, 0, 0, 0];

    // Initialize distribution array for 5 to 1 stars
    const distribution = [0, 0, 0, 0, 0];

    // Count each rating
    googleReviews.reviews.forEach((review) => {
      const rating = Math.floor(review.rating);
      if (rating >= 1 && rating <= 5) {
        distribution[5 - rating]++;
      }
    });

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();

  // Function to load more reviews
  const loadMoreReviews = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      // You would need to implement pagination here
      // Unfortunately, Google Places API has limitations on the number of reviews
      // you can fetch. You might want to show a message to users about this.
      setLoadingMore(false);
    } catch (error) {
      console.error("Error loading more reviews:", error);
      setLoadingMore(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refetch your data here
    fetchGoogleReviews().then(() => {
      setRefreshing(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color="#64C5B7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#91ACBF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Clinic Info Section */}
      <View style={styles.clinicSection}>
        <View style={styles.clinicImageContainer}>
          {clinicImage ? (
            <Image
              source={{
                uri: `${BASE_URL}/${clinicImage.replace(/\\/g, "/")}`,
              }}
              style={styles.clinicImage}
              resizeMode="cover"
              onError={(e) => console.log("Image Error:", e.nativeEvent.error)}
            />
          ) : (
            <View
              style={[styles.clinicImage, { backgroundColor: "#F0F0F0" }]}
            />
          )}
        </View>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinicName}</Text>
          <TouchableOpacity onPress={openMaps} style={styles.locationButton}>
            <Ionicons name="location" size={16} color="#64C5B7" />
            <Text style={styles.clinicAddress}>{clinicLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingAndInfoContainer}>
        {/* Left side - Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingNumber}>
            {googleReviews?.rating?.toFixed(1) || "0.0"}
          </Text>
          <StarRating rating={googleReviews?.rating || 0} />
          <Text style={styles.totalReviews}>
            {googleReviews?.user_ratings_total || 0} reviews
          </Text>
        </View>

        {/* Right side - Business Info */}
        <View style={styles.businessInfoSection}>
          <View style={styles.businessStatusContainer}>
            <Ionicons
              name={
                googleReviews?.opening_hours?.open_now
                  ? "checkmark-circle"
                  : "time"
              }
              size={20}
              color="#64C5B7"
            />
            <Text style={styles.businessStatusText}>
              {googleReviews?.opening_hours?.open_now ? "Open Now" : "Closed"}
            </Text>
          </View>

          {googleReviews?.formatted_phone_number && (
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() =>
                Linking.openURL(`tel:${googleReviews.formatted_phone_number}`)
              }
            >
              <Ionicons name="call" size={16} color="#64C5B7" />
              <Text style={styles.infoText}>
                {googleReviews.formatted_phone_number}
              </Text>
            </TouchableOpacity>
          )}

          {googleReviews?.website && (
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => Linking.openURL(googleReviews.website)}
            >
              <Ionicons name="globe" size={16} color="#64C5B7" />
              <Text style={styles.infoText}>Visit Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Reviews List - Combined local and Google reviews */}
      <ScrollView
        style={styles.reviewsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#64C5B7"]} // Android
            tintColor="#64C5B7" // iOS
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;

          if (isCloseToBottom && !loadingMore) {
            loadMoreReviews();
          }
        }}
        scrollEventThrottle={400}
      >
        {googleReviews?.reviews?.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                {review.profile_photo_url && (
                  <Image
                    source={{ uri: review.profile_photo_url }}
                    style={styles.reviewerPhoto}
                  />
                )}
                <Text style={styles.reviewerName}>{review.author_name}</Text>
              </View>
              <Text style={styles.reviewDate}>
                {new Date(review.time * 1000).toLocaleDateString()}
              </Text>
            </View>
            <StarRating
              rating={review.rating}
              size={20}
              style={styles.reviewStars}
            />
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}

        {/* Add a note about review limitations */}
        <View style={styles.reviewNote}>
          <Text style={styles.reviewNoteText}>
            Showing {googleReviews?.reviews?.length || 0} of{" "}
            {googleReviews?.user_ratings_total || 0} reviews
          </Text>
          <Text style={styles.reviewNoteSubtext}>
            Due to Google Places API limitations, only the most relevant reviews
            are shown. Visit Google Maps to see all reviews.
          </Text>

          {/* Add a button to view all reviews on Google Maps */}
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                clinicName + " " + clinicLocation
              )}`;
              Linking.openURL(url);
            }}
          >
            <Text style={styles.viewAllButtonText}>
              View All Reviews on Google Maps
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 100,
  },
  clinicSection: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  clinicImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden", // This ensures the image respects the border radius
  },
  clinicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  clinicInfo: {
    marginLeft: 16,
    flex: 1,
  },
  clinicName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#64C5B7",
  },
  clinicAddress: {
    fontSize: 14,
    color: "#B4C5D9",
    flex: 1,
    textDecorationLine: "underline",
  },
  ratingAndInfoContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E8EEF1",
    paddingRight: 16,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: "600",
    color: "#436B9B",
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: "#91ACBF",
    marginTop: 8,
  },
  businessInfoSection: {
    flex: 2,
    paddingLeft: 16,
    justifyContent: "center",
    gap: 12,
  },
  businessStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  businessStatusText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#436B9B",
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 12,
    color: "#436B9B",
    fontSize: 14,
  },
  hoursContainer: {
    marginTop: 12,
  },
  hoursTitle: {
    fontSize: 16,
    color: "#436B9B",
    fontWeight: "500",
    marginBottom: 8,
  },
  hoursText: {
    color: "#91ACBF",
    fontSize: 14,
    marginVertical: 2,
  },
  reviewsList: {
    padding: 16,
    paddingBottom: 0,
    marginBottom: 0, // Remove any margin
  },
  reviewCard: {
    backgroundColor: "#F7F9FC",
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    marginBottom: 16, // Add space between cards
  },
  reviewStars: {
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewerName: {
    color: "#64C5B7",
    fontSize: 16,
    flex: 1, // Take available space
  },
  reviewDate: {
    color: "#91ACBF",
    fontSize: 14,
  },
  reviewText: {
    color: "#436B9B",
    fontSize: 14,
    lineHeight: 20, // Better text readability
    marginTop: 8,
    // Ensure text stays within card bounds
    flexWrap: "wrap",
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
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    padding: 4, // Add some padding for better touch area
  },
  googleIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Take available space
  },
  overallStars: {
    marginTop: 8,
    marginBottom: 4,
  },
  reviewStars: {
    marginVertical: 8,
  },
  reviewerPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  reviewNote: {
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  reviewNoteText: {
    fontSize: 14,
    color: "#436B9B",
    textAlign: "center",
  },
  reviewNoteSubtext: {
    fontSize: 12,
    color: "#91ACBF",
    textAlign: "center",
    marginTop: 4,
  },
  viewAllButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#64C5B7",
    borderRadius: 8,
  },
  viewAllButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  barContainer: {
    flex: 1,
    height: 8, // Make bars thinner
    backgroundColor: "#F0F4F8", // Very light gray for empty bar
    borderRadius: 4, // Rounded corners
    marginHorizontal: 8,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#9CCEC3", // Lighter mint green
    borderRadius: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#9CCEC3",
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8, // Add elevation for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  businessInfoContainer: {
    backgroundColor: "#F7F9FC",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  businessStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  businessStatusText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#436B9B",
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  infoText: {
    marginLeft: 12,
    color: "#436B9B",
    fontSize: 14,
  },
  hoursContainer: {
    marginTop: 12,
  },
  hoursTitle: {
    fontSize: 16,
    color: "#436B9B",
    fontWeight: "500",
    marginBottom: 8,
  },
  hoursText: {
    color: "#91ACBF",
    fontSize: 14,
    marginVertical: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 12,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
    borderWidth: 2,
    borderColor: "#64C5B7",
    borderRadius: 8,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#64C5B7",
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    color: "#64C5B7",
    fontSize: 14,
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "#91ACBF",
    fontWeight: "500",
  },
});

export default Review;
