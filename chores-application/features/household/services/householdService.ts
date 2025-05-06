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

/**
 * Oppretter en husstand og kobler den til parent-dokumentet, hvis ikke allerede gjort.
 */
export const createHousehold = async (
    name: string,
    uid: string
): Promise<string> => {
    // 1. Sjekk om parent allerede har householdId
    const parentRef = doc(db, 'parents', uid);
    const snapshot = await getDoc(parentRef);
    const parentData = snapshot.data();

    if (parentData?.householdId) {
        console.log('🚫 Brukeren har allerede en household – returnerer eksisterende householdId');
        return parentData.householdId;
    }

    // 2. Opprett husstand
    const docRef = await addDoc(collection(db, 'households'), {
        name,
        ownerId: uid,
        createdAt: serverTimestamp(),
    });

    const householdId = docRef.id;

    // 3. Oppdater eller opprett parent-dokument med householdId
    if (snapshot.exists()) {
        await updateDoc(parentRef, { householdId });
    } else {
        await setDoc(parentRef, { householdId });
    }

    return householdId;
};
