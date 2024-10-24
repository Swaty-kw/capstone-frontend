import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const PetInfoBigBlock = () => {
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Vaccination for Hussain</Text>
          <Text style={styles.value}>Zoo care clinic</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#E6F3F5',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
 
  },
  container: {
    width: '100%',
    height: "30%",
  },
  contentContainer: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
});

export default PetInfoBigBlock;
