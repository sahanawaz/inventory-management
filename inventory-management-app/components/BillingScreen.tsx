import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, DataTable, Divider, Text, TextInput } from "react-native-paper";
import { CustBillClass } from "../shared/SharedConstants";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

const initBillObj = {
  custName: "",
  custPhone: "",
  billArr: [
    {
      invInfoId: 0,
      particular: "",
      amt: 0,
      qty: 0
    }
  ]
}

const inventoryItems = [
  { id: 1, sku: 'ELEC-001', qty: 10, unit_cp: 15.99, unit_sp: 29.99 },
  { id: 2, sku: 'CLTH-045', qty: 25, unit_cp: 8.50, unit_sp: 19.99 },
  { id: 3, sku: 'HOME-112', qty: 5, unit_cp: 45.75, unit_sp: 89.99 },
  { id: 4, sku: 'TOOL-208', qty: 8, unit_cp: 22.40, unit_sp: 39.99 },
];

const BillingScreen: React.FC = () => {
  const [total, setTotal] = useState(0);

  const [billObj, setBiillObj] = useState<CustBillClass>(Object.assign({}, initBillObj))
  const onChangeHandler = (key: string, value: any) => {
    setBiillObj({...billObj, [key]: value})
  }

  // Calculate total selling price
  const calculateTotalSP = (qty: number, unit_sp: Double) => {
    return (qty * unit_sp).toFixed(2);
  };

  const calculateFinalSP = () => {
    
  }

  const addItem = () => {
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Customer Name"
        value={billObj.custName.toString()}
        onChangeText={(v) => onChangeHandler("custName", v)}
        style={styles.input}
      />
      <TextInput
        label="Phone No."
        value={billObj.custPhone.toString()}
        onChangeText={(v) => onChangeHandler("custPhone", v)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={addItem}>
        Add Item
      </Button>
      <Divider style={styles.divider} />
      <ScrollView style={styles.tbl_container}>
      <DataTable style={styles.table}>
      <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title textStyle={styles.headerCell}>SKU</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.headerCell}>Qty</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.headerCell}>Unit CP</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.headerCell}>Unit SP</DataTable.Title>
          <DataTable.Title numeric textStyle={styles.headerCell}>Total SP</DataTable.Title>
        </DataTable.Header>
        {inventoryItems.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.dataCell}>{item.sku}</DataTable.Cell>
            <DataTable.Cell numeric style={styles.dataCell}>{item.qty}</DataTable.Cell>
            <DataTable.Cell numeric style={styles.dataCell}>${item.unit_cp.toFixed(2)}</DataTable.Cell>
            <DataTable.Cell numeric style={styles.dataCell}>${item.unit_sp.toFixed(2)}</DataTable.Cell>
            <DataTable.Cell numeric style={styles.dataCell}>
              ${calculateTotalSP(item.qty, item.unit_sp)}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        {/* <DataTable.Pagination
          page={1}
          numberOfPages={1}
          onPageChange={() => {}}
          label="1-4 of 4"
        /> */}
      </DataTable>
      </ScrollView>
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
    textAlign: "right",
    color: "#2e7d32",
  },
  tbl_container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  tbl_out_header: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  divider: {
    marginVertical: 8,
    height: 1,
    backgroundColor: '#6200ee',
  },
  table: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
  },
  headerCell: {
    fontWeight: 'bold' as 'bold',
  },
  dataCell: {
    paddingVertical: 8,
  },
});

export default BillingScreen;
