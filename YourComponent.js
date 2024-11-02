import onboardingData from "../assets/onboardingData.json";
console.log("onboardingData:", onboardingData);

const videoMapping = {
  video1: require("../assets/video1.mp4"),
  // Add more video mappings as needed
};

// Make sure onboardingData is an array before mapping
const mappedData = Array.isArray(onboardingData)
  ? onboardingData.map((item) => ({
      ...item,
      video: videoMapping[item.videoPath],
    }))
  : [];
