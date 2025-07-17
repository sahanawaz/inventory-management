import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const InventoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Inventory Management</Text>
      <Text variant="bodyLarge">Feature coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default InventoryScreen;
