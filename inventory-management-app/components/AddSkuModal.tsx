import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { initBillObj } from "../utils/SysConsts";
import { BillClass, SkuClass } from "../shared/SharedConstants";
import { modalStyles } from "../shared/SharedStyles";

interface SkuProps {
  visible: boolean;
  hideModal(): void;
  handleAddSKU(argBillObj: BillClass): void;
}

const initSkuObj = {
  sku: "",
  qty: 0,
};

const AddSkuModal: React.FC<SkuProps> = ({
  visible,
  handleAddSKU,
  hideModal,
}) => {
  const [skuObj, setSkuObj] = useState<SkuClass>(
    Object.assign({}, { ...initSkuObj })
  );

  const onChangeTextHandler = (key: string, text: any) => {
    setSkuObj({ ...skuObj, [key]: text });
  };

  const onAddSKU = () => {
    let newBillObj = { ...initBillObj };
    newBillObj.sku = skuObj.sku;
    newBillObj.qty = skuObj.qty;
    newBillObj.unitCp = 10.98;
    newBillObj.unitSp = 12.98;
    handleAddSKU(newBillObj);
    onHide();
  };

  const onHide = () => {
    setSkuObj(Object.assign({}, { ...initSkuObj }));
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
            <Text style={modalStyles.modalTitle}>ADD SKU</Text>
            <IconButton
              icon="close" // You can use other icons like "close-circle"
              size={24}
              onPress={onHide}
              style={modalStyles.closeButton}
            />
          </View>

          <View style={modalStyles.modalContent}>
            <TextInput
              label="SKU"
              value={skuObj?.sku?.toString()}
              onChangeText={(v) => onChangeTextHandler("sku", v)}
              style={modalStyles.input}
            />
            <TextInput
              label="Quantity"
              value={skuObj?.qty > 0 ? skuObj?.qty?.toString() : undefined}
              onChangeText={(v) => onChangeTextHandler("qty", v)}
              keyboardType="numeric"
              style={modalStyles.input}
            />
            <Button
              mode="contained"
              style={modalStyles.button}
              onPress={onAddSKU}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddSkuModal;
