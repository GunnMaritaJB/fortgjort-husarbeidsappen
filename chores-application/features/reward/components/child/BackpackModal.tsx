import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PurchasedReward } from '@/features/reward/models/PurchasedReward';
import {styles} from '@/features/reward/styles/backpackModalStyles'

type BackpackModalProps = {
    visible: boolean;
    onClose: () => void;
    rewards: PurchasedReward[];
};


export default function BackpackModal({ visible, onClose, rewards }: BackpackModalProps) {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <LinearGradient
                    colors={['#FFCDD2', '#F8BBD0', '#E1BEE7']}
                    style={styles.modalContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.header}>Belønninger du har kjøpt</Text>

                    <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1, width: '100%' }}>
                        {rewards.length === 0 ? (
                            <Text style={styles.emptyText}>Sekken er tom</Text>
                        ) : (
                            <View style={styles.rewardGrid}>
                                {rewards.map((reward) => (
                                    <View key={reward.id} style={styles.rewardBubble}>
                                        <Text style={styles.rewardEmoji}>🎁</Text>
                                        <Text style={styles.rewardText}>{reward.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                    </ScrollView>

                </LinearGradient>
            </View>
        </Modal>
    );
}
