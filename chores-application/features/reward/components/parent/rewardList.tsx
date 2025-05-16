import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import {FlatList, Text, StyleSheet, View, ActivityIndicator} from "react-native";
import { Reward } from "../../models/Reward";
import RewardTile from "./rewardTile";
import { collections } from "@/shared/paths/firebasePaths";

type RewardListProps = {
  query: string;
  householdId: string;
  onEdit: (reward: Reward) => void;
};

const RewardList = ({ query, householdId, onEdit }: RewardListProps) => {
  // States
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rewardsRef = collection(
      db,
      collections.rewardsByHousehold(householdId)
    );

    const unsubscribe = onSnapshot(
      rewardsRef,
      (snapshot) => {
        const fetchedRewards: Reward[] = snapshot.docs.map((doc) => ({
          rewardID: doc.id,
          ...doc.data(),
        })) as Reward[];

        setRewards(fetchedRewards);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch rewards:", err);
        setError("Kunne ikke hente belønninger.");
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
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

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  message: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
});
export default RewardList;
