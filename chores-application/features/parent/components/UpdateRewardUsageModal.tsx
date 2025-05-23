import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateRewardUsage } from '@/features/reward/services/rewardService';

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
            console.error('Kunne ikke oppdatere reward:', error);
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

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 12,
        color: '#333',
    },
    closeBtn: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    closeText: {
        fontWeight: 'bold',
        color: '#333',
    },
});
