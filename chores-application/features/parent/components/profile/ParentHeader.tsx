import { View, Text, TouchableOpacity } from 'react-native';
import { sharedFormStyles as s } from '@/features/parent/styles/sharedParentStyles';

export default function ParentHeader({ name, onLogout }: { name: string; onLogout: () => void }) {
    return (
        <>
            <View style={s.avatarCircle}>
                <Text style={s.avatar}>👩‍🦰</Text>
            </View>
            <Text style={s.name}>{name}</Text>

            <TouchableOpacity style={s.logoutButton} onPress={onLogout}>
                <Text style={s.logoutText}>Logg ut</Text>
            </TouchableOpacity>
        </>
    );
}
