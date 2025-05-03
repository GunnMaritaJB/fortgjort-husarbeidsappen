import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { welcomeStyles as styles } from '@/features/auth/styles/welcomeStyles';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Chores!🧹</Text>

      <TouchableOpacity style={styles.grayButton} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.grayButtonText}>Logg inn med brukernavn og passord</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueButton} onPress={() => {}}>
        <Text style={styles.blueButtonText}>Logg inn med Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}
