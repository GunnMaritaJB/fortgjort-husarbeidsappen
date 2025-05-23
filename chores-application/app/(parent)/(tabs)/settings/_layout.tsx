import {Stack} from "expo-router";

export default function SettingsLayout() {
    return (
    <Stack
        screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: '#e9f6f5',
            },
            headerTintColor: '#2e7d32',  // ← farge på back-knapp
            headerTitle: '',
            headerBackVisible: true,
            headerShadowVisible: false,
        }}
    />
    );
}