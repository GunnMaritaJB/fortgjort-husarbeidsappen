import { View, Text, StyleSheet } from "react-native";
import { RewardList, SearchBar, AddButton } from "../../components/reward";

export default function RewardsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <View style={styles.searchAndAdd}>
          <SearchBar />
          <AddButton />
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.mainContainer}>
        <RewardList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#e8f5e9",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "rgba(33, 33, 33, 0.89)",
    marginVertical: 10,
    alignSelf: "center",
  },
  topContainer: {
    flex: 1,
    paddingTop: 30,
  },
  searchAndAdd: {
    flexDirection: "row",
  },
  mainContainer: {
    flex: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
