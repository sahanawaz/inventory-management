import * as React from "react";
import { Modal, Portal, Text, Icon, Button } from "react-native-paper";
import { modalStyles } from "../shared/SharedStyles";
import { COLOR, DEFAULT_THEME_COLOR } from "./SysConsts";
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
  onOk?: () => void;
  config: AlertModalConfig;
}

const AlertModal: React.FC<AlertModalProps> = ({ config, onDismiss, onOk }) => {
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

  const handleOk = () => {
    if (!!onOk) {
      onOk();
    }
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={config?.visible}
        // onDismiss={onDismiss}
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
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={styles.button}
              buttonColor={DEFAULT_THEME_COLOR}
              labelStyle={styles.btnLabel}
              onPress={config.isSuccess === 0 ? handleOk : onDismiss}
            >
              {config.isSuccess === 0 ? "OK" : "Cancel"}
            </Button>
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
  btnContainer: {
    flexDirection: "row",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    width: 100,
    height: 40,
    marginTop: 10,
  },
  btnLabel: {
    padding: 0,
  },
});

export default AlertModal;
