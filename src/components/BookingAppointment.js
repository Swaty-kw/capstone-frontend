import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingAppointment = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Booking an appointment
        </Text>
        <Text></Text> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "green",
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
          >
            {/* Image */}
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              flex: 3,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
              City Pet Clinic
            </Text>
            <Text>Next to the park</Text>
            <Text>
              Shahdara, New Delhi,Shahdara, New
              Delhifkfkfkfkfkfkfkfkfkfkfkfkfkfk
            </Text>
            <Text>Shahdara, New Delhi</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 25 }}>4.3 (4200 reviews) | {"<>"}15 KM</Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "green",
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
        }}
      ></View>
    </View>
  );
};

export default BookingAppointment;
