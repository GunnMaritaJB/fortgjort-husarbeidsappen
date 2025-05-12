import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { FlatList, Text, StyleSheet } from "react-native";
import { Reward } from "../../models/Reward";
import RewardTile from "./rewardTile";
import { collections } from "@/shared/paths/firebasePaths";

/* // Sample data for the rewards list
const DATA = [
  { id: 1, title: "Movie Night", points: 100 },
  { id: 2, title: "Ice Cream", points: 50 },
  { id: 3, title: "Game Night", points: 150 },
  { id: 4, title: "Pizza Party", points: 200 },
  { id: 5, title: "Bowling", points: 300 },
  { id: 6, title: "Amusement Park", points: 500 },
  { id: 7, title: "Camping Trip", points: 700 },
  { id: 8, title: "Concert Tickets", points: 800 },
  { id: 9, title: "Spa Day", points: 900 },
  { id: 10, title: "Weekend Getaway", points: 1000 },
]; */

type RewardListProps = {
  query: string;
  householdId: string;
};

const RewardList = ({ query, householdId }: RewardListProps) => {
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
      data={filteredRewards}
      renderItem={({ item }) => (
        <RewardTile title={item.name} points={item.pointPrice} />
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
