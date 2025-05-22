import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import * as Crypto from 'expo-crypto';
import { useAuth } from '@/shared/contexts/AuthContext';

export default function ParentPinScreen() {
    const [hasPin, setHasPin] = useState<boolean | null>(null);
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(true);

    const { parentId } = useAuth();

    useEffect(() => {
        if (!parentId) {
            console.warn('Mangler parentId fra context');
            return;
        }

        const fetchParentData = async () => {
            try {
                const parentRef = doc(db, 'parents', parentId);
                const parentSnap = await getDoc(parentRef);

                if (parentSnap.exists()) {
                    const data = parentSnap.data();
                    setHasPin(!!data.pinHash);
                } else {
                    console.warn('Forelder finnes ikke i Firestore');
                }
            } catch (error) {
                console.error('Error fetching parent data:', error);
                Alert.alert('Feil', 'Kunne ikke hente foreldredata.');
            } finally {
                setLoading(false);
            }
        };

        fetchParentData();
    }, [parentId]);

    const hashPin = async (pin: string): Promise<string> => {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            pin
        );
    };

    const handleSetPin = async () => {
        if (newPin.length < 4) {
            Alert.alert('Feil', 'PIN-koden må være minst 4 sifre.');
            return;
        }
        if (newPin !== confirmPin) {
            Alert.alert('Feil', 'PIN-kodene samsvarer ikke.');
            return;
        }
        try {
            const hash = await hashPin(newPin);
            // @ts-ignore
            const parentRef = doc(db, 'parents', parentId);
            await updateDoc(parentRef, { pinHash: hash });
            Alert.alert('Suksess', 'PIN-kode er satt.');
            setHasPin(true);
            setNewPin('');
            setConfirmPin('');
        } catch (error) {
            console.error('Error setting PIN:', error);
            Alert.alert('Feil', 'Kunne ikke sette PIN-kode.');
        }
    };

    const handleUpdatePin = async () => {
        if (newPin.length < 4) {
            Alert.alert('Feil', 'PIN-koden må være minst 4 sifre.');
            return;
        }
        try {
            // @ts-ignore
            const parentRef = doc(db, 'parents', parentId);
            const parentSnap = await getDoc(parentRef);
            if (parentSnap.exists()) {
                const data = parentSnap.data();
                const currentHash = await hashPin(currentPin);
                if (currentHash !== data.pinHash) {
                    Alert.alert('Feil', 'Nåværende PIN-kode er feil.');
                    return;
                }
                if (newPin !== confirmPin) {
                    Alert.alert('Feil', 'Nye PIN-kodene samsvarer ikke.');
                    return;
                }
                const newHash = await hashPin(newPin);
                await updateDoc(parentRef, { pinHash: newHash });
                Alert.alert('Suksess', 'PIN-kode er oppdatert.');
                setNewPin('');
                setConfirmPin('');
                setCurrentPin('');
            }
        } catch (error) {
            console.error('Error updating PIN:', error);
            Alert.alert('Feil', 'Kunne ikke oppdatere PIN-kode.');
        }
    };

    const handleRemovePin = async () => {
        try {
            // @ts-ignore
            const parentRef = doc(db, 'parents', parentId);
            await updateDoc(parentRef, { pinHash: null });
            Alert.alert('Suksess', 'PIN-kode er fjernet.');
            setHasPin(false);
            setCurrentPin('');
        } catch (error) {
            console.error('Error removing PIN:', error);
            Alert.alert('Feil', 'Kunne ikke fjerne PIN-kode.');
        }
    };

    if (loading || hasPin === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Laster...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {hasPin ? (
                <>
                    <Text style={styles.title}>Oppdater eller fjern PIN-kode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nåværende PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        value={currentPin}
                        onChangeText={setCurrentPin}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ny PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        value={newPin}
                        onChangeText={setNewPin}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bekreft ny PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        value={confirmPin}
                        onChangeText={setConfirmPin}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdatePin}>
                        <Text style={styles.buttonText}>Oppdater PIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemovePin}>
                        <Text style={styles.buttonText}>Fjern PIN</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>Sett en ny PIN-kode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ny PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        value={newPin}
                        onChangeText={setNewPin}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bekreft ny PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        value={confirmPin}
                        onChangeText={setConfirmPin}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSetPin}>
                        <Text style={styles.buttonText}>Sett PIN</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    removeButton: {
        backgroundColor: '#f44336',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
