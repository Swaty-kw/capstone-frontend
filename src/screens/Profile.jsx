import { View, Text } from "react-native";
import React from "react";
import PetInfoSmallBlock from "../components/PetInfoSmallBlock";
import PetIdBlock from "../components/PetIdBlock";
import { SafeAreaView } from "react-native-safe-area-context";
import PetInfoBigBlock from "../components/PetInfoBigBlock";

const Profile = () => {
  return (
    <SafeAreaView style={{backgroundColor:111,height:"100%",}}>
      
      <View style={{}}>
        <PetIdBlock/>
        <View style={{alignItems: "flex-start",margin:10,gap:20}}>
        <PetInfoSmallBlock/>
        <PetInfoSmallBlock/>
        <PetInfoSmallBlock/>
        <PetInfoBigBlock/>
          <View/>

        

        </View>
        
        
        

      </View>
    </SafeAreaView>
  );
};

export default Profile;
