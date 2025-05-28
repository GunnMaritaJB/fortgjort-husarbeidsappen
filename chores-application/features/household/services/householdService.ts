import {
    addDoc,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { fetchChildrenByHousehold } from '@/features/child/services/child';

export const createHousehold = async (
    name: string,
    uid: string
): Promise<string> => {
    const parentRef = doc(db, 'parents', uid);
    const snapshot = await getDoc(parentRef);
    const parentData = snapshot.data();

    if (parentData?.householdId) {
        return parentData.householdId;
    }

    const docRef = await addDoc(collection(db, 'households'), {
        name,
        ownerId: uid,
        createdAt: serverTimestamp(),
    });

    const householdId = docRef.id;

    if (snapshot.exists()) {
        await updateDoc(parentRef, { householdId });
    } else {
        await setDoc(parentRef, { householdId });
    }

    return householdId;
};

export async function fetchHouseholdDashboardData(uid: string) {
    const parentRef = doc(db, 'parents', uid);
    const parentDoc = await getDoc(parentRef);

    if (!parentDoc.exists()) {
        throw new Error('PARENT_NOT_FOUND');
    }

    const parent = parentDoc.data();
    const firstName = parent?.firstName ?? 'Forelder';
    const avatar = typeof parent?.avatar === 'string' && parent.avatar.trim().length > 0 ? parent.avatar : '👤';
    const householdId = parent?.householdId;

    if (!householdId) {
        throw new Error('HOUSEHOLD_MISSING');
    }

    const householdRef = doc(db, 'households', householdId);
    const householdDoc = await getDoc(householdRef);

    if (!householdDoc.exists()) {
        await updateDoc(parentRef, { householdId: null });
        throw new Error('HOUSEHOLD_NOT_FOUND');
    }

    const householdName = householdDoc.data()?.name ?? 'Husstand';
    const children = await fetchChildrenByHousehold(householdId);

    return {
        avatar,
        firstName,
        householdId,
        householdName,
        children,
    };
}