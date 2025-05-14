import { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Modal,} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import AvatarModal from '@/features/child/components/AvatarModal';
import { updateChild } from '@/features/child/services/child';
import {styles} from '../styles/homepagestyles';

export default function ChildHomeScreen() {
    const [childData, setChildData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [pickerVisible, setPickerVisible] = useState(false);
    const router = useRouter();
    const { id: childId, householdId } = useGlobalSearchParams();
    const [avatarState, setAvatarState] = useState<string>('😀');
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [showConfetti, setShowConfetti] = useState(false);

    const burst = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.4, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
    };

    useEffect(() => {
        const fetchChild = async () => {
            if (!childId || !householdId || typeof childId !== 'string' || typeof householdId !== 'string') {
                setLoading(false);
                return;
            }

            try {
                const childRef = doc(db, `households/${householdId}/children/${childId}`);
                const snap = await getDoc(childRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setChildData(data);
                    setAvatarState(data.avatar);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchChild();
    }, [childId]);

    if (loading || !childData) {
        return <Text style={{ textAlign: 'center', marginTop: 100 }}>Laster barn...</Text>;
    }

    const { firstName, points, goal } = childData;
    const goalTitle = goal?.title;
    const goalCost = goal?.cost || 0;
    const remaining = Math.max(0, goalCost - points);
    const progress = goalCost > 0 ? Math.min(points / goalCost, 1) : 0;

    return (
        <LinearGradient
            colors={['#FFF59D', '#A5D6A7', '#81D4FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                {showConfetti && (
                    <ConfettiCannon
                        count={80}
                        origin={{ x: 200, y: 0 }}
                        fadeOut={true}
                        fallSpeed={3000}
                        explosionSpeed={350}
                    />
                )}

                <AvatarModal
                    visible={pickerVisible}
                    selected={avatarState}
                    onClose={() => setPickerVisible(false)}
                    onSelect={async (avatar) => {
                        setAvatarState(avatar);
                        setPickerVisible(false);
                        if (
                            childId && householdId &&
                            typeof childId === 'string' &&
                            typeof householdId === 'string'
                        ) {
                            try {
                                await updateChild(householdId, childId, {
                                    firstName: childData.firstName,
                                    dob: childData.dob,
                                    avatar: avatar,
                                    points: childData.points,
                                });
                            } catch (error) {
                                console.error('Kunne ikke oppdatere barnet:', error);
                            }
                        }
                    }}
                />

                <View style={styles.topSection}>
                    <TouchableOpacity onPress={() => setPickerVisible(true)} activeOpacity={0.8}>
                        <View style={styles.avatarCircle}>
                            <Text testID={"AvatarBtn"} style={styles.avatar}>{avatarState}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.greeting}>Hei, {firstName}!</Text>
                </View>

                {/* Score */}
                <TouchableOpacity onPress={burst} activeOpacity={0.8}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <View style={styles.starburst}>
                            <Text style={styles.points}>{points}</Text>
                            <Text style={styles.pointsLabel}>POENG</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>


                {/* Goal Section */}
                <View style={styles.goalSection}>
                    {goalTitle ? (
                        <>
                            <Text style={styles.goalTitle}>{goalTitle.toUpperCase()}</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { flex: progress }]} />
                                <View style={{ flex: 1 - progress }} />
                            </View>
                            <Text style={styles.remaining}>DU MANGLER {remaining} ⭐</Text>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.setGoalButton}
                            onPress={() => router.push('/(child)/set-goal')}
                        >
                            <Text style={styles.setGoalText}>Sett deg et mål</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </LinearGradient>
    );
}
