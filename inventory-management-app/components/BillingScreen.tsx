import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import {
  AlertModalConfig,
  BillClass,
  CustBillClass,
  RootStackParamList,
} from "../shared/SharedConstants";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import GradientBackground from "../utils/GradientBackground";
import TextField from "../utils/TextField";
import {
  DEFAULT_THEME_COLOR,
  ERR_MSG,
  initlAlertConfig,
} from "../utils/SysConsts";
import AddSkuModal from "./AddSkuModal";
import DiscountModal from "./DiscountModal";
import AlertModal from "../utils/AlertModal";
import { textFieldStyles } from "../shared/SharedStyles";
import { CallApiGet, CallApiPost } from "../utils/ServiceHelper";
import useLoader from "../helper/useLoader";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

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

type BillingScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, "Billing">;
};

const BillingScreen: React.FC<BillingScreenNavigationProp> = ({
  navigation,
}) => {
  const { startAnimation, stopAnimation, Loader } = useLoader();
  const [visible, setVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertModalConfig>(
    JSON.parse(JSON.stringify(initlAlertConfig))
  );
  const [billObj, setBiillObj] = useState<CustBillClass>(
    JSON.parse(JSON.stringify(initCustBillObj))
  );
  const [appliedDiscount, setAppliedDiscount] = useState(
    JSON.parse(JSON.stringify(initDiscountObj))
  );

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      setBiillObj(JSON.parse(JSON.stringify(initCustBillObj)));
      setAppliedDiscount(JSON.parse(JSON.stringify(initDiscountObj)));
    }, [])
  );

  const handleAddSKU = async (argBillObj: BillClass) => {
    startAnimation();
    const respSku = await CallApiGet(`getStockBySku?sku=${argBillObj.sku}`);
    console.log(respSku);
    if (respSku.respCode === 200 && respSku.respData?.length > 0) {
      let copyBillArr = [...billObj.billArr];
      let data = respSku.respData[0];
      let itemIndex = copyBillArr.findIndex(
        (prdt) => prdt.sku === argBillObj.sku
      );
      if (itemIndex > -1) {
        copyBillArr[itemIndex].qty =
          +copyBillArr[itemIndex].qty + +argBillObj.qty;
      } else {
        data.qty = argBillObj.qty;
        copyBillArr.push(data);
      }
      setBiillObj({ ...billObj, billArr: [...copyBillArr] });
    } else {
      openAlert([ERR_MSG.E500], -1, "");
    }
    stopAnimation();
  };

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
  const calculateTotalSP = (qty: number, unitSp: Double) => {
    return (qty * unitSp).toFixed(2);
  };

  const calculateFinalSP = (argBill = billObj.billArr) => {
    return argBill
      .reduce((acc, curr) => acc + curr.qty * curr.unitSp, 0)
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

  const openAlert = (
    argMsg: string[],
    argIsSuc: -1 | 0 | 1,
    argIconSrc: string
  ) => {
    setAlertConfig({
      visible: true,
      message: argMsg,
      isSuccess: argIsSuc,
      iconSrc: argIconSrc,
    });
  };

  const closeAlert = () => {
    setAlertConfig({
      visible: false,
      message: [],
      isSuccess: 1,
      iconSrc: "",
    });
  };

  const isDataValid = () => {
    let errArr = [];
    if ([null, undefined, ""].includes(billObj.customer.name)) {
      errArr.push("Please add customer name");
    }
    if ([null, undefined, ""].includes(billObj.customer.phone)) {
      errArr.push("Please add customer phone");
    }
    if (billObj.billArr.length <= 0) {
      errArr.push("Please add an item");
    }

    if (errArr.length > 0) {
      openAlert(errArr, -1, "");
      return false;
    } else {
      return true;
    }
  };

  const processBill = async () => {
    if (isDataValid()) {
      billObj.discount = appliedDiscount.discount;
      startAnimation();
      const saveResp = await CallApiPost("createBill", billObj);
      if (saveResp.respCode === 200) {
        openAlert(["Thank You, Your bill has been processed."], 0, "");
      } else {
        openAlert(
          [
            "Sorry, we are not able process your bill at this moment due to some technical glitch.",
          ],
          -1,
          ""
        );
      }
      stopAnimation();
    }
  };

  return (
    <GradientBackground style={styles.container}>
      {Loader}
      <TextField
        label={
          <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
            Customer Name *
          </Text>
        }
        value={billObj?.customer?.name?.toString()}
        onChangeHandler={(v: any) => onChangeHandler("customer", "name", v)}
      />

      <TextField
        label={
          <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
            Phone No. *
          </Text>
        }
        value={billObj?.customer?.phone?.toString()}
        onChangeHandler={(v: any) => onChangeHandler("customer", "phone", v)}
        keyboardType="phone-pad"
      />

      {/* Products Section */}
      <View style={styles.sectionHeader}>
        <Text style={textFieldStyles.sectionTitle} variant="titleLarge">
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
                <Text style={styles.valueText}>₹{product.unitSp}</Text>
                <Text style={styles.valueText}>
                  ₹{calculateTotalSP(product.qty, product.unitSp)}
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
      <AlertModal
        config={alertConfig}
        onDismiss={closeAlert}
        onOk={() => navigation.navigate("Ledger")}
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

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  addButton: {
    backgroundColor: DEFAULT_THEME_COLOR,
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
    backgroundColor: DEFAULT_THEME_COLOR,
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
    color: DEFAULT_THEME_COLOR,
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
    color: DEFAULT_THEME_COLOR,
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
    color: DEFAULT_THEME_COLOR,
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
    borderColor: DEFAULT_THEME_COLOR,
    height: 40,
    justifyContent: "center",
  },
  discountButtonLabel: {
    color: DEFAULT_THEME_COLOR,
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
    color: DEFAULT_THEME_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
  validationText: {
    color: "#ff5252",
    fontSize: 12,
    marginLeft: 4,
  },
});

export default BillingScreen;
