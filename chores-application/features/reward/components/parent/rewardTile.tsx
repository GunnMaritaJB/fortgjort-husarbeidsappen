import { Text, TouchableOpacity } from "react-native";
import { rewardTileStyles as styles } from "../../styles/rewardTileStyles";

type RewardTileProps = {
  title: string;
  points: number;
  onPress: () => void;
};

const RewardTile = ({ title, points, onPress }: RewardTileProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>
        {title} – {points} poeng
      </Text>
    </TouchableOpacity>
  );
};

export default RewardTile;
