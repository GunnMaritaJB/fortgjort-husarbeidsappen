// features/parent/screens/profile/childProfileScreen.tsx
import { useEffect, useState } from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {View, Text} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { childProfileStyles as styles } from '@/features/parent/styles/childProfileStyles';
import ChildProfileActions from '@/features/parent/components/ChildProfileActions';
import {deleteChild} from "@/features/parent/services/child";
import ConfirmDeleteModal from "@/features/modals/ConfirmDeleteModal";
import { collections } from '@/shared/paths/firebasePaths';
export default function ChildProfileScreen() {


    const { id, name, avatar, householdId } = useLocalSearchParams();
    const [points, setPoints] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [dob, setDob] = useState<Date | null>(null);


    useEffect(() => {
        if (
            !id ||
            typeof id !== 'string' ||
            !householdId ||
            typeof householdId !== 'string'
        ) return;

        const fetchChildData = async () => {
            const childRef = doc(db, collections.childDocPath(householdId, id));
            const childSnap = await getDoc(childRef);

            if (childSnap.exists()) {
                const data = childSnap.data();
                setPoints(data.points ?? 0);
                setDob(new Date(data.dob));
            }
        };

        fetchChildData();
    }, [id, householdId]);




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
                    onEdit={() => {
                        if (!dob) return;

                        router.push({
                            pathname: '/(parent)/edit-child',
                            params: {
                                id: id as string,
                                householdId: householdId as string,
                                firstName: name as string,
                                avatar: avatar as string,
                                dob: dob.toISOString(),
                                points: points?.toString() ?? '0',
                            },
                        });
                    }}


                    onDelete={() => setShowConfirmModal(true)}
                />
            </View>
            <ConfirmDeleteModal
                visible={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={async () => {
                    if (!id || typeof id !== 'string') return;

                    try {
                        await deleteChild(householdId as string, id);
                        setShowConfirmModal(false);
                        router.replace('/(parent)/(tabs)/profile');
                    } catch (error) {
                        console.error("Kunne ikke slette barn");
                    }
                }}
            />
        </View>
    );

}
