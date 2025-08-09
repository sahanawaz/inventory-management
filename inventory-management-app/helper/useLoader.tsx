import React, { useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Icon, Modal, Portal } from "react-native-paper";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";
import { modalStyles } from "../shared/SharedStyles";

const useLoader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    setLoading(true);
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };
  const stopAnimation = () => {
    rotateAnim.setValue(0);
    setLoading(false);
  };
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const Loader = (
    <Portal>
      <Modal visible={loading} style={modalStyles.modalContainer}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ rotate: rotation }] },
            ]}
          >
            <Icon
              source="account-convert-outline"
              color={DEFAULT_THEME_COLOR}
              size={75}
            />
          </Animated.View>
        </View>
      </Modal>
    </Portal>
  );
  return { startAnimation, stopAnimation, Loader };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 200,
    backgroundColor: "trasparent",
    borderRadius: 10,
    // padding: 20,
    alignItems: "center",
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
  },
  house: {
    width: 60,
    height: 60,
    position: "relative",
  },
  roof: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: -1,
  },
  body: {
    width: 60,
    height: 40,
    backgroundColor: "#2980b9",
    position: "relative",
  },
  door: {
    width: 15,
    height: 25,
    backgroundColor: "#e74c3c",
    position: "absolute",
    bottom: 0,
    left: 10,
  },
  window: {
    width: 15,
    height: 15,
    backgroundColor: "#f1c40f",
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 3,
  },
});
export default useLoader;
