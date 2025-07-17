import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const BillingScreen: React.FC = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const addItem = () => {
    const itemPrice = parseFloat(price);
    if (!isNaN(itemPrice)) {
      setTotal(total + itemPrice);
      setItem("");
      setPrice("");
    }
  };
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Billing Counter</Text>
      <TextInput
        label="Item Name"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={addItem}>
        Add Item
      </Button>
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
  },
});

export default BillingScreen;
