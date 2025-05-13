import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { logoutUser } from '@/features/auth/services/logoutService';
import { menuStyles } from '@/features/household/styles/menubar';
import { Feather } from '@expo/vector-icons';
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
        <View style={menuStyles.drawer}>
            <View style={{ height: 120 }} />
            <TouchableOpacity onPress={handleLogout} style={menuStyles.logoutButton}>
                <View style={menuStyles.iconWithText}>
                    <Feather name="log-out" size={20} color="#333" style={menuStyles.flippedIcon}/>
                    <Text style={menuStyles.logoutText}testID="logOutUser">Logg ut</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
