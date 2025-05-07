// features/parent/screens/profile/childProfileScreen.tsx
import { useEffect, useState } from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {View, Text, Alert} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { childProfileStyles as styles } from '@/features/parent/styles/childProfileStyles';
import ChildProfileActions from '@/features/parent/components/ChildProfileActions';
import {deleteChild} from "@/features/parent/services/child";
import ConfirmDeleteModal from "@/features/modals/ConfirmDeleteModal";
export default function ChildProfileScreen() {

    const { id, name, avatar } = useLocalSearchParams();
    const [points, setPoints] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    function handleDelete(childId: string) {
        Alert.alert(
            'Slett profil',
            'Er du sikker på at du vil slette denne barneprofilen?',
            [
                { text: 'Avbryt', style: 'cancel' },
                {
                    text: 'Slett',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteChild(childId);
                            router.replace('/(parent)/(tabs)/profile');
                        } catch (error) {
                            Alert.alert('Feil', 'Kunne ikke slette barnet.');
                        }
                    },
                },
            ]
        );
    }


    useEffect(() => {
        const fetchPoints = async () => {
            if (!id || typeof id !== 'string') return;

            const childRef = doc(db, 'children', id);
            const childSnap = await getDoc(childRef);

            if (childSnap.exists()) {
                const data = childSnap.data();
                setPoints(data.points ?? 0);
            }
        };

        fetchPoints();
    }, [id]);


    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.avatar}>{avatar}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.points}>Opptjente poeng: {points ?? 'Laster...'}</Text>
            </View>
            <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
                <ChildProfileActions
                    onShowRewards={() => {}}
                    onShowTasks={() => {}}
                    onEdit={() => {}}
                    onDelete={() => setShowConfirmModal(true)}
                />
            </View>
            <ConfirmDeleteModal
                visible={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={() => {
                    setShowConfirmModal(false);
                    handleDelete(id as string);
                }}
            />
        </View>
    );

}
