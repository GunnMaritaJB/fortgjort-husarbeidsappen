import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import {fetchPurchasedRewards, updateRewardUsage} from '@/features/reward/services/rewardService';
import { PurchasedReward } from '@/features/reward/models/PurchasedReward';
import UpdateRewardUsageModal from '@/features/parent/components/UpdateRewardUsageModal';


export default function RewardForChildScreen() {
    const [rewards, setRewards] = useState<PurchasedReward[]>([]);
    const [loading, setLoading] = useState(true);

    const { householdId: rawHouseholdId, id: rawChildId } = useGlobalSearchParams();
    const householdId = typeof rawHouseholdId === 'string' ? rawHouseholdId : rawHouseholdId?.[0];
    const childId = typeof rawChildId === 'string' ? rawChildId : rawChildId?.[0];

    const [selectedReward, setSelectedReward] = useState<PurchasedReward | null>(null);
    const [modalVisible, setModalVisible] = useState(false);


    const refreshRewards = async () => {
        if (!householdId || !childId) return;
        const fetched = await fetchPurchasedRewards(householdId, childId);
        setRewards(fetched);
    };



    useEffect(() => {
        if (!householdId || !childId) return;

        const loadRewards = async () => {
            setLoading(true);
            try {
                const fetched = await fetchPurchasedRewards(householdId, childId);
                setRewards(fetched);
            } catch (e) {
                console.error('Klarte ikke hente rewards for child:', e);
            } finally {
                setLoading(false);
            }
        };

        loadRewards();
    }, [householdId, childId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Laster belønninger...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Belønninger kjøpt av barnet</Text>
            <FlatList
                data={rewards}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.rewardItem}
                        onPress={() => {
                            if (!item.id) return;
                            setSelectedReward(item);
                            setModalVisible(true);
                        }}

                    >
                        <Text style={styles.emoji}>🎁</Text>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={[styles.status, { color: item.used ? 'red' : 'green' }]}>
                            {item.used ? 'Brukt' : 'Ikke brukt'}
                        </Text>
                    </TouchableOpacity>
                )}

            />

            {selectedReward && (
                <UpdateRewardUsageModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    rewardId={selectedReward.id!}
                    rewardName={selectedReward.name}
                    initialUsed={selectedReward.used}
                    householdId={householdId}
                    childId={childId}
                    onChange={refreshRewards}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        gap: 12,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        elevation: 2,
    },
    emoji: {
        fontSize: 24,
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
    status: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
});
