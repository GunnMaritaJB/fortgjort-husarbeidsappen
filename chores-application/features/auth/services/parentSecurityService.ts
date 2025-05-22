import { doc, getDoc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { db } from '@/firebaseConfig';

export const hasParentPin = async (parentId: string): Promise<boolean> => {
    const snap = await getDoc(doc(db, `parents/${parentId}`));
    return !!snap.data()?.pinHash;
};

export const setParentPin = async (parentId: string, pin: string) => {
    const hash = await bcrypt.hash(pin, 10);
    await updateDoc(doc(db, `parents/${parentId}`), { pinHash: hash });
};

export const removeParentPin = async (parentId: string) => {
    await updateDoc(doc(db, `parents/${parentId}`), { pinHash: null });
};

export const validateParentPin = async (parentId: string, inputPin: string): Promise<boolean> => {
    const snap = await getDoc(doc(db, `parents/${parentId}`));
    const hash = snap.data()?.pinHash;
    if (!hash) return false;

    return bcrypt.compare(inputPin, hash);
};
