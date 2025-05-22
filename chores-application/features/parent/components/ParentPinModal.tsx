import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { verifyParentPin } from '@/features/parent/services/verifyParentService';

interface Props {
    visible: boolean;
    parentId: string | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ParentPinModal({ visible, parentId, onSuccess, onCancel }: Props) {
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);

        if (!parentId) {
            Alert.alert('Feil', 'Fant ikke forelder-ID');
            setLoading(false);
            return;
        }

        try {
            const ok = await verifyParentPin(parentId, pin);
            if (ok) {
                setPin('');
                onSuccess();
            } else {
                Alert.alert('Feil', 'PIN-koden er feil');
            }
        } catch (error: any) {
            Alert.alert('Feil', error.message || 'Kunne ikke verifisere PIN-kode');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Foreldre-PIN</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Skriv inn PIN"
                        keyboardType="numeric"
                        secureTextEntry
                        value={pin}
                        onChangeText={setPin}
                        editable={!loading}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
                            <Text style={styles.buttonText}>Avbryt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirm]} onPress={handleVerify}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancel: {
        backgroundColor: '#ccc',
    },
    confirm: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
