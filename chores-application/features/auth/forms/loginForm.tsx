import { TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { loginStyles as styles } from '../styles/loginStyles';
import { router } from 'expo-router';

type Props = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
};

export default function LoginForm({ email, password, setEmail, setPassword, onLogin }: Props) {
  return (
    <>
      <TextInput
        placeholder="Epost"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Passord"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Logg inn</Text>
      </TouchableOpacity>


        <View style={styles.linksRow}>
        <TouchableOpacity onPress={() => Alert.alert('Kommer snart!')}>
          <Text style={styles.link}>Glemt passord</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Registrer deg</Text>
        </TouchableOpacity>
        </View>
      
    </>

    
  );
}
