import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { registerStyles as styles } from '../styles/registerStyles';

type Props = {
  firstName: string;
  email: string;
  password: string;
  repeatPassword: string;
  setFirstName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function RegisterForm({
  firstName,
  email,
  password,
  repeatPassword,
  setFirstName,
  setEmail,
  setPassword,
  setRepeatPassword,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <>
      <TextInput
        placeholder="Fornavn"
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        testID="nameInput"
      />
      <TextInput
        placeholder="Epost"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        testID="registerEmail"
      />
      <TextInput
        placeholder="Passord"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        testID="password_input"
      />
      <TextInput
        placeholder="Gjenta passord"
        style={styles.input}
        secureTextEntry
        onChangeText={setRepeatPassword}
        value={repeatPassword}
        testID="repeat_password_input"
      />

    <View style={styles.buttonRow}>
        <TouchableOpacity 
        style={styles.grayButton} 
        onPress={onSubmit}
        testID="registerBtn">
            <Text style={styles.buttonText}>Fullfør</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.grayButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Avbryt</Text>
        </TouchableOpacity>
    </View>

    </>
  );
}
