import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalSearchParams } from 'expo-router';
import {styles} from '@/features/child/styles/rewardsScreenStyles'

import {
    fetchPurchasedRewards,
    fetchRewardsForHousehold,
    purchaseReward
} from '@/features/reward/services/rewardService';
import { Reward } from '@/features/reward/models/Reward';
import { getChildById } from '@/features/child/services/child';
import ConfirmRewardPurchaseModal from '@/features/reward/components/child/ConfirmRewardPurchaseModal';
import BackpackModal from '@/features/reward/components/child/BackpackModal';
import InsufficientPointsModal from "@/features/child/components/InsufficientPointsModal";
import {PurchasedReward} from "@/features/reward/models/PurchasedReward";


export default function ChildRewardsHomeScreen() {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState<number>(0);
    const [purchasedRewards, setPurchasedRewards] = useState<PurchasedReward[]>([]);


    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [backpackVisible, setBackpackVisible] = useState(false);


    const { householdId: rawHouseholdId, id: rawChildId } = useGlobalSearchParams();
    const householdId = typeof rawHouseholdId === 'string' ? rawHouseholdId : rawHouseholdId?.[0];
    const childId = typeof rawChildId === 'string' ? rawChildId : rawChildId?.[0];

    const [insufficientModalVisible, setInsufficientModalVisible] = useState(false);
    const [missingPoints, setMissingPoints] = useState<number>(0);


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

            const updatedPurchases = await fetchPurchasedRewards(householdId, childId);
            const unused = updatedPurchases.filter((r) => !r.used);
            setPurchasedRewards(unused);

        } catch (error) {
            const shortfall = selectedReward.pointPrice - points;
            setMissingPoints(shortfall > 0 ? shortfall : 0); // Safety check
            setInsufficientModalVisible(true);
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

    useEffect(() => {
        if (!householdId || !childId) return;

        const loadPurchases = async () => {
            const purchases = await fetchPurchasedRewards(householdId, childId);
            const unused = purchases.filter((r) => !r.used);
            setPurchasedRewards(unused);
        };

        loadPurchases();
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
            <View style={styles.topBar}>

                <View style={styles.starburst}>
                    <Text style={styles.pointsText}>{points}</Text>
                    <Text style={styles.pointsLabel}>POENG</Text>
                </View>

                <TouchableOpacity style={styles.topIcon} onPress={() => setBackpackVisible(true)}>
                    <Text style={styles.topEmoji}>🎒</Text>
                </TouchableOpacity>


            </View>


            <FlatList
                data={rewards}
                renderItem={renderItem}
                keyExtractor={(item) => item.rewardID}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
            />


            {selectedReward && (
                <ConfirmRewardPurchaseModal
                    visible={confirmVisible}
                    rewardName={selectedReward.name}
                    rewardPrice={selectedReward.pointPrice}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => setConfirmVisible(false)}
                />
            )}

            <BackpackModal
                visible={backpackVisible}
                onClose={() => setBackpackVisible(false)}
                rewards={purchasedRewards ?? []}
            />

            <InsufficientPointsModal
                visible={insufficientModalVisible}
                missingPoints={missingPoints}
                onClose={() => setInsufficientModalVisible(false)}
            />


        </LinearGradient>
    );
}





