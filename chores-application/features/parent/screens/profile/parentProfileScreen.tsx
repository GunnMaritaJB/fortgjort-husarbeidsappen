import { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/shared/contexts/AuthContext';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import { fetchParentInfo } from '@/features/parent/services/parent';
import { Child } from '@/features/child/models/Child';

import ParentHeader from '@/features/parent/components/profile/ParentHeader';
import ChildList from '@/features/parent/components/profile/ChildList';
import AddChildButton from '@/features/parent/components/profile/AddChildButton';
import { sharedFormStyles as s } from '@/features/parent/styles/sharedParentStyles';
import {snapshot} from "node:test";

export default function ParentProfileScreen() {
    const [parentName, setParentName] = useState('Forelder');
    const [avatar, setAvatar] = useState('👤');
    const [children, setChildren] = useState<Child[]>([]);
    const [householdId, setHouseholdId] = useState<string | null>(null);
    const { setAuthData } = useAuth();
    const router = useRouter();
    const handleAddChild = () => router.push('/(parent)/(tabs)/profile/add-child');
    const handleLogout = () => router.replace('/(household)/home');

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const { parentId, householdId, firstName, avatar } = await fetchParentInfo();
                    setAuthData(parentId, householdId);
                    setParentName(firstName);
                    setAvatar(avatar ?? '👤');
                    setHouseholdId(householdId);

                    const kids = await fetchChildrenByHousehold(householdId);
                    setChildren(kids);
                    setAuthData(parentId, householdId);
                } catch (error) {
                    console.error('Klarte ikke hente data:', error);
                }
            };

            loadData();
        }, [])
    );

    return (
        <View style={s.container}>
            <ParentHeader name={parentName} avatar={avatar} onLogout={handleLogout} />
            <Text style={s.label}>Velg barneprofil</Text>
            <ChildList children={children} householdId={householdId} />
            <AddChildButton onPress={handleAddChild} />
        </View>
    );
}
