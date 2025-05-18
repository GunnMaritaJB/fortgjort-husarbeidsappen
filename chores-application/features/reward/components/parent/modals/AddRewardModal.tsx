import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { AddRewardForm } from "../../parent";
import { RewardInputFromFrom } from "../../../models/Reward";

interface AddRewardModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (rewardData: RewardInputFromFrom) => void;
}

export default function AddRewardModal({
  visible,
  onClose,
  onSave,
}: AddRewardModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Legg til belønning</Text>

          <AddRewardForm onSave={onSave} onCancel={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
