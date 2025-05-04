import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ConfirmEmailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bekreft e-post</Text>
      <Text style={styles.message}>
        Gjennomfør verifiseringen som er sendt til din epost for å få tilgang til appen
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => {/* logikk for resend e-post */}}>
        <Text style={styles.buttonText}>Send linken på nytt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Avbryt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f2fefc' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  message: { textAlign: 'center', fontSize: 16, marginBottom: 30 },
  button: {
    backgroundColor: '#2e81f4',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
