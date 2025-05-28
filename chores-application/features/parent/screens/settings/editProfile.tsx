import { useEffect, useState } from 'react';
import ParentForm from '@/features/parent/forms/parent/ParentForm';
import { router } from 'expo-router';
import { fetchParentInfo, updateParent } from '@/features/parent/services/parent';

export default function EditParentScreen() {
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [parentId, setParentId] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await fetchParentInfo();
                setName(data.firstName);
                setSelectedAvatar(data.avatar);
                setParentId(data.parentId);
            } catch (err) {
                console.error('Kunne ikke hente forelder-info:', err);
            }
        };
        fetch();
    }, []);

    const handleUpdate = async () => {
        if (!parentId) return;
        try {
            await updateParent(parentId, {
                firstName: name,
                avatar: selectedAvatar,
            });
            router.replace('/(parent)/(tabs)/settings');
        } catch (error) {
            console.error('Kunne ikke oppdatere forelder:', error);
        }
    };


    return (
        <ParentForm
            title="Endre informasjon"
            firstName={name}
            avatar={selectedAvatar}
            setFirstName={setName}
            setAvatar={setSelectedAvatar}
            onSubmit={handleUpdate}
            onCancel={() => router.back()}
        />
    );
}
