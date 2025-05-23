import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter,} from 'expo-router';
import {styles} from '@/features/parent/styles/settings/settingsHomeStyles'

export default function SettingsHome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1b5e20', marginBottom: 30 }}>
                Innstillinger
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(parent)/(tabs)/settings/parent-pin')}
            >
                <Text style={styles.buttonText}>Min foreldreprofil-PIN</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(parent)/(tabs)/settings/edit-profile')}
            >
                <Text style={styles.buttonText}>Endre profilinformasjon</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(parent)/(tabs)/settings/change-password')}
            >
                <Text style={styles.buttonText}>Endre passord</Text>
            </TouchableOpacity>
        </View>
    );
}

