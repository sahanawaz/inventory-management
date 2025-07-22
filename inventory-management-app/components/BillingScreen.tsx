import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { CustBillClass, SkuClass } from "../shared/SharedConstants";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { inventoryItems } from "../utils/SysData";
import GradientBackground from "../utils/GradientBackground";
import TextField from "./TextField";

const initBillObj = {
  invInfoId: 0,
  sku: "",
  particular: "",
  amt: 0,
  qty: 0,
  unit_cp: 0.0,
  unit_sp: 0.0,
};

const initCustBillObj = {
  customer: {
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    postcode: "",
  },
  billArr: [...inventoryItems],
};

const initSkuObj = {
  sku: "",
  qty: 0,
};

const BillingScreen: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSkuObj(Object.assign({}, initSkuObj));
  };

  const [billObj, setBiillObj] = useState<CustBillClass>(
    Object.assign({}, initCustBillObj)
  );
  const [skuObj, setSkuObj] = useState<SkuClass>(Object.assign({}, initSkuObj));

  const onChangeHandler = (pkey: string, skey: string, value: any) => {
    if (!!pkey && !!skey) {
      let copyBillObj = { ...billObj };
      copyBillObj[pkey][skey] = value;
      setBiillObj(copyBillObj);
    } else if ([null, undefined, ""].includes(skey) && !!pkey) {
      setBiillObj({ ...billObj, [pkey]: value });
    }
  };

  const onChangeTextHandler = (key: string, text: any) => {
    setSkuObj({ ...skuObj, [key]: text });
  };

  // Calculate total selling price
  const calculateTotalSP = (qty: number, unit_sp: Double) => {
    return (qty * unit_sp).toFixed(2);
  };

  const calculateFinalSP = () => {
    return inventoryItems
      .reduce((acc, curr) => acc + curr.qty * curr.unit_sp, 0)
      .toFixed(2);
  };

  const handleAddSKU = () => {
    let newBillObj = { ...initBillObj };
    newBillObj.sku = skuObj.sku;
    newBillObj.qty = skuObj.qty;
    newBillObj.unit_cp = 10.98;
    newBillObj.unit_sp = 12.98;
    let copyBillArr = [...billObj.billArr];
    newBillObj.invInfoId = copyBillArr.length + 1;
    copyBillArr.push(newBillObj);
    console.log("copyBillArr===", copyBillArr);
    setBiillObj({ ...billObj, billArr: [...copyBillArr] });
    hideModal();
  };

  const onDelete = (id: number) => {
    let copyBillArr = [...billObj.billArr];
    copyBillArr = copyBillArr.filter((item) => item.invInfoId !== id);
    setBiillObj({ ...billObj, billArr: [...copyBillArr] });
  };
  return (
    <GradientBackground style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      <TextField
        label={
          <Text style={styles.sectionTitle} variant="titleMedium">
            Customer Name
          </Text>
        }
        value={billObj?.customer?.name?.toString()}
        onChangeHandler={(v: any) => onChangeHandler("customer", "name", v)}
      />
      <TextField
        label={
          <Text style={styles.sectionTitle} variant="titleMedium">
            Phone No.
          </Text>
        }
        value={billObj?.customer?.phone?.toString()}
        onChangeHandler={(v: any) => onChangeHandler("customer", "phone", v)}
        keyboardType="phone-pad"
      />

      {/* Products Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} variant="titleLarge">
          Products
        </Text>
        <Button
          mode="contained"
          onPress={showModal}
          style={styles.addButton}
          labelStyle={styles.buttonLabel}
        >
          Add Item
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {billObj.billArr.map((product) => (
          <Card key={product.invInfoId} style={styles.card}>
            {/* Card Header */}
            {/* <Card.Title
              title={product.sku}
              titleStyle={styles.skuText}
              right={() => (
                <IconButton
                  icon="close"
                  iconColor="#e74c3c"
                  size={20}
                  onPress={() => onDelete(product.id)}
                />
              )}
              style={styles.cardHeader}
            /> */}
            <Card.Content>
              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>
                  {product?.sku}
                </Text>
                <Text style={styles.value} onPress={() => onDelete(product.id)}>
                  <Icon source="close" color="#e74c3c" size={20} />
                </Text>
              </View>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Qty</Text>
                <Text style={styles.headerText}>SP</Text>
                <Text style={styles.headerText}>Total</Text>
              </View>
              {/* Values Row */}
              <View style={styles.valuesRow}>
                <Text style={styles.valueText}>{product.qty}</Text>
                <Text style={styles.valueText}>₹{product.unit_sp}</Text>
                <Text style={styles.valueText}>
                  ₹{calculateTotalSP(product.qty, product.unit_sp)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Total Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText} variant="titleLarge">
          Total: ₹{calculateFinalSP()}
        </Text>
      </View>

      <Button
        mode="contained"
        style={styles.checkoutButton}
        labelStyle={styles.buttonLabel}
      >
        Process Bill
      </Button>

      <Portal>
        <Modal
          visible={visible}
          // onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ADD SKU</Text>
              <IconButton
                icon="close" // You can use other icons like "close-circle"
                size={24}
                onPress={hideModal}
                style={styles.closeButton}
              />
            </View>

            <View style={styles.modalContent}>
              <TextInput
                label="SKU"
                value={billObj?.sku?.toString()}
                onChangeText={(v) => onChangeTextHandler("sku", v)}
                style={styles.input}
              />
              <TextInput
                label="Quantity"
                value={billObj?.qty?.toString()}
                onChangeText={(v) => onChangeTextHandler("qty", v)}
                keyboardType="numeric"
                style={styles.input}
              />
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleAddSKU}
              >
                Submit
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      {/* </ScrollView> */}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#2e7d32",
  },

  modalContainerStyle: {
    backgroundColor: "white",
    padding: 10,
    margin: 30,
    borderRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalContent: {
    paddingRight: 24, // To prevent content overlapping with the close button
  },

  closeButton: {
    margin: 0,
    padding: 0,
  },
  button: {
    marginHorizontal: 50,
    padding: 0,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: "#d4af37",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  addButton: {
    backgroundColor: "#d4af37",
    borderRadius: 4,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    color: "#d4af37",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  totalContainer: {
    marginTop: 10,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  totalText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 5,
    backgroundColor: "#d4af37",
  },
  buttonLabel: {
    color: "#000000",
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  cardHeader: {
    padding: 0,
    marginTop: 5,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  skuText: {
    margin: 0,
    padding: 0,
    color: "#d4af37",
    fontWeight: "bold",
    fontSize: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.3)",
  },
  headerText: {
    flex: 1,
    color: "#d4af37",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  valuesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    flex: 1,
    color: "#f2f2f2",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    // fontSize: 14,
    color: "#d4af37",
  },
  value: {
    fontSize: 14,
    color: "#ffffff",
  },
});

export default BillingScreen;
