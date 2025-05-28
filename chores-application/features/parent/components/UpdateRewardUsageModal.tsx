import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateRewardUsage } from '@/features/reward/services/rewardService';
import {styles} from '@/features/parent/styles/profile/updateRewardUsageModal'

type Props = {
    visible: boolean;
    onClose: () => void;
    rewardId: string;
    rewardName: string;
    initialUsed: boolean;
    householdId: string;
    childId: string;
    onChange: () => void;
};

export default function UpdateRewardUsageModal({
                                                   visible,
                                                   onClose,
                                                   rewardId,
                                                   rewardName,
                                                   initialUsed,
                                                   householdId,
                                                   childId,
                                                   onChange,
                                               }: Props) {
    const [isUsed, setIsUsed] = useState(initialUsed);

    const toggleUsed = async () => {
        const newValue = !isUsed;
        setIsUsed(newValue);

        try {
            await updateRewardUsage(householdId, childId, rewardId, newValue);
            onChange();
        } catch (error) {
        }
    };


    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <LinearGradient colors={['#81c784', '#c8e6c9']} style={styles.container}>
                    <Text style={styles.title}>{rewardName}</Text>
                    <Text style={styles.label}>Skyv til høyre for å merke som brukt</Text>
                    <Switch
                        value={isUsed}
                        onValueChange={toggleUsed}
                        thumbColor="#fff"
                        trackColor={{ false: '#66bb6a', true: '#ef5350' }}
                    />
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Lukk</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
}
