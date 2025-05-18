import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { EditRewardForm } from "../../parent";
import { Reward } from "../../../models/Reward";

interface EditRewardModalProps {
  visible: boolean;
  reward: Reward | null;
  householdId: string | null;
  onSave: (updated: { name: string; pointPrice: number }) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditRewardModal({
  visible,
  reward,
  householdId,
  onSave,
  onDelete,
  onClose,
}: EditRewardModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Rediger belønning</Text>

          {reward && householdId && (
            <EditRewardForm
              reward={reward}
              onSave={onSave}
              onDelete={onDelete}
              onCancel={onClose}
            />
          )}
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
