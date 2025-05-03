import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getDoc, getFirestore} from 'firebase/firestore';
import {auth, db} from '@/firebaseConfig';
import {Parent} from '@/features/parent/models/Parent';

// Registrerer ny bruker og oppretter Parent-dokumentet i Firestore
export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  householdId: string,
  avatar: string
) 

{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const parent: Parent = {
        id: uid,
        firstName: firstName,
        householdId: householdId,
        avatar: avatar,
    }

    await setDoc(doc(db, 'parents', uid), parent);

    return uid;
}

// Henter householdId for en bruker basert på uid
export async function getHouseholdIdForUser(uid: string): Promise<string | null> {
  const userDocRef = doc(getFirestore(), 'parents', uid);
  const userDoc = await getDoc(userDocRef);

  return userDoc.exists() ? userDoc.data().householdId ?? null : null;
}