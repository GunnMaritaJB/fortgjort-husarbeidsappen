import { StyleSheet } from "react-native";

export const rewardFormStyles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#81C784",
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E57373",
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#E57373",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
