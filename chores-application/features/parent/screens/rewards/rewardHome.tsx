import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ViewStyle,
  TextStyle,
  Text,
  Button,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getHouseholdIdForUser } from "@/features/auth/services/authService";
import {
  RewardList,
  SearchBar,
  AddButton,
  AddRewardForm,
  EditRewardForm,
} from "../../../reward/components/parent";
import { collections } from "@/shared/paths/firebasePaths";
import { Reward, RewardInputFromFrom } from "../../../reward/models/Reward";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function RewardsScreen() {
  const [query, setQuery] = useState<string>("");
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

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
        <View style={styles.searchAndAdd}>
          <SearchBar query={query} setQuery={setQuery} />
          <AddButton onPress={() => setAddModalVisible(true)} />
        </View>
        <View style={styles.separator} />
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Legg til belønning</Text>

            <AddRewardForm
              onSave={async (rewardData: RewardInputFromFrom) => {
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
                  await addDoc(
                    collection(db, collections.rewardsByHousehold(householdId)),
                    newReward
                  );
                  console.log("Reward added successfully!");
                  setAddModalVisible(false);
                } catch (error) {
                  console.error("Error adding reward:", error);
                }
              }}
              onCancel={() => {
                setAddModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(false);
          setSelectedReward(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rediger belønning</Text>

            {selectedReward && householdId && (
              <EditRewardForm
                reward={selectedReward}
                onSave={async (updated) => {
                  try {
                    const path = collections.rewardDocPath(
                      householdId,
                      selectedReward.rewardID
                    );
                    const rewardRef = doc(db, path);

                    await updateDoc(rewardRef, {
                      name: updated.name,
                      pointPrice: updated.pointPrice,
                    });

                    console.log("Reward updated!");
                    setEditModalVisible(false);
                    setSelectedReward(null);
                  } catch (err) {
                    console.error("Failed to update reward:", err);
                  }
                }}
                onDelete={async () => {
                  try {
                    const path = collections.rewardDocPath(
                      householdId,
                      selectedReward.rewardID
                    );
                    const rewardRef = doc(db, path);

                    await deleteDoc(rewardRef);

                    console.log("Reward deleted!");
                    setEditModalVisible(false);
                    setSelectedReward(null);
                  } catch (err) {
                    console.error("Failed to delete reward:", err);
                  }
                }}
                onCancel={() => {
                  setEditModalVisible(false);
                  setSelectedReward(null);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create<{
  screen: ViewStyle;
  separator: ViewStyle;
  topContainer: ViewStyle;
  searchAndAdd: ViewStyle;
  mainContainer: ViewStyle;

  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
}>({
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
