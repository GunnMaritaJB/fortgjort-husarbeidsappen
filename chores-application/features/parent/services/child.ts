// features/parent/services/childService.ts
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import {collection, addDoc, doc, getDoc, query, getDocs, where} from 'firebase/firestore';
import {Child} from "@/features/child/models/Child";

export const createChild = async (data: { firstName: string; dob: string; avatar: string; householdId: any }) => {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Ikke logget inn');

    // hent householdId fra forelder
    const parentRef = doc(db, 'parents', user.uid);
    const parentSnap = await getDoc(parentRef);
    const householdId = parentSnap.data()?.householdId;
    if (!householdId) throw new Error('Fant ikke householdId');

    await addDoc(collection(db, 'children'), {
        ...data,
        householdId,
        points: 0,
    });
}

    export const fetchChildrenByHousehold = async (householdId: string): Promise<Child[]> => {
        const childrenQuery = query(
            collection(db, 'children'),
            where('householdId', '==', householdId)
        );

        const childrenSnap = await getDocs(childrenQuery);

        return childrenSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Child[];
    };