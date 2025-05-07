import { View, Text, StyleSheet } from "react-native";

const AddButton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ddd",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
export default AddButton;
