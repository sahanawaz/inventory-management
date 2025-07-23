import * as React from "react";
import { Modal, Portal, Text, Icon } from "react-native-paper";
import { modalStyles } from "../shared/SharedStyles";
import { COLOR } from "./SysConsts";
import { StyleSheet, View } from "react-native";
import { AlertModalConfig } from "../shared/SharedConstants";

const DEFAULT_ERR_ICON = (
  <Icon source="alert-circle-outline" size={48} color={COLOR.DANGER} />
);
const DEFAULT_SUC_ICON = (
  <Icon source="check-circle-outline" size={48} color={COLOR.SUCCESS} />
);

interface AlertModalProps {
  onDismiss(): void;
  config: AlertModalConfig;
}

const AlertModal: React.FC<AlertModalProps> = ({ config, onDismiss }) => {
  const getIcon = () => {
    switch (config?.isSuccess) {
      case 0:
        return DEFAULT_SUC_ICON;
      case -1:
        return DEFAULT_ERR_ICON;
      default:
        return (
          <Icon source={config?.iconSrc} size={48} color={COLOR.SUCCESS} />
        );
    }
  };

  return (
    <Portal>
      <Modal
        visible={config?.visible}
        onDismiss={onDismiss}
        contentContainerStyle={modalStyles.modalContainer}
      >
        <View style={modalStyles.modalContainerStyle}>
          <View style={styles.iconContainer}>{getIcon()}</View>
          <View>
            {config?.message.map((msg, index) => (
              <Text key={index} variant="titleMedium" style={styles.message}>
                {msg}
              </Text>
            ))}
          </View>
        </View>
        {/* React Native Paper Icon Component */}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    fontSize: 12,
    color: COLOR.PRIMARY,
  },
  iconContainer: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AlertModal;
