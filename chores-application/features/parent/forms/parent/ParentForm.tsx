import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '@/features/parent/styles/parentFormStyles';
import AvatarPicker from '@/features/parent/components/avatarPickerParent';

export default function ParentForm({
                                       firstName,
                                       avatar,
                                       setFirstName,
                                       setAvatar,
                                       onSubmit,
                                       onCancel,
                                       title,
                                   }: {
    firstName: string;
    avatar: string;
    setFirstName: (name: string) => void;
    setAvatar: (avatar: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    title: string;
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.avatarCircle}>
                <Text style={styles.avatar}>{avatar}</Text>
            </View>

            <AvatarPicker selected={avatar} onSelect={setAvatar} />

            <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Navn"
                style={styles.input}
                autoCapitalize="words"
            />

            {/* Knapper */}
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onSubmit} style={styles.saveButton}>
                    <Text style={styles.buttonText}>Lagre</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Avbryt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
