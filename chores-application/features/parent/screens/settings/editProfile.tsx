import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import ParentForm from '@/features/parent/forms/parent/ParentForm';
import { router } from 'expo-router';

export default function EditParentScreen() {
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [parentId, setParentId] = useState<string | null>(null);

    useEffect(() => {
        const fetchParent = async () => {
            const user = getAuth().currentUser;
            if (!user) return;

            const ref = doc(db, 'parents', user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                const data = snap.data();
                setName(data.firstName || '');
                setSelectedAvatar(data.avatar || '');
                setParentId(user.uid);
            }
        };

        fetchParent();
    }, []);

    const handleUpdate = async () => {
        if (!parentId) return;

        await updateDoc(doc(db, 'parents', parentId), {
            firstName: name,
            avatar: selectedAvatar,
        });

        router.replace('/(parent)/(tabs)/settings');
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
