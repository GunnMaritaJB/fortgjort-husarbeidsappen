import { View, StyleSheet, TextInput } from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Søk etter belønning" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
});

export default SearchBar;
