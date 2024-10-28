import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MedicationStatus = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Current Medication</Text>
        <Text style={styles.value}>No current medication</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#e3cac8",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 150,
  },
  container: {
    width: "100%",
    // Remove or modify the height to allow content visibility
  },
  contentContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: "#666",
  },
});

export default MedicationStatus;
