import { Alert } from 'react-native';
import { registerUser } from './authService';
import { auth } from '@/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';

export const handleRegisterUser = async (
  email: string,
  password: string,
  repeatPassword: string,
  firstName: string,
  onSuccess: () => void
) => {
  if (password !== repeatPassword) {
    Alert.alert('Passordene er ikke like');
    return;
  }

  try {
    await registerUser(email, password, firstName, '', '👤');

    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }

    onSuccess();
  } catch (e: any) {
    Alert.alert('Registrering feilet', e.message);
  }
};
