import { View, Text, StyleSheet } from "react-native";
import React, { useRef } from "react";
import Carousel from "../components/Carousel";

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default OnBoarding;
