import { View, Text, TouchableOpacity } from 'react-native';
import { confirmEmailStyles as styles } from '../styles/confirmEmailStyles';
import { router } from 'expo-router';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { useCallback } from 'react';

export default function ConfirmEmailScreen() {

    const onVerified = useCallback(() => {
    router.replace('/(household)');
  }, []);


  const { cooldown, secondsLeft, resendVerification } = useEmailVerification(onVerified);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bekreft e-post</Text>
      <Text style={styles.message}>
        Gjennomfør verifiseringen som er sendt til din epost for å få tilgang til appen
      </Text>

      <TouchableOpacity
        style={[styles.button, cooldown && { backgroundColor: '#aaa' }]}
        onPress={resendVerification}
        disabled={cooldown}
      >
        <Text style={styles.buttonText}>
          {cooldown ? `Vent ${secondsLeft}s...` : 'Send linken på nytt'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Avbryt</Text>
      </TouchableOpacity>
    </View>
  );
}
