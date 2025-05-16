import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalSearchParams } from 'expo-router';

import { fetchRewardsForHousehold, purchaseReward } from '@/features/reward/services/rewardService';
import { Reward } from '@/features/reward/models/Reward';
import { getChildById } from '@/features/child/services/child';
import ConfirmRewardPurchaseModal from '@/features/reward/components/child/ConfirmRewardPurchaseModal';

export default function ChildRewardsHomeScreen() {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState<number>(0);

    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const { householdId: rawHouseholdId, id: rawChildId } = useGlobalSearchParams();
    const householdId = typeof rawHouseholdId === 'string' ? rawHouseholdId : rawHouseholdId?.[0];
    const childId = typeof rawChildId === 'string' ? rawChildId : rawChildId?.[0];

    const handlePressReward = (reward: Reward) => {
        setSelectedReward(reward);
        setConfirmVisible(true);
    };

    const handleConfirmPurchase = async () => {
        if (!householdId || !childId || !selectedReward) return;

        try {
            await purchaseReward(householdId, childId, selectedReward);
            setPoints(prev => prev - selectedReward.pointPrice);
            setConfirmVisible(false);
            setSelectedReward(null);
        } catch (error) {
            console.error('❌ Klarte ikke å kjøpe reward:', error);
            // Vis en feilmelding til bruker hvis ønsket
        }
    };

    useEffect(() => {
        if (!householdId || !childId) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [rewardsData, childData] = await Promise.all([
                    fetchRewardsForHousehold(householdId),
                    getChildById(householdId, childId),
                ]);
                setRewards(rewardsData);
                setPoints(childData.points || 0);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [householdId, childId]);

    const renderItem = ({ item }: { item: Reward }) => (
        <TouchableOpacity onPress={() => handlePressReward(item)} style={styles.rewardCircle}>
            <Text style={styles.rewardTitle}>{item.name}</Text>
            <View style={styles.priceTag}>
                <Text style={styles.priceText}>{item.pointPrice}p</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <LinearGradient colors={['#D7FBE8', '#FFF8DC']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 100 }}>Laster belønninger...</Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#D7FBE8', '#FFF8DC']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
            <View style={styles.pointsContainer}>
                <View style={styles.starburst}>
                    <Text style={styles.pointsText}>{points}</Text>
                    <Text style={styles.pointsLabel}>POENG</Text>
                </View>
            </View>

            <FlatList
                data={rewards}
                renderItem={renderItem}
                keyExtractor={(item) => item.rewardID}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
            />

            <TouchableOpacity style={styles.backpackButton}>
                <Text style={styles.backpackText}>🎒</Text>
            </TouchableOpacity>

            {selectedReward && (
                <ConfirmRewardPurchaseModal
                    visible={confirmVisible}
                    rewardName={selectedReward.name}
                    rewardPrice={selectedReward.pointPrice}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => setConfirmVisible(false)}
                />
            )}
        </LinearGradient>
    );
}



const CIRCLE_SIZE = 90;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    pointsBadge: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#FFEB3B',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
        alignItems: 'center',
        zIndex: 10,
    },
    pointsValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    grid: {
        paddingTop: 100,
        paddingBottom: 80,
    },
    row: {
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    rewardCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    rewardTitle: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    priceTag: {
        position: 'absolute',
        top: 6,
        right: 3,
        backgroundColor: '#FFD600',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    priceText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
    },
    backpackButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#FFD600',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
    backpackText: {
        fontSize: 28,
    },
    pointsContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },


    starburst: {
        backgroundColor: '#FFD600',
        padding: 20,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFCA28',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    pointsText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },

    pointsLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },


});
