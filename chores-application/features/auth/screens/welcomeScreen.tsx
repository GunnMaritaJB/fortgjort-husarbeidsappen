import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { welcomeStyles as styles } from '@/features/auth/styles/welcomeStyles';

export default function WelcomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect to household screen if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(household)');
      }
      else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til FortGjort 🧹</Text>

      <TouchableOpacity 
      style={styles.grayButton} 
      onPress={() => router.push('/(auth)/login')}
      testID="logInUserName">
        <Text style={styles.grayButtonText}>Logg inn med brukernavn og passord</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueButton} onPress={() => {}}>
        <Text style={styles.blueButtonText}>Logg inn med Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}
