import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { parentProfileStyles as p } from '@/features/parent/styles/parentProfileStyles';

type Props = {
    id: string;
    firstName: string;
    avatar: string;
    householdId: string | null;
};


export default function ChildItem({ id, firstName, avatar, householdId }: Props) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/(parent)/child-profile',
            params: {
                id,
                name: firstName,
                avatar,
                householdId: householdId,
            },
        });
    };

    return (
        <TouchableOpacity style={p.childBox} onPress={handlePress}>
            <Text style={p.childText}>{avatar} {firstName}</Text>
        </TouchableOpacity>
    );
}
