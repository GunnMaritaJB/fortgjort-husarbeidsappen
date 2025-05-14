import { Stack } from 'expo-router';

export default function LogoutStackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                title: '',
                headerBackVisible: true,
            }}
        />
    );
}
