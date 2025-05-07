import { TouchableOpacity, Text } from 'react-native';
import { childProfileStyles as styles } from '@/features/parent/styles/childProfileStyles';

type Props = {
    title: string;
    onPress: () => void;
};

export default function ChildProfileButton({ title, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
