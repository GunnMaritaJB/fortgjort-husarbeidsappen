import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { collections } from '@/shared/paths/firebasePaths';
import { Reward } from '../models/Reward';

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
