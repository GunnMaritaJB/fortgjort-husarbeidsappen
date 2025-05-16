import { collection, getDocs, doc, updateDoc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { collections } from '@/shared/paths/firebasePaths';
import { Reward } from '../models/Reward';
import { PurchasedReward } from '../models/PurchasedReward';

export const fetchRewardsForHousehold = async (householdId: string): Promise<Reward[]> => {
    try {
        const rewardsRef = collection(db, collections.rewardsByHousehold(householdId));
        const snapshot = await getDocs(rewardsRef);

        const rewards: Reward[] = snapshot.docs.map((doc) => ({
            rewardID: doc.id,
            ...doc.data(),
        })) as Reward[];

        return rewards;
    } catch (error) {
        console.error('Error fetching rewards:', error);
        return [];
    }
};


export const purchaseReward = async (
    householdId: string,
    childId: string,
    reward: Reward
) => {
    const childRef = doc(db, `households/${householdId}/children/${childId}`);
    const childSnap = await getDoc(childRef);
    if (!childSnap.exists()) throw new Error('Barnet finnes ikke');

    const currentPoints = childSnap.data().points ?? 0;
    if (currentPoints < reward.pointPrice) throw new Error('Ikke nok poeng');

    // Trekk fra poeng
    await updateDoc(childRef, {
        points: currentPoints - reward.pointPrice,
    });

    // Lagre reward som kjøpt
    const purchase: PurchasedReward = {
        rewardId: reward.rewardID,
        name: reward.name,
        pointPrice: reward.pointPrice,
        used: false,
    };

    await addDoc(
        collection(db, `households/${householdId}/children/${childId}/purchasedRewards`),
        purchase
    );
};


export const fetchPurchasedRewards = async (
    householdId: string,
    childId: string
): Promise<PurchasedReward[]> => {
    const snapshot = await getDocs(
        collection(db, `households/${householdId}/children/${childId}/purchasedRewards`)
    );

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as PurchasedReward[];
};