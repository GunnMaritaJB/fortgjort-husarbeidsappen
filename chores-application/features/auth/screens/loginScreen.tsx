import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { loginStyles as styles } from '../styles/loginStyles';
import { getHouseholdIdForUser } from '@/features/auth/services/authService';
import { auth } from '@/firebaseConfig';

import BackButton from '../components/backButton';
import LoginForm from '../forms/loginForm';
import { loginUser } from '../services/loginService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const uid = await loginUser(email, password); 

      await auth.currentUser?.reload(); // Reload user to ensure we have the latest data
      if(!auth.currentUser?.emailVerified) {
        router.replace('/(auth)/confirm-email'); // Redirect to email confirmation if not verified
        return;
      }

      // Check if the user is part of a household
      const householdId = await getHouseholdIdForUser(uid); 
  
      if (householdId) {
        router.replace('/(household)/home'); 
      } else {
        router.replace('/(household)');
      }
  
    } catch (e: any) {
      Alert.alert('Feil ved innlogging', e.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>TITTEL</Text>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
    </View>
  );
}
