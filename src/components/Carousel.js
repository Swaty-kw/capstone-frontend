import {
  FlatList,
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import onboardingData from "../../assets/onboardingData";
import CarouselItem from "./CarouselItem";

const Carousel = React.forwardRef((props, ref) => {
  console.log("onboardingData:", onboardingData);

  const data = onboardingData || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("window").width;

  useImperativeHandle(ref, () => ({
    goToSlide: (index) => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
    },
  }));

  const getWelcomeText = (index) => {
    switch (index) {
      case 0:
        return "Welcome to PawPal! Ready to care for your pet like never before?";
      case 1:
        return "Find Trusted Veterinary Care to Keep Your Pet Happy and Healthy";
      case 2:
        return "Ready to open your heart and home? Find Your New Best Friend";
      default:
        return "Find Your New Best Friend";
    }
  };

  const getDotColor = (index, currentIndex) => {
    if (index === currentIndex) {
      switch (currentIndex) {
        case 0:
          return "#F26445";
        case 1:
          return "#6C88BE";
        case 2:
          return "#64C5B7";
        default:
          return "#F26445";
      }
    }
    if (currentIndex === 3) {
      return "rgba(145, 172, 191, 0.3)";
    }
    switch (currentIndex) {
      case 0:
        return "rgba(242, 100, 69, 0.3)";
      case 1:
        return "rgba(108, 136, 190, 0.3)";
      case 2:
        return "rgba(100, 197, 183, 0.3)";
      case 3:
        return "rgba(145, 172, 191, 0.3)";
      default:
        return "rgba(242, 100, 69, 0.3)";
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.carouselWrapper}>
        <Text
          style={[
            styles.welcomeTitle,
            currentIndex === 0 && styles.orangeTitle,
            currentIndex === 1 && styles.blueTitle,
            currentIndex === 2 && { color: "#64C5B7" },
          ]}
        >
          {getWelcomeText(currentIndex)}
        </Text>
        <FlatList
          ref={flatListRef}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={data}
          renderItem={({ item, index }) => (
            <CarouselItem
              item={item}
              index={index}
              onNext={() => {
                try {
                  if (index < data.length - 1) {
                    setCurrentIndex(index + 1);
                    flatListRef.current?.scrollToIndex({
                      index: index + 1,
                      animated: true,
                      viewPosition: 0,
                    });
                  }
                } catch (error) {
                  console.log("Error in onNext:", error);
                }
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />

        <View
          style={{
            flexDirection: "row",
            height: 64,
            position: "absolute",
            bottom: -15, // Changed from 5 to -15 to push them even lower!
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          {data.map((_, i) => {
            return (
              <Animated.View
                style={[
                  {
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: getDotColor(i, currentIndex),
                  },
                ]}
                key={i.toString()}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  carouselWrapper: {
    height: Dimensions.get("window").height * 0.7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -Dimensions.get("window").height * 0.35 + 25 }],
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  flatListContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -55,
    marginBottom: 20,
    paddingHorizontal: 30,
    alignSelf: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    lineHeight: 24,
  },
  orangeTitle: {
    color: "#F26445",
  },
  blueTitle: {
    color: "#6C88BE",
  },
  thirdTitle: {
    color: "#64C5B7",
  },
});

export default Carousel;
