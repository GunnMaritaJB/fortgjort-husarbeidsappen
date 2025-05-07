// features/parent/components/AvatarPicker.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AVATARS = ['🦁', '🐯', '🐱', '🐶', '🐰', '🐭', '🦊', '🐼', '🐸', '🐵', '🐷', '🐤'];


type Props = {
    selected: string;
    onSelect: (avatar: string) => void;
};

export default function AvatarPicker({ selected, onSelect }: Props) {
    return (
        <View style={styles.grid}>
            {AVATARS.map((a) => (
                <TouchableOpacity
                    key={a}
                    onPress={() => onSelect(a)}
                    style={[styles.avatar, selected === a && styles.selected]}
                >
                    <Text style={{ fontSize: 28 }}>{a}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginVertical: 12 },
    avatar: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    selected: {
        backgroundColor: '#c8e6c9',
    },
});
