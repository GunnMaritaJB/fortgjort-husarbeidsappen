// features/parent/components/AvatarPicker.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';


const AVATARS = ['🦁', '🐯', '🐱', '🐶', '🐰', '🐭', '🦊', '🐼', '🐸', '🐵', '🐷', '🐤', '🦄', '🐮', '🐙'];

type Size = 'small' | 'large';

type Props = {
    selected: string;
    onSelect: (avatar: string) => void;
    size?: Size;
};

export default function AvatarPicker({ selected, onSelect, size = 'small' }: Props) {
    return (
        <View style={styles.grid}>
            {AVATARS.map((a) => (
                <TouchableOpacity
                    key={a}
                    onPress={() => onSelect(a)}
                    style={[
                        getAvatarStyle(selected === a, size)
                    ]}
                >
                    <Text style={{ fontSize: getEmojiFontSize(size) }}>{a}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const getAvatarStyle = (selected: boolean, size: Size): ViewStyle => ({
    padding: size === 'large' ? 14 : 8,
    width: size === 'large' ? 80 : 56,
    height: size === 'large' ? 80 : 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: selected ? 2 : 1,
    borderColor: selected ? '#4CAF50' : '#ccc',
    borderRadius: 12,
    backgroundColor: selected ? '#c8e6c9' : '#fff',
});


const getEmojiFontSize = (size: Size) => (size === 'large' ? 40 : 28);

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 12,
    },
});
