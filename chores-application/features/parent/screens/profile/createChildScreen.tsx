// features/parent/screens/children/createChildScreen.tsx
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import CreateChildForm from '@/features/parent/forms/child/createChildForm';
import { createChild } from '@/features/child/services/child';
import {getParentHouseholdId} from "@/features/parent/services/parent";
import BackButton from "@/features/auth/components/backButton";

export default function CreateChildScreen() {
    const [firstName, setFirstName] = useState('');
    const [dob, setDob] = useState<Date>(new Date());
    const [avatar, setAvatar] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!firstName.trim() || !dob || !avatar) {
            Alert.alert('Fyll ut alle felt');
            return;
        }
        try {
            const householdId = await getParentHouseholdId();
            await createChild({
                firstName,
                dob: dob.toISOString().split('T')[0],
                avatar,
                householdId,
            });
            router.replace('/(parent)/(tabs)/profile');
        } catch (err: any) {
            console.error(err);
            Alert.alert('Feil', err.message || 'Kunne ikke opprette barn');
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <CreateChildForm
                firstName={firstName}
                dob={dob}
                avatar={avatar}
                setFirstName={setFirstName}
                setDob={setDob}
                setAvatar={setAvatar}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
            />
        </View>
    );
}
