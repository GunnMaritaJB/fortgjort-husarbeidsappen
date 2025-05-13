import { Tabs } from 'expo-router';
import { View, SafeAreaView, StatusBar } from 'react-native';
import FloatingMenu from '@/features/child/components/FloatingMenu';

export default function ChildLayout() {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { display: 'none' }, // Skjuler tab-baren siden du har egen floating menu
                    }}
                />
            </SafeAreaView>
            <FloatingMenu testID="starMenuButton" />
        </>
    );
}
