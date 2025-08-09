import React, { useCallback, useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { modalStyles } from "../shared/SharedStyles";
import { StyleSheet, View } from "react-native";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";
import { AdnlChgClass } from "../shared/SharedInterface";
import { useFocusEffect } from "@react-navigation/native";

interface DiscountProps {
  visible: boolean;
  totalAmount: number;
  hideModal(): void;
  handleOnSubmit(adnlChg: AdnlChgClass): void;
}

export const initAdnlChg = {
  discount: 0.0,
  extraCharges: 0.0,
  deductions: 0.0,
};

const DiscountModal: React.FC<DiscountProps> = ({
  visible,
  hideModal,
  totalAmount,
  handleOnSubmit,
}) => {
  const [adnlChg, setAdnlChg] = useState<AdnlChgClass>(
    JSON.parse(JSON.stringify(initAdnlChg))
  );
  const [isChip, setChip] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setAdnlChg(JSON.parse(JSON.stringify(initAdnlChg)));
    }, [])
  );

  const onChangeTextHandler = (key: string, value: number) => {
    setAdnlChg({ ...adnlChg, [key]: value });
  };
  const calculateFinalAmt = () => {
    return (
      totalAmount +
        adnlChg.extraCharges -
        adnlChg.deductions -
        adnlChg.discount || 0
    ).toFixed(2);
  };
  const onSubmit = () => {
    const maxAllowedDiscount = totalAmount * 0.2;
    if (adnlChg.discount > maxAllowedDiscount) {
      setChip(true);
      setTimeout(() => setChip(false), 4000);
      return;
    } else {
      handleOnSubmit(adnlChg);
    }
  };
  const handleOnHide = () => {
    setAdnlChg(JSON.parse(JSON.stringify(initAdnlChg)));
    hideModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        // onDismiss={hideModal}
        contentContainerStyle={modalStyles.modalContainer}
      >
        <View style={modalStyles.modalContainerStyle}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>ADD DISCOUNT</Text>
            <IconButton
              icon="close" // You can use other icons like "close-circle"
              size={24}
              onPress={handleOnHide}
              style={modalStyles.closeButton}
            />
          </View>

          <View style={modalStyles.modalContent}>
            {isChip && (
              <Chip icon="information" textStyle={styles.chip}>
                Exceeded Max discount limit of 20%
              </Chip>
            )}

            <TextInput
              label="Discount"
              value={adnlChg?.discount > 0 ? adnlChg?.discount?.toString() : ""}
              onChangeText={(v) =>
                onChangeTextHandler("discount", parseFloat(v) || 0)
              }
              keyboardType="numeric"
              style={modalStyles.input}
            />
            <TextInput
              label="Extra Charges"
              value={
                adnlChg?.extraCharges > 0
                  ? adnlChg?.extraCharges?.toString()
                  : ""
              }
              onChangeText={(v) =>
                onChangeTextHandler("extraCharges", parseFloat(v) || 0)
              }
              keyboardType="numeric"
              style={modalStyles.input}
            />
            {/* <TextInput
              label="Deductions"
              value={adnlChg?.deductions?.toString()}
              onChangeText={(v) =>
                onChangeTextHandler("deductions", parseFloat(v) || 0)
              }
              keyboardType="numeric"
              style={modalStyles.input}
            /> */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total Amount:</Text>
              <Text style={styles.amountValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Final Amount:</Text>
              <Text style={styles.amountValue}>₹{calculateFinalAmt()}</Text>
            </View>
            <Button
              mode="contained"
              style={modalStyles.button}
              onPress={onSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  amountLabel: {
    color: "#4d4d4d",
  },
  amountValue: {
    color: DEFAULT_THEME_COLOR,
    fontWeight: "bold",
  },
  chip: {
    fontSize: 11,
  },
});

export default DiscountModal;
