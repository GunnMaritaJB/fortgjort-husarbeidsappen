import { TouchableOpacity, Text } from 'react-native';
import { parentProfileStyles as p } from '@/features/parent/styles/profile/parentProfileStyles';

export default function AddChildButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity style={p.addChildButton} onPress={onPress}>
            <Text style={p.addChildText} testID="addChildLabel">＋</Text>
        </TouchableOpacity>
    );
}
