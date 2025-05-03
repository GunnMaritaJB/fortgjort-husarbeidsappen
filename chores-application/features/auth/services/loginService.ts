import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export async function loginUser(email: string, password: string): Promise<string> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user.uid;
}
