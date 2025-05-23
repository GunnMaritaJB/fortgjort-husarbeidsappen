import {getAuth} from "firebase/auth";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";
import {Parent} from "@/features/parent/models/Parent";

export const fetchParentInfo = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Ikke logget inn');

    const parentId = user.uid;

    const parentRef = doc(db, 'parents', parentId);
    const parentSnap = await getDoc(parentRef);

    if (!parentSnap.exists()) {
        throw new Error('Forelder finnes ikke i Firestore');
    }

    const parentData = parentSnap.data();

    if (!parentData?.householdId) {
        throw new Error('Fant ikke householdId i foreldredokumentet');
    }

    return {
        parentId,
        firstName: parentData.firstName,
        householdId: parentData.householdId,
        avatar: parentData.avatar ?? '👤',
    };
};

export const getParentHouseholdId = async (): Promise<string> => {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Bruker ikke logget inn');

    const parentRef = doc(db, 'parents', user.uid);
    const parentSnap = await getDoc(parentRef);
    const householdId = parentSnap.data()?.householdId;

    if (!householdId) throw new Error('Fant ikke householdId');

    return householdId;
};

export async function updateParent(id: string, data: Partial<Parent>) {
    const ref = doc(db, 'parents', id);
    await updateDoc(ref, data);
}
