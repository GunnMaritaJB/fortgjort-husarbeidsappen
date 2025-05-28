import { StyleSheet } from "react-native";

export const rewardFormStyles = StyleSheet.create({
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    gap: 16,
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  deleteButtonRow: {
    marginTop: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E57373",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#E57373",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
