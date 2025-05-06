import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ParentLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#2e7d32' }}>
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'Oppgaver',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="checklist" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Varsler',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Innstillinger',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
