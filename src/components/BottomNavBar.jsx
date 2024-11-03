import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BottomNavBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Icon name="home" size={24} color="#436B9B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="calendar-today" size={24} color="#436B9B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="person" size={24} color="#436B9B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#E8F1F1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default BottomNavBar;
