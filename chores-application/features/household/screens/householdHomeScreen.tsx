import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { householdHomeStyles as styles } from '../styles/householdHomeStyles';
import { Child } from "@/features/child/models/Child";
import MenuDrawer from '@/features/household/components/MenuDrawer';
import { menuStyles } from '@/features/household/styles/menubar';
import { useChild } from '@/shared/contexts/ChildContext';
import ParentPinModal from '@/features/parent/components/ParentPinModal';
import { useAuth } from '@/shared/contexts/AuthContext';
import { fetchHouseholdDashboardData } from '@/features/household/services/householdService';
import {fetchParentHasPin} from "@/features/parent/services/parentPinService";

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
                const {
                    avatar,
                    firstName,
                    householdId,
                    householdName,
                    children,
                } = await fetchHouseholdDashboardData(uid);

                setAvatar(avatar);
                setParentName(firstName);
                setHouseholdId(householdId);
                setHouseholdName(householdName);
                setChildren(children);
            } catch (error: any) {
                if (error.message === 'HOUSEHOLD_MISSING' || error.message === 'HOUSEHOLD_NOT_FOUND') {
                    router.replace('/(household)');
                } else {
                    console.error('Feil ved lasting:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleParentPress = async () => {
        const authUid = getAuth().currentUser?.uid;

        if (!authUid) return;

        try {
            const requiresPin = await fetchParentHasPin(authUid);

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
                        parentId={getAuth().currentUser?.uid ?? parentId}
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
