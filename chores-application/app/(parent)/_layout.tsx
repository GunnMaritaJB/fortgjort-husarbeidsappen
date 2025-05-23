import { Drawer } from 'expo-router/drawer';
import {Feather, Ionicons} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import {menuStyles} from "@/features/household/styles/menubar";

export default function ParentDrawerLayout() {
    const router = useRouter();

    return (
        <Drawer
            screenOptions={{
                headerStyle: { backgroundColor: '#e9f6f5' },
                headerTintColor: '#2e7d32',
                drawerActiveTintColor: '#2e7d32',
                drawerLabelStyle: { fontSize: 16 },
                drawerStyle: {
                    width: 240,
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'Logg ut',
                    drawerItemStyle: { display: 'none' },
                }}
            />
            <Drawer.Screen
                name="logout"
                options={{
                    title: 'Logg ut',
                    drawerLabel: 'Logg ut',
                    drawerItemStyle: { backgroundColor: '#ffd6d6' },
                    drawerIcon: ({ color, size }) => (
                        <Feather name="log-out" size={20} color="#333" style={menuStyles.flippedIcon}/>
                    ),
                }}
            />
        </Drawer>
    );
}
