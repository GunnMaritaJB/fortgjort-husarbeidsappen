import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PurchasedReward } from '@/features/reward/models/PurchasedReward';


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
                    {/* Close button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>

                    {/* Placeholder for content */}
                    <Text style={styles.header}>Belønninger du har kjøpt</Text>

                    <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1, width: '100%' }}>
                        {(rewards?.length ?? 0) === 0 ? (
                            <Text style={styles.emptyText}>Du har ikke kjøpt noen belønninger enda.</Text>
                        ) : (
                            rewards.map((reward) => (
                                <Text key={reward.id} style={styles.rewardText}>
                                    🎁 {reward.name} ({reward.pointPrice}p)
                                </Text>
                            ))
                        )}
                    </ScrollView>

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
    modalContainer: {
        width: 320,
        height: 450,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40,
    },
    rewardsList: {
        marginTop: 20,
        width: '100%',
    },
    scrollContent: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    rewardText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },


});
