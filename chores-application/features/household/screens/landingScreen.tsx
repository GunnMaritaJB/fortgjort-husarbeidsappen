import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { landingStyles as styles } from '../styles/landingStyles';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        //onPress={() => router.push('/create-household')}
      >
        <Text style={styles.buttonText}>Legg til husstand 🏡</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        //onPress={() => router.push('/join-household')}
      >
        <Text style={styles.buttonText}>Bli med i husstand 👨‍👩‍👧‍👦</Text>
      </TouchableOpacity>
    </View>
  );
}
