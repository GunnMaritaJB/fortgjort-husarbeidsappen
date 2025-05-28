import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { AddRewardForm } from "../../parent";
import { RewardInputFromFrom } from "../../../models/Reward";
import {styles} from '@/features/reward/styles/addRewardModalStyles'

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


