import { View, StyleSheet, TextInput } from "react-native";

type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
};

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Søk etter belønning"
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: "#000",
  },
});

export default SearchBar;
