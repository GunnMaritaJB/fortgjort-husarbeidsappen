import { doc, getDoc } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';
import { db } from '@/firebaseConfig';

export const verifyParentPin = async (parentId: string, enteredPin: string): Promise<boolean> => {
    const parentRef = doc(db, 'parents', parentId);
    const snap = await getDoc(parentRef);

    if (!snap.exists()) {
        throw new Error('Forelder finnes ikke');
    }

    const data = snap.data();
    if (!data.pinHash) {
        throw new Error('Forelder har ingen PIN satt');
    }

    const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        enteredPin
    );

    return hashed === data.pinHash;
};

export const hasParentPin = async (parentId: string): Promise<boolean> => {
    const parentRef = doc(db, 'parents', parentId);
    const snap = await getDoc(parentRef);

    if (!snap.exists()) {
        throw new Error('Forelder finnes ikke');
    }

    const data = snap.data();
    return !!data.pinHash;
};