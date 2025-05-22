import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { householdHomeStyles as styles } from '../styles/householdHomeStyles';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import { Child } from "@/features/child/models/Child";
import MenuDrawer from '@/features/household/components/MenuDrawer';
import { menuStyles } from '@/features/household/styles/menubar';
import { useChild } from '@/shared/contexts/ChildContext';
import ParentPinModal from '@/features/parent/components/ParentPinModal';
import { useAuth } from '@/shared/contexts/AuthContext';
import { hasParentPin } from '@/features/parent/services/verifyParentService';

export default function HouseholdHomeScreen() {
    const [householdName, setHouseholdName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [children, setChildren] = useState<Child[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [householdId, setHouseholdId] = useState<string | null>(null);
    const router = useRouter();
    const [parentName, setParentName] = useState('Forelder');
    const [avatar, setAvatar] = useState('👤');
    const { setChild } = useChild();
    const { parentId } = useAuth();
    const [showPinModal, setShowPinModal] = useState(false);

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
                setAvatar(typeof parent?.avatar === 'string' && parent.avatar.trim().length > 0 ? parent.avatar : '👤');

                const householdId = parent?.householdId;
                if (!householdId) {
                    router.replace('/(household)');
                    return;
                }

                setHouseholdId(householdId);

                const householdRef = doc(db, 'households', householdId);
                const householdDoc = await getDoc(householdRef);
                const childrenData = await fetchChildrenByHousehold(householdId);
                setChildren(childrenData);

                if (!householdDoc.exists()) {
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

    const handleParentPress = async () => {
        if (!parentId) return;

        try {
            const requiresPin = await hasParentPin(parentId);
            if (requiresPin) {
                setShowPinModal(true);
            } else {
                router.push('/(parent)/(tabs)/profile');
            }
        } catch (error: any) {
            Alert.alert('Feil', error.message || 'Kunne ikke hente PIN-status');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <TouchableOpacity
                style={menuStyles.hamburgerButton}
                testID="hamburgerButton"
                onPress={() => setMenuVisible(!menuVisible)}
            >
                <Text style={{ fontSize: 28 }}>☰</Text>
            </TouchableOpacity>

            {menuVisible && (
                <>
                    <TouchableOpacity style={menuStyles.overlay} onPress={() => setMenuVisible(false)} />
                    <MenuDrawer onClose={() => setMenuVisible(false)} />
                </>
            )}

            <View style={styles.container}>
                <Text style={styles.householdName}>{householdName ?? 'Husstand'}</Text>

                <View style={styles.avatarGrid}>
                    <TouchableOpacity
                        testID="parentUser"
                        style={styles.avatarContainer}
                        onPress={handleParentPress}
                    >
                        <View style={styles.avatarCircle}>
                            <Text testID="parentNameLabel" style={styles.avatarEmoji}>{avatar}</Text>
                        </View>
                        <Text style={styles.avatarLabel}>{parentName}</Text>
                    </TouchableOpacity>

                    <ParentPinModal
                        visible={showPinModal}
                        parentId={parentId}
                        onCancel={() => setShowPinModal(false)}
                        onSuccess={() => {
                            setShowPinModal(false);
                            router.push('/(parent)/(tabs)/profile');
                        }}
                    />
                </View>

                <View style={styles.avatarRow}>
                    {children.map((child) => (
                        <TouchableOpacity
                            key={child.id}
                            style={styles.avatarContainer}
                            onPress={() => {
                                setChild(child.id, child.householdId);
                                router.push({
                                    pathname: '/(child)/(tabs)/home',
                                    params: {
                                        id: child.id,
                                        name: child.firstName,
                                        avatar: child.avatar,
                                        householdId: householdId,
                                    },
                                });
                            }}
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
