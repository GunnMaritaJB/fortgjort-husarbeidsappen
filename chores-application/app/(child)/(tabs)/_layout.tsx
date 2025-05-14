import {Tabs, useGlobalSearchParams} from 'expo-router';
import {SafeAreaView} from "react-native";
import { StatusBar } from 'react-native';
import FloatingMenu from "@/features/child/components/FloatingMenu";


export default function ChildLayout() {
    const { householdId, id: childId } = useGlobalSearchParams();

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { display: 'none' },
                    }}
                />
            </SafeAreaView>
            <FloatingMenu householdId={householdId as string} childId={childId as string} />
        </>
    );
}
