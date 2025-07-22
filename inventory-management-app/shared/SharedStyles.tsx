import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: "white",
    padding: 10,
    margin: 30,
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
    color: "#d4af37",
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
    backgroundColor: "#d4af37",
  },
  closeButton: {
    margin: 0,
    padding: 0,
  },
});
