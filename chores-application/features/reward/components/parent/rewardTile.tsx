import { Pressable, Text, StyleSheet } from "react-native";

type RewardTileProps = {
  title: string;
  points: number;
  onPress: () => void;
};

const RewardTile = ({ title, points, onPress }: RewardTileProps) => {
  return (
    <Pressable onPress={onPress} style={styles.tile}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{points}p</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#ddd",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 3,
    marginVertical: 8,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#555",
  },
});
export default RewardTile;
