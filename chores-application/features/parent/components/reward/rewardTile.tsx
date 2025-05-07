import { View, Text, StyleSheet } from "react-native";

type RewardTileProps = {
  title: string;
  points: number;
};

const RewardTile = ({ title, points }: RewardTileProps) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{points}</Text>
    </View>
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
