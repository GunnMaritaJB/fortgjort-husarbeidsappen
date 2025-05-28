import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import {styles} from '@/features/child/styles/insufficientPointsModalStyles'

type Props = {
    visible: boolean;
    missingPoints: number;
    onClose: () => void;
};

export default function InsufficientPointsModal({ visible, missingPoints, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.emoji}>😭</Text>
                    <Text style={styles.message}>Du har ikke nok poeng</Text>
                    <Text style={styles.missing}>Du mangler {missingPoints} ⭐</Text>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

