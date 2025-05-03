import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}
