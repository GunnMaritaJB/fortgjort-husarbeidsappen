import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTaskForCurrentUser } from '@/features/task/services/task';
import { createTaskStyles as styles } from '@/features/task/styles/createTaskStyles';


export default function CreateTaskScreen() {
    const [taskName, setTaskName] = useState('');
    const [points, setPoints] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateForCompletion, setDateForCompletion] = useState<Date | undefined>(new Date());
    const [recurring, setRecurring] = useState(false);
    const [repeatDays, setRepeatDays] = useState<string[]>([]);
    const router = useRouter();

    const days = ['MA', 'TI', 'ON', 'TO', 'FR', 'LØ', 'SØ'];

    const handleSave = async () => {
        if (!taskName || !points || (!recurring && !dateForCompletion)) return;

        try {
            await createTaskForCurrentUser({
                name: taskName,
                points: Number(points),
                recurring,
                repeatDays,
                dateForCompletion: dateForCompletion ?? null,
            });

            router.replace('/tasks');
        } catch (err) {
            console.error('Feil ved lagring av oppgave:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>NY OPPGAVE</Text>

            <Text style={styles.label}>Navn på oppgave</Text>
            <TextInput
                value={taskName}
                testID="taskNameID"
                onChangeText={setTaskName}
                style={styles.input}
            />

            <Text style={styles.label}>Poengsum</Text>
            <TextInput
                value={points}
                testID="pointsID"
                onChangeText={setPoints}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[styles.toggleBtn, !recurring && styles.selectedToggle]}
                    onPress={() => setRecurring(false)}
                >
                    <Text>En gang</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleBtn, recurring && styles.selectedToggle]}
                    onPress={() => setRecurring(true)}
                >
                    <Text>Gjentagende</Text>
                </TouchableOpacity>
            </View>

            {!recurring ? (
                <>
                    <Text style={styles.label}>Frist for oppgave</Text>
                    <TouchableOpacity style={styles.datePickerBtn} testID="datePicker" onPress={() => setShowDatePicker(true)}>
                        <Text>
                            {dateForCompletion
                                ? format(dateForCompletion, 'dd.MM.yyyy', { locale: nb })
                                : ''}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateForCompletion || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (event.type === 'set' && selectedDate) {
                                    setDateForCompletion(selectedDate);
                                }
                            }}
                            locale="no-NO"
                        />
                    )}
                </>
            ) : (
                <>
                    <Text style={styles.label}>Dager oppgaven skal gjøres på:</Text>
                    <View style={styles.weekRow}>
                        {days.map((day, idx) => {
                            const isSelected = repeatDays.includes(day);
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        if (isSelected) {
                                            setRepeatDays(repeatDays.filter((d) => d !== day));
                                        } else {
                                            setRepeatDays([...repeatDays, day]);
                                        }
                                    }}
                                    style={[styles.dayBtn, isSelected && styles.selectedDayBtn]}
                                >
                                    <Text style={styles.dayText}>{day}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>
            )}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Lagre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Avbryt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
