import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '@/features/auth/services/authService';
import { registerStyles as styles } from '../styles/registerStyles';
import { handleRegisterUser } from '@/features/auth/services/registerService';


import BackButton from '../components/backButton';
import RegisterForm from '../forms/registerForm';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = () =>
    handleRegisterUser(email, password, repeatPassword, firstName, () => {
      router.replace('/confirm-email');
    });

  const onCancel = () => router.replace('/');

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>FortGjort</Text>

      <RegisterForm
        firstName={firstName}
        email={email}
        password={password}
        repeatPassword={repeatPassword}
        setFirstName={setFirstName}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        onSubmit={handleRegister}
        onCancel={onCancel}
      />
    </View>
  );
}
