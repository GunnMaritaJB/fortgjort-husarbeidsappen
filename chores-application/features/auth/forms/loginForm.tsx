import { TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { loginStyles as styles } from '../styles/loginStyles';
import { router } from 'expo-router';
import { handleForgotPassword } from '../services/forgottenPassword';


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
        testID="emailInput"
      />
      <TextInput
        placeholder="Passord"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        testID="password_input"
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Logg inn</Text>
      </TouchableOpacity>


        <View style={styles.linksRow}>
            <TouchableOpacity onPress={() => handleForgotPassword(email)}>
                <Text style={styles.link}>Glemt passord</Text>
            </TouchableOpacity>
        <TouchableOpacity
        onPress={() => router.push('/register')}
        testID="registerBtn">
          <Text style={styles.link}>Registrer deg</Text>
        </TouchableOpacity>
        </View>
      
    </>

    
  );
}
