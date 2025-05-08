import { FlatList } from "react-native";
import { useState } from "react";
import RewardTile from "./rewardTile";

// Sample data for the rewards list
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
];

type RewardListProps = {
  query: string;
};

const RewardList = ({ query }: RewardListProps) => {
  // Filter the rewards based on the search query
  const [rewards] = useState(DATA);

  const filteredRewards = rewards.filter((reward) =>
    reward.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FlatList
      data={filteredRewards}
      renderItem={({ item }) => (
        <RewardTile title={item.title} points={item.points} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default RewardList;
