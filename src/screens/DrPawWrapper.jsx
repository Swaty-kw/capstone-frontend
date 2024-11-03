import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AiVet from "./AiVet";

const DrPawWrapper = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  // Show modal when this screen becomes focused
  React.useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
    // Navigate back to previous screen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <AiVet visible={isModalVisible} onClose={handleClose} />
    </View>
  );
};

export default DrPawWrapper;
