// features/parent/screens/profile/childProfileScreen.tsx
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { childProfileStyles as styles } from '@/features/parent/styles/childProfileStyles';
import BackButton from '@/features/auth/components/backButton';
import ChildProfileActions from '@/features/parent/components/ChildProfileActions';

export default function ChildProfileScreen() {
    const { id, name, avatar } = useLocalSearchParams();
    const [points, setPoints] = useState<number | null>(null);

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
                onDelete={() => {}}
            />
            </View>
        </View>
    );

}
