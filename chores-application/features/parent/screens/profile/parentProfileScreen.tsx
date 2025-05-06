import { getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';


export default function ParentProfileScreen() {
    const [parentName, setParentName] = useState('Forelder');
    const router = useRouter();

    useEffect(() => {
        const fetchParentName = async () => {
            const user = getAuth().currentUser;
            if (!user) return;

            try {
                const parentRef = doc(db, 'parents', user.uid);
                const parentDoc = await getDoc(parentRef);
                const parent = parentDoc.data();
                setParentName(parent?.firstName ?? 'Forelder');
            } catch (error) {
                console.error('Feil ved henting av forelderdata:', error);
            }
        };

        fetchParentName();
    }, []);


    const handleLogout = async () => {
        router.replace('/(household)/home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarCircle}>
                <Text style={styles.avatar}>👩‍🦰</Text>
            </View>
            <Text style={styles.name} testID="parentName">{parentName}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logg ut</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9f6f5' },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#d6d6d6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: { fontSize: 48 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
    logoutButton: {
        backgroundColor: '#bcbcbc',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
    },
    logoutText: {
        fontSize: 16,
        color: '#000',
    },
});
