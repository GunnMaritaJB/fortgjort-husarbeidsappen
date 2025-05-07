import {getAuth} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";

export const fetchParentInfo = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Ikke logget inn');

    const parentRef = doc(db, 'parents', user.uid);
    const parentSnap = await getDoc(parentRef);
    const parentData = parentSnap.data();

    if (!parentData?.householdId) throw new Error('Fant ikke householdId');

    return {
        firstName: parentData.firstName,
        householdId: parentData.householdId,
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