import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/features/parent/styles/parentFormStyles';

export default function AvatarPicker({
                                         selected,
                                         onSelect,
                                     }: {
    selected: string;
    onSelect: (emoji: string) => void;
}) {
    const options = [
        '🧔',
        '👩',
        '👨',
        '👩‍🦰',
        '👨‍🦱',
        '🧙‍♂️',
        '🧝‍♀️',
        '👩‍🎤',
        '🌟',
    ];


    return (
        <View style={styles.emojiGrid}>
            {options.map((emoji) => (
                <TouchableOpacity
                    key={emoji}
                    onPress={() => onSelect(emoji)}
                    style={[
                        styles.emojiButton,
                        selected === emoji && { backgroundColor: '#fff176' },
                    ]}
                >
                    <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
