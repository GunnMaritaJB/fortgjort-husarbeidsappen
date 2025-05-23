import { View, Text, TouchableOpacity } from 'react-native';
import { sharedFormStyles as s } from '@/features/parent/styles/sharedParentStyles';



export default function ParentHeader({name, avatar, onLogout,}:
{
    name: string;
    avatar?: string;
    onLogout: () => void;
})
{
    return (
        <>
            <View style={s.avatarCircle}>
                <Text style={s.avatar}>{avatar || '👤'}</Text>
            </View>
            <Text style={s.name}>{name}</Text>


        </>
    );
}
