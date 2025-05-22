import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter,} from 'expo-router';

export default function SettingsHome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeee8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 20,
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});
