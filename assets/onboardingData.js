import React from "react";
import { StyleSheet } from "react-native";
import { Asset } from "expo-asset";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 200,
  },
});

export const onboardingData = [
  {
    id: "1",
    title: "Pamper Your Pet",
    description: "Grooming made easy – because every pet deserves a spa day!",
    video: require("../assets/videos/V1.mp4"),
    shouldPlay: false,
    isLooping: false,
    style: {
      title: {
        color: "#F26445",
      },
      description: {
        color: "#F26445",
      },
    },
  },
  {
    id: "2",
    title: "Expert Vet Care",
    description:
      "Easily connect with trusted veterinarians nearby, offering expert care to keep your pet happy, healthy, and well-cared for.",
    video: require("../assets/videos/V2.mp4"),
    shouldPlay: false,
    isLooping: false,
    style: {
      title: {
        color: "#6C88BE",
      },
      description: {
        color: "#6C88BE",
      },
    },
  },
  // {
  //   id: "3",
  //   title: "third slide",
  //   description: "Your description here",
  //   video: require("../assets/videos/V3.mp4"),
  //   style: {
  //     title: {
  //       color: "#64C5B7",
  //     },
  //     description: {
  //       color: "#64C5B7",
  //     },
  //   },
  // },
  {
    id: "4",
    title: "Adopt, Love, and Make a Difference",
    description:
      "Register to explore adoption options and start the journey of finding a forever friend.",
    video: require("../assets/videos/HELP.mp4"),
    shouldPlay: false,
    isLooping: false,
    style: {
      title: {
        color: "#64C5B7",
      },
      description: {
        color: "#64C5B7",
      },
      button: {
        backgroundColor: "#64C5B7",
      },
    },
  },
];

export default onboardingData;
