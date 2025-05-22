// features/child/services/goalService.ts

import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Reward } from '@/features/reward/models/Reward';

export const setGoalForChild = async (
    householdId: string,
    childId: string,
    reward: Reward
) => {
    const ref = doc(db, `households/${householdId}/children/${childId}`);
    await updateDoc(ref, {
        goal: {
            rewardId: reward.rewardID,
            title: reward.name,
            cost: reward.pointPrice,
        },
    });
};

export const removeGoalFromChild = async (
    householdId: string,
    childId: string
) => {
    const ref = doc(db, `households/${householdId}/children/${childId}`);
    await updateDoc(ref, {
        goal: deleteField(),
    });
};
