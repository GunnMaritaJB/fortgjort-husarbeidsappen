import { Stack } from 'expo-router';

export default function RewardsStackLayout() {
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
