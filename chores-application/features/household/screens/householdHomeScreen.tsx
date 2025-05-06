import { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import {useRouter} from "expo-router";
import { householdHomeStyles as styles} from '../styles/householdHomeStyles';


export default function HouseholdHomeScreen() {
    const [householdName, setHouseholdName] = useState<string | null>(null);
    const [parentName, setParentName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const user = getAuth().currentUser;
            const uid = user?.uid;
            if (!uid) return;

            try {
                const parentRef = doc(db, 'parents', uid);
                const parentDoc = await getDoc(parentRef);
                const parent = parentDoc.data();

                setParentName(parent?.firstName ?? 'Forelder');

                const householdId = parent?.householdId;
                if (!householdId) {
                    console.log('Ingen householdId – sender til opprettelse');
                    router.replace('/(household)'); // 👈 SEND TIL OPPRETT HUSSTAND
                    return;
                }

                const householdRef = doc(db, 'households', householdId);
                const householdDoc = await getDoc(householdRef);

                if (!householdDoc.exists()) {
                    console.warn('❌ Husstand finnes ikke – rydder og sender til oppretting');
                    await updateDoc(parentRef, { householdId: null });
                    router.replace('/(household)'); // 👈 SEND TIL OPPRETT HUSSTAND
                    return;
                }

                const household = householdDoc.data();
                setHouseholdName(household?.name ?? 'Husstand');
            } catch (error) {
                console.error('Feil ved lasting:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.householdName}>{householdName ?? 'Husstand'}</Text>

            <View style={styles.avatarGrid}>
                <TouchableOpacity
                    testID="parentUser"
                    style={styles.avatarContainer}
                    onPress={() => router.push('/(parent)/(tabs)/profile')}
                >
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarEmoji}>👩‍🦰</Text>
                    </View>
                    <Text style={styles.avatarLabel}>{parentName}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

}

