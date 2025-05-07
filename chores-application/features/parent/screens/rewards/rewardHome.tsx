import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../../../shared/components";
import { RewardList } from "../../components/reward";

export default function RewardsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Header>Search goes here</Header>
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
  topContainer: {
    flex: 1,
    paddingTop: 50,
  },
  mainContainer: {
    flex: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
