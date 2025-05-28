// src/features/parent/services/parentPinService.ts
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import * as Crypto from 'expo-crypto';

export const hashPin = async (pin: string) =>
    await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pin);

export const fetchParentHasPin = async (parentId: string): Promise<boolean> => {
    const ref = doc(db, 'parents', parentId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Forelder finnes ikke');
    return !!snap.data()?.pinHash;
};

export const setPin = async (parentId: string, pin: string) => {
    const hash = await hashPin(pin);
    await updateDoc(doc(db, 'parents', parentId), { pinHash: hash });
};

export const updatePin = async (
    parentId: string,
    currentPin: string,
    newPin: string
) => {
    const ref = doc(db, 'parents', parentId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Forelder finnes ikke');

    const currentHash = await hashPin(currentPin);
    if (currentHash !== snap.data()?.pinHash) {
        throw new Error('Nåværende PIN-kode er feil.');
    }

    const newHash = await hashPin(newPin);
    await updateDoc(ref, { pinHash: newHash });
};

export const removePin = async (parentId: string) => {
    await updateDoc(doc(db, 'parents', parentId), { pinHash: null });
};



export const verifyPin = async (parentId: string, pin: string) => {
    const ref = doc(db, 'parents', parentId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Forelder finnes ikke');

    const data = snap.data();
    if (!data?.pinHash) throw new Error('Forelder har ingen PIN satt');

    const hash = await hashPin(pin);
    if (hash !== data.pinHash) {
        throw new Error('PIN-kode er feil.');
    }
};

