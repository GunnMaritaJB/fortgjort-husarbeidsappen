import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { loginStyles as styles } from '../styles/loginStyles';
import { getHouseholdIdForUser } from '@/features/auth/services/authService';

import BackButton from '../components/backButton';
import LoginForm from '../forms/loginForm';
import { loginUser } from '../services/loginService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const uid = await loginUser(email, password); 
      const householdId = await getHouseholdIdForUser(uid); 
  
      if (householdId) {
        console.log('✅ Har husstand:', householdId);
        router.replace('/(household)/home'); // placeholder for household home screen
      } else {
        router.replace('/(household)'); // placeholder for household setup screen
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
