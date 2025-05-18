import { useState, useEffect } from "react";
import { View, StyleSheet, ViewStyle, TextStyle, Text } from "react-native";
import { getAuth } from "firebase/auth";
import { getHouseholdIdForUser } from "@/features/auth/services/authService";
import {
  RewardList,
  SearchBar,
  AddButton,
} from "../../../reward/components/parent";
import AddRewardModal from "../../../reward/components/parent/modals/AddRewardModal";
import EditRewardModal from "../../../reward/components/parent/modals/EditRewardModal";
import { Reward, RewardInputFromFrom } from "../../../reward/models/Reward";
import {
  addReward,
  updateReward,
  deleteReward,
} from "../../../reward/services/rewardService";
import { RewardScreenStyles as styles } from "../../styles/rewardScreenStyles";

export default function RewardsScreen() {
  const [query, setQuery] = useState<string>("");
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleAddReward = async (rewardData: RewardInputFromFrom) => {
    const user = getAuth().currentUser;
    if (!user || !householdId) {
      console.error("User or household ID not found.");
      return;
    }

    const newReward: Omit<Reward, "rewardID"> = {
      name: rewardData.name,
      pointPrice: rewardData.pointPrice,
      addedBy: user.uid,
    };

    try {
      await addReward(householdId, newReward);
      console.log("Reward added successfully!");
      setAddModalVisible(false);
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  const handleEditReward = async (updated: {
    name: string;
    pointPrice: number;
  }) => {
    if (!householdId || !selectedReward) {
      console.error("Household ID or selected reward not found.");
      return;
    }

    try {
      await updateReward(householdId, selectedReward.rewardID, updated);
      console.log("Reward updated successfully!");
      setEditModalVisible(false);
      setSelectedReward(null);
    } catch (error) {
      console.error("Error updating reward:", error);
    }
  };

  const handleDeleteReward = async () => {
    if (!householdId || !selectedReward) {
      console.error("Household ID or selected reward not found.");
      return;
    }

    try {
      await deleteReward(householdId, selectedReward.rewardID);
      setEditModalVisible(false);
      setSelectedReward(null);
    } catch (error) {
      console.error("Error deleting reward:", error);
    }
  };

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

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>BELØNNINGER</Text>
        <View style={styles.searchAndAdd}>
          <SearchBar query={query} setQuery={setQuery} />
          <AddButton
            testID="addRewardButton"
            onPress={() => setAddModalVisible(true)}
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        {householdId && (
          <RewardList
            query={query}
            householdId={householdId}
            onEdit={(reward) => {
              setSelectedReward(reward);
              setEditModalVisible(true);
            }}
          />
        )}
      </View>

      <AddRewardModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddReward}
      />

      <EditRewardModal
        visible={editModalVisible}
        reward={selectedReward}
        householdId={householdId}
        onSave={handleEditReward}
        onDelete={handleDeleteReward}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedReward(null);
        }}
      />
    </View>
  );
}
