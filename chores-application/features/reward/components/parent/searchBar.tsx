import { View, TextInput } from "react-native";
import { searchBarStyles as styles } from "../../styles/searchBarStyles";

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

export default SearchBar;
