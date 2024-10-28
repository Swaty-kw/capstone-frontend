import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// const PetInfoBigBlock = () => {
//   return (
//     <View style={styles.outerContainer}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.contentContainer}>
//           <Text style={styles.label}>Vaccination for Hussain</Text>
//           <Text style={styles.value}>Zoo care clinic</Text>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };
const PetInfoBigBlock = ({
  color,
  backgroundColor,
  width,
  height,
  vaccinationFor,
  location,
  date,
}) => {
  return (
    <View style={styles.outerContainer}>
      {/* <SafeAreaView style={styles.container}> */}
      {/* <View style={styles.contentContainer}> */}
      <View
        style={{
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          borderRadius: 20,
          padding: 20,
          justifyContent: "space-around",
        }}
      >
        <Text style={{ color: color, fontWeight: "bold", fontSize: 16 }}>
          {String(vaccinationFor)}
        </Text>
        <Text style={{ color: color, fontSize: 14, marginBottom: 5 }}>
          {String(location)}
        </Text>
        <View
          style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}
        >
          <Text style={{ color: color, fontfontSize: 14 }}>{String(date)}</Text>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

// const QuickInfo = ({color, backgroundColor, marginHorizontal, upcomingEvent, date}) => {
//   return (
//     <View style={{backgroundColor:backgroundColor, width:120, height:120 , borderRadius:20, padding:20, justifyContent:'space-around' }}>
//       <Text style={{color:color, fontWeight:"bold", fontSize:15}}>{upcomingEvent}</Text>
//       <Text style={{color:color, fontWeight:'medium', fontSize:13}}>{date}</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  outerContainer: {
    // backgroundColor: "#E6F3F5",
    // backgroundColor: "#cff5fa",
    // backgroundColor: "#bddade",
    // backgroundColor: backgroundColor,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    // marginHorizontal: marginHorizontal,
    marginVertical: 10,
    // marginVertical: marginVertical,
  },
  container: {
    width: "100%",
    // Remove or modify the height to allow content visibility
  },
  contentContainer: {
    justifyContent: "space-around",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    // color: color,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: "#666",
    // color: color,
  },
});

export default PetInfoBigBlock;
