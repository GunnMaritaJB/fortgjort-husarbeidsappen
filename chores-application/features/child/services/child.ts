// features/parent/services/childService.ts
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import {Child} from "@/features/child/models/Child";
import { collections } from '@/shared/paths/firebasePaths';


export const createChild = async (data: { firstName: string; dob: string; avatar: string; householdId: any }) => {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Ikke logget inn');
    const parentRef = doc(db, 'parents', user.uid);
    const parentSnap = await getDoc(parentRef);
    const householdId = parentSnap.data()?.householdId;
    if (!householdId) throw new Error('Fant ikke householdId');

    await addDoc(
        collection(db, collections.childrenByHousehold(householdId)),
        {
            ...data,
            points: 0,
        }
    );
}

    export const fetchChildrenByHousehold = async (householdId: string): Promise<Child[]> => {
        const childrenQuery = collection(db, collections.childrenByHousehold(householdId));

        const childrenSnap = await getDocs(childrenQuery);
        return childrenSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Child[];
    };

export async function deleteChild(householdId: string, childId: string) {
    const childRef = doc(db, `households/${householdId}/children/${childId}`);

    await deleteDoc(childRef);
}

export const updateChild = async (
    householdId: string,
    childId: string,
    updatedData: {
        firstName: string;
        dob: string;
        avatar: string;
        points: number;
    }
) => {
    const childRef = doc(db, collections.childDocPath(householdId, childId));
    await updateDoc(childRef, updatedData);
};

export const getChildById = async (householdId: string, childId: string): Promise<Child> => {
    const childRef = doc(db, collections.childDocPath(householdId, childId));
    const snap = await getDoc(childRef);
    if (!snap.exists()) {
        throw new Error('Barn ikke funnet');
    }

    return {
        id: childId,
        ...snap.data(),
    } as Child;
};

export const fetchChildData = async (householdId: string, childId: string): Promise<Child> => {
    const ref = doc(db, `households/${householdId}/children/${childId}`);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        throw new Error('Barn ikke funnet');
    }
    return {
        id: childId,
        ...snap.data(),
    } as Child;
};