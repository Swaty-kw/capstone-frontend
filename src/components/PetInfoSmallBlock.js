import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// passtheprops here 
const PetInfoSmallBlock = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>Male</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#91ACBF",
    borderRadius: 20,
    padding: 10,
    width: '45%',
    
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default PetInfoSmallBlock;
