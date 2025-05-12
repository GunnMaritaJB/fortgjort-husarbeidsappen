import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AvatarPicker from '@/features/parent/components/avatarPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sharedFormStyles as s } from '@/features/parent/styles/sharedParentStyles';
import { addChildStyles as c } from '@/features/parent/styles/addChildStyles';


type Props = {
    firstName: string;
    dob: Date;
    avatar: string;
    setFirstName: (value: string) => void;
    setDob: (value: Date) => void;
    setAvatar: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    showPicker: boolean;
    setShowPicker: (show: boolean) => void;
    points?: number;
    setPoints?: (value: number) => void;
    isEdit?: boolean;
    title?: string;
};

export default function CreateChildForm({
                                            firstName,
                                            dob,
                                            avatar,
                                            setFirstName,
                                            setDob,
                                            setAvatar,
                                            onSubmit,
                                            onCancel,
                                            showPicker,
                                            setShowPicker,
                                            points,
                                            setPoints,
                                            isEdit,
                                            title,
                                        }: Props) {
    const onChange = (_: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    return (
        <View style={c.container}>
            <Text style={c.title}>{title ?? 'Legg til nytt barn'}</Text>
            <Text style={s.label}>Barnets navn</Text>
            <TextInput
                placeholder="Fornavn"
                style={s.input}
                value={firstName}
                onChangeText={setFirstName}
                testID="childNameInput"
            />

            <Text style={s.label}>Fødselsdato</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={c.dateButton}>
                <Text style={c.dateText}>{dob.toISOString().slice(0, 10)}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={dob}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                    maximumDate={new Date()}
                />
            )}

            <Text style={s.label}>Velg avatar:</Text>
            <View style={c.avatarRow}>
                <AvatarPicker selected={avatar} onSelect={setAvatar}/>
            </View>

            {isEdit && setPoints && (
                <>
                    <Text style={s.label}>Poeng</Text>
                    <TextInput
                        style={s.input}
                        value={String(points)}
                        onChangeText={(val) => setPoints(Number(val))}
                        keyboardType="numeric"
                    />
                </>
            )}

            <View style={s.buttonRow}>
                <TouchableOpacity style={s.primaryButton} onPress={onSubmit} testID="submitChild">
                    <Text style={s.buttonText}>Fullfør</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.grayButton} onPress={onCancel}>
                    <Text style={[s.buttonText, {color: '#000'}]}>Avbryt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
