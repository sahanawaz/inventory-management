import React from "react";
import { Modal, Portal, Text } from "react-native-paper";
import { modalStyles } from "../shared/SharedStyles";
import { View } from "react-native";

type BillDtlsProps = {
  visible: boolean;
  onHide: () => void;
};
const BillDtlsScreen: React.FC<BillDtlsProps> = ({ visible, onHide }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onHide}
        contentContainerStyle={modalStyles.modalContainer}
      >
        <View style={modalStyles.modalContainerStyle}>
          <View style={modalStyles.modalHeader}></View>
        </View>
      </Modal>
    </Portal>
  );
};

export default BillDtlsScreen;
