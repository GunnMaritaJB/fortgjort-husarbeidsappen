import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';

export async function loginUser(email: string, password: string): Promise<string> {
  const result = await signInWithEmailAndPassword(auth, email, password);

  if(!result.user.emailVerified){
    router.replace('/(auth)/confirm-email');
  }

  return result.user.uid;
}
