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
import { BillClass, SkuClass } from "../shared/SharedInterface";
import { modalStyles } from "../shared/SharedStyles";

interface SkuProps {
  visible: boolean;
  hideModal(): void;
  handleOnFilter(argFilter: SkuClass): void;
}

const initSkuObj = {
  sku: "",
  qty: 0,
};

const FilterSkuModal: React.FC<SkuProps> = ({
  visible,
  handleOnFilter,
  hideModal,
}) => {
  const [skuObj, setSkuObj] = useState<SkuClass>(
    Object.assign({}, { ...initSkuObj })
  );

  const onChangeTextHandler = (key: string, text: any) => {
    setSkuObj({ ...skuObj, [key]: text });
  };

  const onFilter = () => {
    handleOnFilter(skuObj);
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
            <Text style={modalStyles.modalTitle}>FIND YOUR INVENTORY</Text>
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
            <Button
              mode="contained"
              style={modalStyles.button}
              onPress={onFilter}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default FilterSkuModal;
