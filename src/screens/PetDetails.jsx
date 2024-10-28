import { View, Text, ScrollView } from "react-native";
import React from "react";
import PetIdBlock from "../components/PetIdBlock";
import PetInfoBigBlock from "../components/PetInfoBigBlock";
import PetInfoSmallBlock from "../components/PetInfoSmallBlock";
import MedicationStatus from "../components/MedicationStatus";

const PetDetails = () => {
  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <PetIdBlock />
      </View>

      <PetInfoBigBlock
        color={"black"}
        backgroundColor={"#bddade"}
        width={"100%"}
        height={200}
        vaccinationFor={"Vaccination for Hussain"}
        location={"Zoo care clinic"}
        date={"4 Feb 2025"}
      />
      <PetInfoBigBlock
        color={"black"}
        backgroundColor={"#bddade"}
        width={"100%"}
        height={200}
        vaccinationFor={"Beak and nails care"}
        location={"Pet zone"}
        date={"24 Feb 2025"}
      />

      <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
        <PetInfoSmallBlock label={"Gender"} value={"Male"} />
        <PetInfoSmallBlock label={"Age"} value={"16 Months"} />
        <PetInfoSmallBlock label={"Weight"} value={"4 oz"} />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <MedicationStatus />
      </View>
    </ScrollView>
  );
};

// <View style={{flexDirection:'row', gap:5}}>
//               <QuickInfo color={"#64C5B7"} backgroundColor={"orange"} upcomingEvent={"Vaccination:"} date={"4 Feb 2025"}/>
//               <QuickInfo color={"#F26445"} backgroundColor={"orange"} upcomingEvent={"Medication:"} date={"No Medication"}/>
//               <QuickInfo color={"#91ACBF"} backgroundColor={"orange"} upcomingEvent={"Appointment:"} date={"20 Jan 2025"}/>
//             </View>

export default PetDetails;
