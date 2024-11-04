import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CarouselItem = ({ item, onComplete, onNext, index }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const handleVideoFinish = (status) => {
    if (status.didJustFinish) {
      onComplete?.();
    }
  };

  const getButtonStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#F26445" };
      case 1:
        return { backgroundColor: "#6C88BE" };
      case 2:
        return { backgroundColor: "#64C5B7" };
      default:
        return { backgroundColor: "#F26445" };
    }
  };

  const getDescriptionStyle = (index) => {
    switch (index) {
      case 0:
        return styles.descriptionFirst;
      case 1:
        return styles.descriptionSecond;
      case 2:
        return styles.descriptionThird;
      default:
        return styles.description;
    }
  };

  const getTitleStyle = (index) => {
    switch (index) {
      case 0:
        return styles.titleFirst;
      case 1:
        return styles.titleSecond;
      case 2:
        return { color: "#64C5B7" };
      default:
        return styles.title;
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
    switch (currentIndex) {
      case 2:
        return "rgba(100, 197, 183, 0.3)";
    }
  };

  const handleButtonPress = () => {
    if (index === 2) {
      navigation.navigate("Register");
    } else {
      onNext();
    }
  };

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.videoContainer}>
        <Video
          source={item.video}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
          isLooping={false}
          shouldPlay
          backgroundColor="transparent"
          onPlaybackStatusUpdate={handleVideoFinish}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, getTitleStyle(index)]}>{item.title}</Text>
        <Text style={[styles.description, getDescriptionStyle(index)]}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={[styles.nextButton, getButtonStyle(index)]}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>
            {index === 2 ? "Let's go!" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  videoContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 20,
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  titleFirst: {
    color: "#F26445",
  },
  titleSecond: {
    color: "#6C88BE",
  },
  titleThird: {
    color: "#64C5B7",
  },
  titleFourth: {
    color: "#91ACBF",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: "auto",
    paddingHorizontal: 10,
  },
  descriptionFirst: {
    color: "#F26445",
  },
  descriptionSecond: {
    color: "#6C88BE",
  },
  descriptionThird: {
    color: "#64C5B7",
  },
  descriptionFourth: {
    color: "#91ACBF",
  },
  nextButton: {
    backgroundColor: "#F26445",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "60%",
    marginTop: "auto",
    alignSelf: "center",
    position: "relative",
    zIndex: 1,
  },
  secondButton: {
    backgroundColor: "#6C88BE",
  },
  thirdButton: {
    backgroundColor: "#64C5B7",
  },
  fourthButton: {
    backgroundColor: "#91ACBF",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16.5,
    fontWeight: "600",
  },
});

export default CarouselItem;
