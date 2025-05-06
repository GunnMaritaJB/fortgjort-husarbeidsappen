import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { sharedHouseholdStyles as styles } from '../styles/sharedHouseholdStyles';
import { handleCreateHousehold } from '../services/createService';


import BackButton from '@/features/auth/components/backButton'; // gjenbruk
import CreateHouseholdForm from '../forms/createHouseholdForm';

export default function CreateHouseholdScreen() {
    const [householdName, setHouseholdName] = useState('');

    const handleCreate = () =>
        handleCreateHousehold(householdName, () => {
            router.replace('/(household)/home');
            // Naviger dit du vil etter opprettelse
        });

    const handleCancel = () => router.back();

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Opprett husstand</Text>

            <CreateHouseholdForm
                householdName={householdName}
                setHouseholdName={setHouseholdName}
                onSubmit={handleCreate}
                onCancel={handleCancel}
            />
        </View>
    );
}
