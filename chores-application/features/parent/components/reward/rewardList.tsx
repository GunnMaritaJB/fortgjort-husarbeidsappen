import { FlatList } from "react-native";
import RewardTile from "./rewardTile";

// Sample data for the rewards list
const DATA = [
  {
    title: "Reward 1",
    points: 100,
  },
  {
    title: "Reward 2",
    points: 200,
  },
  {
    title: "Reward 3",
    points: 300,
  },
  {
    title: "Reward 4",
    points: 400,
  },
  {
    title: "Reward 5",
    points: 500,
  },
  {
    title: "Reward 6",
    points: 600,
  },
  {
    title: "Reward 7",
    points: 700,
  },
  {
    title: "Reward 8",
    points: 800,
  },
  {
    title: "Reward 9",
    points: 900,
  },
  {
    title: "Reward 10",
    points: 1000,
  },
];

const RewardList = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <RewardTile title={item.title} points={item.points} />
      )}
      keyExtractor={(item) => item.title}
    />
  );
};

export default RewardList;
