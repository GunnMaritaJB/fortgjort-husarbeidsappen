import { Alert } from 'react-native';
import { registerUser } from './authService';

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
    await registerUser(email, password, firstName, '', '');
    onSuccess();
  } catch (e: any) {
    Alert.alert('Registrering feilet', e.message);
  }
};
