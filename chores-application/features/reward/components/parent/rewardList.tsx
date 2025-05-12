import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { FlatList, Text, StyleSheet } from "react-native";
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
    return <Text style={styles.textStyle}>Laster belønninger...</Text>;
  if (error) return <Text style={styles.textStyle}>{error}</Text>;
  if (filteredRewards.length === 0)
    return <Text style={styles.textStyle}>Ingen belønninger funnet.</Text>;

  return (
    <FlatList
      data={[...rewards].sort((a, b) => a.name.localeCompare(b.name))}
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
  textStyle: {
    marginVertical: 16,
  },
});

export default RewardList;
