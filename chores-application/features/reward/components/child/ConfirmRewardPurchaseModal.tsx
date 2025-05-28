// features/reward/components/ConfirmRewardPurchaseModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
type Props = {
    visible: boolean;
    rewardName: string;
    rewardPrice: number;
    onConfirm: () => void;
    onCancel: () => void;
};
import {styles} from '@/features/reward/styles/confirmRewardPurchaseModalStyles'


export default function ConfirmRewardPurchaseModal({
                                                       visible,
                                                       rewardName,
                                                       rewardPrice,
                                                       onConfirm,
                                                       onCancel
                                                   }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Vil du kjøpe denne belønningen?</Text>
                    <Text style={styles.rewardName}>{rewardName.toUpperCase()}</Text>
                    <Text style={styles.rewardPrice}>{rewardPrice} POENG</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonYes} onPress={onConfirm}>
                            <Text style={styles.buttonText}>🎉 Ja!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNo} onPress={onCancel}>
                            <Text style={styles.buttonText}>😐 Nei</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
