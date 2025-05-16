import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";

type RewardTileProps = {
  title: string;
  points: number;
  onPress: () => void;
};

const RewardTile = ({ title, points, onPress }: RewardTileProps) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.title}>{title} – {points} poeng</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0F2F1',       // lik oppgavekort
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
});

/*const styles = StyleSheet.create({
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
});*/
export default RewardTile;
