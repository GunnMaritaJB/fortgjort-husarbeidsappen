// features/parent/screens/profile/editChildScreen.tsx
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import CreateChildForm from '@/features/parent/forms/child/createChildForm';
import {updateChild} from "@/features/child/services/child";

export default function EditChildScreen() {
    const { id, householdId, firstName, avatar, dob, points } = useLocalSearchParams();
    const [name, setName] = useState(firstName as string);
    const [birthdate, setBirthdate] = useState(new Date(dob as string));
    const [selectedAvatar, setSelectedAvatar] = useState(avatar as string);
    const [score, setScore] = useState(Number(points));
    const [showPicker, setShowPicker] = useState(false);

    const handleUpdate = async () => {
        if (!id || typeof id !== 'string') return;

        await updateChild(householdId as string, id as string, {
            firstName: name,
            dob: birthdate.toISOString(),
            avatar: selectedAvatar,
            points: score,
        });

        router.replace('/(parent)/(tabs)/profile');
    };

    return (
        <CreateChildForm
            firstName={name}
            dob={birthdate}
            avatar={selectedAvatar}
            setFirstName={setName}
            setDob={setBirthdate}
            setAvatar={setSelectedAvatar}
            onSubmit={handleUpdate}
            onCancel={() => router.back()}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            points={score}
            setPoints={setScore}
            isEdit={true}
            title="Endre informasjon"

        />
    );
}
