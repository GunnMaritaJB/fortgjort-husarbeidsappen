import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getHouseholdIdForUser } from "@/features/auth/services/authService";
import {
  RewardList,
  SearchBar,
  AddButton,
} from "../../../reward/components/parent";

export default function RewardsScreen() {
  const [query, setQuery] = useState<string>("");
  const [householdId, setHouseholdId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouseholdId = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const id = await getHouseholdIdForUser(user.uid);
        setHouseholdId(id);
      }
    };

    fetchHouseholdId();
  }, []);
  console.log("Household ID:", householdId);
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <View style={styles.searchAndAdd}>
          <SearchBar query={query} setQuery={setQuery} />
          <AddButton />
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.mainContainer}>
        {householdId && <RewardList query={query} householdId={householdId} />}
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
