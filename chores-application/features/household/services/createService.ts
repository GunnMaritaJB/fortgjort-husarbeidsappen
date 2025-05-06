import { Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { createHousehold } from './householdService';

/**
 * Håndterer opprettelse av husstand fra UI.
 */
export const handleCreateHousehold = async (
    householdName: string,
    onSuccess: () => void
) => {
    if (!householdName.trim()) {
        Alert.alert('Feil', 'Husstandsnavn må fylles ut.');
        return;
    }

    const user = getAuth().currentUser;
    const uid = user?.uid;

    if (!uid) {
        Alert.alert('Feil', 'Brukeren er ikke logget inn.');
        return;
    }

    try {
        await createHousehold(householdName, uid);
        onSuccess();
    } catch (error: any) {
        console.error('Feil ved opprettelse av husstand:', error);
        Alert.alert('Noe gikk galt', 'Kunne ikke opprette husstanden.');
    }
};
