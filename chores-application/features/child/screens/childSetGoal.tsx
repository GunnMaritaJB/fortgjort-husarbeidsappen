import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useGlobalSearchParams, router } from 'expo-router';
import { Reward } from '@/features/reward/models/Reward';
import {fetchRewardsForHousehold} from '@/features/reward/services/rewardService';
import { getChildById, updateChild } from '@/features/child/services/child';
import { Snackbar } from 'react-native-paper';
import { Child } from '@/features/child/models/Child';
import {styles} from '@/features/child/styles/setGoalStyle'
import { setGoalForChild, removeGoalFromChild } from '@/features/child/services/goalService';


export default function ChildSetGoalScreen() {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const [child, setChild] = useState<Child | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

    const { householdId, id: childId } = useGlobalSearchParams();

    const showMessage = (msg: string) => {
        setSnackbar({ visible: true, message: msg });
    };

    useEffect(() => {
        const load = async () => {
            if (!householdId || !childId) return;

            const rewards = await fetchRewardsForHousehold(householdId as string);
            const childData = await getChildById(householdId as string, childId as string);

            setRewards(rewards);
            setChild(childData);
            setSelected(childData.goal?.rewardId || null);
            setLoading(false);
        };
        load();
    }, [householdId, childId]);

    const handleSave = async () => {
        if (!householdId || !childId || !selected) return;

        const reward = rewards.find((r) => r.rewardID === selected);
        if (!reward) return;

        try {
            await setGoalForChild(householdId as string, childId as string, reward);
            router.back();
        } catch (err) {
            console.error(err);
            showMessage('Kunne ikke lagre nytt mål.');
        }
    };


    const handleReset = async () => {
        if (!householdId || !childId) return;

        try {
            await removeGoalFromChild(householdId as string, childId as string);
            router.back();
        } catch (err) {
            console.error(err);
            showMessage('Kunne ikke fjerne mål.');
        }
    };


    const renderItem = ({ item }: { item: Reward }) => {
        const isSelected = item.rewardID === selected;
        return (
            <TouchableOpacity
                onPress={() => setSelected(item.rewardID)}
                style={[
                    styles.rewardCircle,
                    isSelected && { borderWidth: 3, borderColor: '#FDD835' },
                ]}
            >
                <Text style={styles.rewardText}>{item.name}</Text>
                <Text style={styles.price}>{item.pointPrice} ⭐</Text>
            </TouchableOpacity>
        );
    };

    if (loading) return <Text style={{ padding: 40 }}>Laster...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VELG DITT MÅL 🎯</Text>

            {child?.goal && (
                <View style={styles.currentGoalBox}>
                    <Text style={styles.goalTitle}>DITT MÅL:</Text>
                    <Text style={styles.goalName}>{child.goal.title} ({child.goal.cost} ⭐)</Text>
                </View>
            )}

            <FlatList
                data={rewards}
                renderItem={renderItem}
                keyExtractor={(item) => item.rewardID}
                numColumns={3}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.row}
            />

            <View style={styles.actions}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>🎯 LAGRE MÅL</Text>
                </TouchableOpacity>

                {child?.goal && (
                    <TouchableOpacity style={styles.clearButton} onPress={handleReset}>
                        <Text style={styles.clearText}>🗑 FJERN MÅL</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: '' })}
                duration={3000}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    );
}



