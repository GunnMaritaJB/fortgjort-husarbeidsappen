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
        value={query}
        onChangeText={setQuery}
      />
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
