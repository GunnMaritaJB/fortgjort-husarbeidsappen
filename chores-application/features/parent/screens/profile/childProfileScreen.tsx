// features/parent/screens/profile/childProfileScreen.tsx
import { useEffect, useState } from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {View, Text} from 'react-native';
import { childProfileStyles as styles } from '@/features/parent/styles/profile/childProfileStyles';
import ChildProfileActions from '@/features/parent/components/ChildProfileActions';
import {deleteChild} from "@/features/child/services/child";
import ConfirmDeleteModal from "@/features/modals/ConfirmDeleteModal";
import { getChildById } from '@/features/child/services/child';
export default function ChildProfileScreen() {


    const { id, name, avatar, householdId } = useLocalSearchParams();
    const [points, setPoints] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [dob, setDob] = useState<Date | null>(null);


    useEffect(() => {
        if (!id || !householdId || typeof id !== 'string' || typeof householdId !== 'string') return;

        const fetch = async () => {
            try {
                const child = await getChildById(householdId, id);
                setPoints(child.points ?? 0);
                setDob(new Date(child.dob));
            } catch (error) {
                console.error('Kunne ikke hente barn:', error);
            }
        };

        fetch();
    }, [id, householdId]);


    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.avatar}>{avatar}</Text>
                <Text style={styles.name} testID="ChildName" >{name}</Text>
                <Text style={styles.points} testID="opptjentePoeng">Opptjente poeng: {points ?? 'Laster...'}</Text>
            </View>
            <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
                <ChildProfileActions
                    onShowRewards={() => {router.push({
                        pathname: '/(parent)/(tabs)/profile/view-child-rewards',
                        params: {
                            id: id as string,
                            householdId: householdId as string,
                        }
                    })}}
                    onShowTasks={() => {router.push({
                        pathname: '/(parent)/(tabs)/profile/view-childs-tasks',
                        params: {
                            id: id as string,
                            householdId: householdId as string,
                            firstName: name as string,
                            avatar: avatar as string,
                            points: points?.toString() ?? '0',
                        },
                    });
                    }}
                    onEdit={() => {
                        if (!dob) return;
                        router.push({
                            pathname: '/(parent)/(tabs)/profile/edit-child',
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
