import { Drawer } from 'expo-router/drawer';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { menuStyles } from '@/features/household/styles/menubar';

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
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <View style={{ padding: 16, paddingBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#555' }}>
                            Logg ut fra foreldreprofil
                        </Text>
                    </View>
                    
                    <DrawerItem
                        label="Logg ut"
                        onPress={() => router.replace('/(household)/home')}
                        icon={({ color, size }) => (
                            <Feather
                                name="log-out"
                                size={20}
                                color="#333"
                                style={menuStyles.flippedIcon}
                            />
                        )}
                        style={{ backgroundColor: '#ffd6d6', marginHorizontal: 8, borderRadius: 12 }}
                        labelStyle={{ fontWeight: '600', color: '#333' }}
                    />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'Logg ut',
                    drawerItemStyle: { display: 'none' },
                }}
            />
        </Drawer>
    );
}
