import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import {deletePurchasedReward, fetchPurchasedRewards} from '@/features/reward/services/rewardService';
import { PurchasedReward } from '@/features/reward/models/PurchasedReward';
import UpdateRewardUsageModal from '@/features/parent/components/UpdateRewardUsageModal';
import {styles} from '@/features/parent/styles/profile/rewardForChildScreenStyles'


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
                    <View style={styles.rewardItem}>
                        <TouchableOpacity
                            style={styles.rewardInfo}
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

                        {item.used && item.id && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Slett belønning',
                                        'Vil du slette denne brukte belønningen?',
                                        [
                                            { text: 'Avbryt', style: 'cancel' },
                                            {
                                                text: 'Slett',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    try {
                                                        await deletePurchasedReward(householdId!, childId!, item.id!);
                                                        refreshRewards();
                                                    } catch (e) {
                                                        Alert.alert('Feil', 'Kunne ikke slette belønningen.');
                                                    }
                                                },
                                            },
                                        ]
                                    );
                                }}
                            >
                                <Text style={styles.deleteButtonText}>Slett</Text>
                            </TouchableOpacity>
                        )}
                    </View>
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
