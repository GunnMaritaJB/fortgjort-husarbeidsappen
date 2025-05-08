import { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import { useRouter } from 'expo-router';
import { fetchChildrenByHousehold} from '@/features/parent/services/child';
import { Child } from '@/features/child/models/Child';
import {fetchParentInfo} from "@/features/parent/services/parent";
import {sharedFormStyles as s} from '@/features/parent/styles/sharedParentStyles';
import ParentHeader from '@/features/parent/components/profile/ParentHeader';
import ChildList from '@/features/parent/components/profile/ChildList';
import AddChildButton from '@/features/parent/components/profile/AddChildButton';


export default function ParentProfileScreen() {
    const [parentName, setParentName] = useState('Forelder');
    const [children, setChildren] = useState<Child[]>([]);
    const router = useRouter();
    const handleAddChild = () => router.push('/(parent)/add-child');
    const handleLogout = () => router.replace('/(household)/home');

    useEffect(() => {
        const loadData = async () => {
            try {
                const { firstName, householdId } = await fetchParentInfo();
                setParentName(firstName);
                const kids = await fetchChildrenByHousehold(householdId);
                setChildren(kids);
            } catch (error) {
                console.error('🚨 Klarte ikke hente data:', error);
            }
        };
        loadData();
    }, []);

    return (
        <View style={s.container}>
            <ParentHeader name={parentName} onLogout={handleLogout} />
            <Text style={s.label}>Velg barneprofil</Text>
            <ChildList children={children} />
            <AddChildButton onPress={handleAddChild} />
        </View>
    );
}
