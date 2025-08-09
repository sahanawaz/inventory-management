import { StyleSheet } from "react-native";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";

export const modalStyles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    borderRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalContent: {
    paddingRight: 24, // To prevent content overlapping with the close button
  },
  modalContainer: {
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    color: DEFAULT_THEME_COLOR,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  button: {
    marginHorizontal: 50,
    padding: 0,
    backgroundColor: DEFAULT_THEME_COLOR,
  },
  closeButton: {
    margin: 0,
    padding: 0,
  },
});

export const textFieldStyles = StyleSheet.create({
  sectionTitle: {
    color: DEFAULT_THEME_COLOR,
    marginBottom: 12,
  },
});
