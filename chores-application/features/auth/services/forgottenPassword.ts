import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { Alert } from 'react-native';

export const handleForgotPassword = async (email: string) => {
    if (!email) {
        Alert.alert('Feil', 'Vennligst skriv inn e-postadressen din.');
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('Suksess', 'Sjekk e-posten din for å tilbakestille passordet.');
    } catch (error: any) {
        console.error(error);
        Alert.alert('Feil', error.message || 'Noe gikk galt.');
    }
};
