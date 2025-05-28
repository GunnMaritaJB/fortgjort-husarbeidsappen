import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator,} from 'react-native';
import { useAuth } from '@/shared/contexts/AuthContext';
import {fetchParentHasPin, setPin, updatePin, removePin,verifyPin} from '@/features/parent/services/parentPinService';
import { styles } from '@/features/parent/styles/settings/parentPinScrnStyles';
import { useRouter } from 'expo-router';

export default function ParentPinScreen() {
    const [hasPin, setHasPin] = useState<boolean | null>(null);
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [localLoading, setLocalLoading] = useState(true);
    const { parentId, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!parentId) return;

        const load = async () => {
            try {
                const has = await fetchParentHasPin(parentId);
                setHasPin(has);
            } catch (err) {
                Alert.alert('Feil', 'Kunne ikke hente foreldredata.');
            } finally {
                setLocalLoading(false);
            }
        };

        load();
    }, [parentId]);

    const handleSetPin = async () => {
        if (newPin.length < 4) return Alert.alert('Feil', 'Minst 4 sifre.');
        if (newPin !== confirmPin)
            return Alert.alert('Feil', 'PIN-kodene samsvarer ikke.');

        try {
            await setPin(parentId!, newPin);
            setHasPin(true);
            setNewPin('');
            setConfirmPin('');
            Alert.alert('Suksess', 'PIN-kode er satt.');
            router.back();

        } catch (error) {
            Alert.alert('Feil', 'Kunne ikke sette PIN-kode.');
        }
        if (!/^\d{4}$/.test(newPin)) {
            return Alert.alert('Feil', 'PIN-koden må være nøyaktig 4 sifre.');
        }

    };

    const handleUpdatePin = async () => {
        if (newPin.length < 4) return Alert.alert('Feil', 'Minst 4 sifre.');
        if (newPin !== confirmPin)
            return Alert.alert('Feil', 'PIN-kodene samsvarer ikke.');

        try {
            await updatePin(parentId!, currentPin, newPin);
            setCurrentPin('');
            setNewPin('');
            setConfirmPin('');
            Alert.alert('Suksess', 'PIN-kode er oppdatert.');
            router.back();
        } catch (error: any) {
            console.error(error);
            Alert.alert('Feil', error.message || 'Kunne ikke oppdatere PIN-kode.');
        }
    };

    const handleRemovePin = async () => {
        try {
            await verifyPin(parentId!, currentPin); // Sjekk gammel PIN
            await removePin(parentId!);             // Fjern den

            setCurrentPin('');
            setHasPin(false);
            Alert.alert('Suksess', 'PIN-kode fjernet.');
            router.back();
        } catch (error: any) {
            if (__DEV__)
            Alert.alert('Feil', error.message === 'PIN-kode er feil.'
                ? 'Nåværende PIN-kode er ikke riktig.'
                : 'Kunne ikke fjerne PIN-kode.');

        }
    };

    if (loading || localLoading || parentId === null || hasPin === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Laster...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    {hasPin ? 'Oppdater eller fjern PIN-kode' : 'Sett en ny PIN-kode'}
                </Text>
                {!hasPin && (
                    <Text style={styles.helperText}>
                        Opprett en 4-sifret PIN for å beskytte foreldremodus.
                    </Text>
                )}
                {hasPin && (
                    <>
                    <Text style={styles.helperText}>
                        Du må bekrefte nåværende PIN før du kan fjerne den.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nåværende PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        maxLength={4}
                        value={currentPin}
                        onChangeText={setCurrentPin}
                    />
                    </>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Ny PIN"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={4}
                    value={newPin}
                    onChangeText={setNewPin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bekreft ny PIN"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={4}
                    value={confirmPin}
                    onChangeText={setConfirmPin}
                />

                {hasPin ? (
                    <>
                        <TouchableOpacity style={styles.button} onPress={handleUpdatePin}>
                            <Text style={styles.buttonText}>Oppdater PIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.removeButton,
                                currentPin.length !== 4 && { opacity: 0.5 },
                            ]}
                            onPress={handleRemovePin}
                            disabled={currentPin.length !== 4}
                        >
                            <Text style={styles.buttonText}>Fjern PIN</Text>
                        </TouchableOpacity>

                    </>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSetPin}>
                        <Text style={styles.buttonText}>Sett PIN</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>

    );
}
