import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getHouseholdIdForUser } from '@/features/auth/services/authService';
import { router } from 'expo-router';
import { landingStyles as styles } from '../styles/landingStyles';

export default function LandingScreen() {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkHousehold = async () => {
        const user = getAuth().currentUser;
        if (!user) return;
  
        const householdId = await getHouseholdIdForUser(user.uid);
        if (householdId) {
          router.replace('/(household)/home');
        }
        else {
          setIsLoading(false);
        }
      };
  
      checkHousehold();
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/create_household')}
      >
        <Text style={styles.buttonText}>Legg til husstand</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Bli med i husstand</Text>
      </TouchableOpacity>
    </View>
  );
}
