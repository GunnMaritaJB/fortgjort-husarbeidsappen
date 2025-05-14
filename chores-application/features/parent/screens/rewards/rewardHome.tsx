import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { collections } from '@/shared/paths/firebasePaths';

interface Reward {
  rewardID: string;
  name: string;
  pointPrice: number;
}

export default function ChildRewardsScreen() {
  const { id: childId } = useGlobalSearchParams();
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!childId || typeof childId !== 'string') return;

      try {
        // 1. Hent barnet
        const childSnap = await getDoc(doc(db, `children/${childId}`));
        if (!childSnap.exists()) return;

        const childData = childSnap.data();
        setPoints(childData.points || 0);
        const householdId = childData.householdId;
        if (!householdId) return;

        // 2. Hent rewards for household
        const rewardsSnap = await getDocs(
            collection(db, collections.rewardsByHousehold(householdId))
        );
        const loadedRewards = rewardsSnap.docs.map((doc) => ({
          rewardID: doc.id,
          ...doc.data(),
        })) as Reward[];

        setRewards(loadedRewards);
      } catch (error) {
        console.error('Feil ved henting av rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;
  }

  return (
      <View style={styles.container}>
        {/* Poengboble */}
        <View style={styles.pointsBubble}>
          <Text style={styles.points}>{points}</Text>
          <Text style={styles.pointsLabel}>POENG</Text>
        </View>

        {/* Grid med belønninger */}
        <FlatList
            data={rewards}
            keyExtractor={(item) => item.rewardID}
            numColumns={3}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.rewardBubble} onPress={() => {}}>
                  <Text style={styles.rewardPrice}>{item.pointPrice} ⭐</Text>
                  <Text style={styles.rewardName}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  pointsBubble: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FFEB3B',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    zIndex: 10,
    elevation: 4,
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#333',
  },
  grid: {
    paddingTop: 100,
    paddingBottom: 40,
    alignItems: 'center',
  },
  rewardBubble: {
    width: 100,
    height: 100,
    backgroundColor: '#BBDEFB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 6,
  },
  rewardPrice: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
  },
  rewardName: {
    fontSize: 12,
    textAlign: 'center',
  },
});
