import React, { useState } from "react";
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

interface DiscountProps {
  visible: boolean;
  totalAmount: number;
  hideModal(): void;
  handleOnSubmit(discount: number): void;
}

const DiscountModal: React.FC<DiscountProps> = ({
  visible,
  hideModal,
  totalAmount,
  handleOnSubmit,
}) => {
  const [discount, setDiscount] = useState<number>(0.0);
  const [isChip, setChip] = useState<boolean>(false);

  const onChangeTextHandler = (value: number) => {
    setDiscount(value);
  };
  const onSubmit = () => {
    const maxAllowedDiscount = totalAmount * 0.2;
    if (discount > maxAllowedDiscount) {
      setChip(true);
      setTimeout(() => setChip(false), 4000);
      return;
    } else {
      handleOnSubmit(discount);
    }
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
              onPress={hideModal}
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
              value={discount?.toString()}
              onChangeText={(v) => onChangeTextHandler(parseFloat(v) || 0)}
              keyboardType="numeric"
              style={modalStyles.input}
            />
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total Amount:</Text>
              <Text style={styles.amountValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>After Discount:</Text>
              <Text style={styles.amountValue}>
                ₹{(totalAmount - discount || 0).toFixed(2)}
              </Text>
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
    color: "#d4af37",
    fontWeight: "bold",
  },
  chip: {
    fontSize: 12,
  },
});

export default DiscountModal;
