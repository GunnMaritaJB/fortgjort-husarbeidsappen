import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { logoutUser } from '@/features/auth/services/logoutService';
import { styles } from '@/features/household/styles/menubar';

export default function MenuDrawer({ onClose }: { onClose: () => void }) {
    const handleLogout = async () => {
        try {
            await logoutUser();
            router.replace('/(auth)/login');
        } catch (e) {
            console.error('Feil ved utlogging:', e);
        }
    };
    return (
        <View style={styles.drawer}>
            <View style={{ height: 120 }} />
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logg ut</Text>
            </TouchableOpacity>
        </View>
    );
}
