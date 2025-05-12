import { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import {useRouter} from "expo-router";
import { householdHomeStyles as styles} from '../styles/householdHomeStyles';
import { fetchChildrenByHousehold } from '@/features/parent/services/child';
import {Child} from "@/features/child/models/Child";
import MenuDrawer from '@/features/household/components/MenuDrawer';
import { menuStyles } from '@/features/household/styles/menubar';



export default function HouseholdHomeScreen() {
    const [householdName, setHouseholdName] = useState<string | null>(null);
    const [parentName, setParentName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [children, setChildren] = useState<Child[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);

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
                    router.replace('/(household)');
                    return;
                }

                const householdRef = doc(db, 'households', householdId);
                const householdDoc = await getDoc(householdRef);
                const childrenData = await fetchChildrenByHousehold(householdId);
                setChildren(childrenData);

                if (!householdDoc.exists()) {
                    console.warn(' Husstand finnes ikke – rydder og sender til oppretting');
                    await updateDoc(parentRef, { householdId: null });
                    router.replace('/(household)');
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
        <View style={{ flex: 1, position: 'relative' }}>
            <TouchableOpacity
                style={menuStyles.hamburgerButton}
                onPress={() => setMenuVisible(!menuVisible)}
            >
                <Text style={{ fontSize: 28 }}>☰</Text>
            </TouchableOpacity>

            {menuVisible && (
                <>
                    <TouchableOpacity
                        style={menuStyles.overlay}
                        onPress={() => setMenuVisible(false)}
                    />
                    <MenuDrawer onClose={() => setMenuVisible(false)} />
                </>
            )}
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

                <View style={styles.avatarRow}>
                    {children.map((child) => (
                        <TouchableOpacity
                            key={child.id}
                            style={styles.avatarContainer}
                            onPress={() =>
                                router.push({
                                    pathname: '/(child)/(tabs)/home',
                                    params: {
                                        id: child.id,
                                        name: child.firstName,
                                        avatar: child.avatar,
                                    },
                                })
                            }
                        >
                            <View style={styles.avatarCircle}>
                                <Text style={styles.avatarEmoji}>{child.avatar}</Text>
                            </View>
                            <Text style={styles.avatarLabel}>{child.firstName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}
