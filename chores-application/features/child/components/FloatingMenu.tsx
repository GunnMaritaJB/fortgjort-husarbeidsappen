import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import CurvedMenuBackground from '@/features/child/components/CurvedMenuBackground';
import { styles } from '../styles/menustyles';
import { useChild } from '@/shared/contexts/ChildContext';


type FloatingMenuProps = {
    householdId: string;
    childId: string;
};
export default function FloatingMenu({}: FloatingMenuProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();
    const starScale = useRef(new Animated.Value(1)).current;
    const { childId } = useChild();




    useEffect(() => {
        if (menuVisible) {
            Animated.sequence([
                Animated.spring(starScale, {
                    toValue: 1.2,
                    stiffness: 300,
                    damping: 20,
                    mass: 1,
                    useNativeDriver: true,
                }),
                Animated.spring(starScale, {
                    toValue: 1,
                    stiffness: 300,
                    damping: 25,
                    mass: 1,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [menuVisible]);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const spinValue = useRef(new Animated.Value(0)).current;

    const playStarSpin = (callback?: () => void) => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start(() => {
            if (callback) callback();
        });
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const MenuItem = ({ title, icon, backgroundColor, onPress }: any) => {
        return (
            <TouchableOpacity style={[styles.menuItem, { backgroundColor }]} onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons testID="starMenuButton" name={icon} size={24} color="#4D4421" />
                    <Text style={styles.menuText}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={StyleSheet.absoluteFill}>
            {menuVisible && (
                <>
                    <CurvedMenuBackground />
                    <View style={styles.menuContainer}>
                        <MenuItem
                            title="Hjem"
                            icon="home"
                            backgroundColor="#FFF59D"
                            onPress={() => {
                                setMenuVisible(false);
                                playStarSpin(() => {
                                    router.push('/(child)/(tabs)/home');
                                });
                            }}
                        />

                        <MenuItem
                            title="Oppgaver"
                            icon="checkmark-done"
                            backgroundColor="#81D4FA"
                            onPress={() => {
                                setMenuVisible(false);
                                playStarSpin(() => {
                                    router.push('/(child)/(tabs)/tasks');
                                });
                            }}
                        />

                        <MenuItem
                            title="Belønninger"
                            icon="gift"
                            backgroundColor="#A5D6A7"
                            onPress={() => {
                                setMenuVisible(false);
                                playStarSpin(() => {
                                    if (!childId) {
                                        console.warn('childId mangler – kan ikke åpne belønninger');
                                        return;
                                    }
                                    router.push({
                                        pathname: '/(child)/(tabs)/rewards',
                                        params: {
                                            id: childId,
                                        },
                                    });

                                });
                            }}
                        />
                        <MenuItem
                            testID="logoutChildButton"
                            title="Logg ut"
                            icon="log-out"
                            backgroundColor="#FF8A65"
                            onPress={() => {
                                setMenuVisible(false);
                                playStarSpin(() => {
                                    router.replace('/(household)/home');
                                });
                            }}
                        />

                    </View>
                </>
            )}

            <Animated.View style={[styles.fabButtonContainer, { transform: [{ scale: starScale }] }]}>
                <TouchableOpacity testID={"starMenuButton"} accessible={true} style={styles.fabButton} onPress={toggleMenu}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Ionicons  name="star" size={40} color="#fff" />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}


