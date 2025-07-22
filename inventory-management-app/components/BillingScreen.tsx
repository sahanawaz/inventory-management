import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import { BillClass, CustBillClass } from "../shared/SharedConstants";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { inventoryItems } from "../utils/SysData";
import GradientBackground from "../utils/GradientBackground";
import TextField from "./TextField";
import { initBillObj } from "../utils/SysConsts";
import AddSkuModal from "./AddSkuModal";
import DiscountModal from "./DiscountModal";

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
  billArr: [],
};

const initDiscountObj = {
  visible: false,
  discount: 0,
};

const BillingScreen: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(
    Object.assign({}, initDiscountObj)
  );

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
  };
  const handleAddSKU = (argBillObj: BillClass) => {
    let copyBillArr = [...billObj.billArr];
    argBillObj.invInfoId = copyBillArr.length + 1;
    copyBillArr.push(argBillObj);
    setBiillObj({ ...billObj, billArr: [...copyBillArr] });
  };

  const [billObj, setBiillObj] = useState<CustBillClass>(
    Object.assign({}, initCustBillObj)
  );

  const onChangeHandler = (pkey: string, skey: string, value: any) => {
    if (!!pkey && !!skey) {
      let copyBillObj = { ...billObj };
      copyBillObj[pkey][skey] = value;
      setBiillObj(copyBillObj);
    } else if ([null, undefined, ""].includes(skey) && !!pkey) {
      setBiillObj({ ...billObj, [pkey]: value });
    }
  };

  // Calculate total selling price
  const calculateTotalSP = (qty: number, unit_sp: Double) => {
    return (qty * unit_sp).toFixed(2);
  };

  const calculateFinalSP = (argBill = billObj.billArr) => {
    return argBill
      .reduce((acc, curr) => acc + curr.qty * curr.unit_sp, 0)
      .toFixed(2);
  };

  const onDelete = (id: number) => {
    let copyBillArr = [...billObj.billArr];
    copyBillArr = copyBillArr.filter((item) => item.invInfoId !== id);
    setBiillObj({ ...billObj, billArr: [...copyBillArr] });
    console.log(Number(calculateFinalSP()));
    if (Number(calculateFinalSP(copyBillArr)) <= 0.0) {
      setAppliedDiscount({ ...appliedDiscount, discount: 0 });
    }
  };

  const handleDiscount = (argDiscount: number) => {
    setAppliedDiscount({
      visible: false,
      discount: argDiscount,
    });
  };

  const processBill = () => {
    billObj.discount = appliedDiscount.discount;
    console.log(billObj);
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
            <Card.Content>
              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>
                  {product?.sku}
                </Text>
                <Text
                  style={styles.value}
                  onPress={() => onDelete(product.invInfoId)}
                >
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

      <AddSkuModal
        visible={visible}
        hideModal={hideModal}
        handleAddSKU={handleAddSKU}
      />
      <DiscountModal
        visible={appliedDiscount.visible}
        totalAmount={Number(calculateFinalSP())}
        hideModal={() =>
          setAppliedDiscount({ ...appliedDiscount, visible: false })
        }
        handleOnSubmit={handleDiscount}
      />

      {/* Combined Discount Button and Totals Row */}
      <View style={styles.discountTotalRow}>
        <View style={styles.totalContainer}>
          {appliedDiscount.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>₹{calculateFinalSP()}</Text>
            </View>
          )}
          {appliedDiscount.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount:</Text>
              <Text style={styles.discountText}>
                - ₹{appliedDiscount.discount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>
              ₹
              {(Number(calculateFinalSP()) - appliedDiscount.discount).toFixed(
                2
              )}
            </Text>
          </View>
        </View>
        <Button
          mode="outlined"
          style={styles.discountButton}
          labelStyle={styles.discountButtonLabel}
          onPress={() =>
            setAppliedDiscount({ ...appliedDiscount, visible: true })
          }
        >
          {appliedDiscount.discount > 0 ? "Change Discount" : "Add Discount"}
        </Button>
      </View>

      <Button
        mode="contained"
        style={styles.checkoutButton}
        labelStyle={styles.buttonLabel}
        onPress={processBill}
      >
        Process Bill
      </Button>

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

  addButton: {
    backgroundColor: "#d4af37",
    borderRadius: 4,
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
  // totalContainer: {
  //   marginTop: 10,
  //   alignItems: "flex-end",
  //   paddingRight: 8,
  // },
  // totalText: {
  //   color: "#ffffff",
  //   fontWeight: "bold",
  // },
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

  discountTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalContainer: {
    flex: 1,
    marginRight: 12,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountButton: {
    borderColor: "#d4af37",
    height: 40,
    justifyContent: "center",
  },
  discountButtonLabel: {
    color: "#d4af37",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  totalValue: {
    color: "#ffffff",
    fontSize: 14,
  },
  discountText: {
    color: "#e74c3c",
    fontSize: 14,
  },
  grandTotalLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  grandTotalValue: {
    color: "#d4af37",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BillingScreen;
