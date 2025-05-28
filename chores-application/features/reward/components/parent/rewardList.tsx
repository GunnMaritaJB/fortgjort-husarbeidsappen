import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { Reward } from "../../models/Reward";
import RewardTile from "./rewardTile";
import { rewardListStyles as styles } from "../../styles/rewardListStyles";
import {listenToRewardsForHousehold} from "@/features/reward/services/rewardService";

type RewardListProps = {
  query: string;
  householdId: string;
  onEdit: (reward: Reward) => void;
};

const RewardList = ({ query, householdId, onEdit }: RewardListProps) => {

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = listenToRewardsForHousehold(
            householdId,
            (fetched) => {
                setRewards(fetched);
                setLoading(false);
            },
            (err) => {
                setError("Kunne ikke hente belønninger.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [householdId]);

    const filteredRewards = rewards.filter((reward) =>
        reward.name.toLowerCase().includes(query.toLowerCase())
    );

    if (loading)
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="small" color="#333" />
                <Text style={styles.message}>Laster belønninger...</Text>
            </View>
        );

    if (error)
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>{error}</Text>
            </View>
        );

    if (filteredRewards.length === 0)
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>Ingen belønninger funnet.</Text>
            </View>
        );

    return (
        <FlatList
            contentContainerStyle={styles.listContainer}
            data={[...filteredRewards].sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({ item }) => (
                <RewardTile
                    title={item.name}
                    points={item.pointPrice}
                    onPress={() => onEdit(item)}
                />
            )}
            keyExtractor={(item) => item.rewardID}
        />
    );
};

export default RewardList;
