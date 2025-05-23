import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '@/firebaseConfig';
import { Snackbar } from 'react-native-paper';
import {router} from "expo-router";
import {styles} from "@/features/parent/styles/settings/EditPasswordStyle"
import { changeUserPassword } from '@/features/auth/services/changePasswordService';


export default function ChangePasswordScreen() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

    const showMessage = (msg: string) => {
        setSnackbar({ visible: true, message: msg });
    };

    const handleChangePassword = async () => {
        const user = auth.currentUser;

        if (!user) {
            showMessage('Ingen bruker er logget inn.');
            return;
        }

        if (newPassword.length < 6) {
            showMessage('Passordet må være minst 6 tegn.');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Passordene samsvarer ikke.');
            return;
        }

        try {
            await changeUserPassword(currentPassword, newPassword);

            showMessage('Passordet er endret!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                router.back();
            }, 1500);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/wrong-password') {
                showMessage('Nåværende passord er feil.');
            } else if (error.code === 'auth/too-many-requests') {
                showMessage('For mange forsøk. Prøv igjen senere.');
            } else {
                showMessage(error.message || 'Kunne ikke endre passord.');
            }
        }

    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Endre passord</Text>

            <TextInput
                placeholder="Nåværende passord"
                secureTextEntry
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />

            <TextInput
                placeholder="Nytt passord"
                secureTextEntry
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <TextInput
                placeholder="Bekreft nytt passord"
                secureTextEntry
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Lagre nytt passord</Text>
            </TouchableOpacity>

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
                duration={3000}
                action={{
                    label: 'OK',
                    onPress: () => setSnackbar({ ...snackbar, visible: false }),
                }}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    );
}

