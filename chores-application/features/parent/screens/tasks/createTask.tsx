import {ScrollView, View, Text, TextInput, TouchableOpacity, Platform,} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTaskForCurrentUser } from '@/features/task/services/task';
import { createTaskStyles as styles } from '@/features/task/styles/createTaskStyles';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import { getParentHouseholdId } from '@/features/parent/services/parent';
import { Child } from '@/features/child/models/Child';
import { getRecurringDates } from '@/features/task/services/generateRecurringDates';

export default function CreateTaskScreen() {
    const [taskName, setTaskName] = useState('');
    const [points, setPoints] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateForCompletion, setDateForCompletion] = useState(new Date());
    const [recurring, setRecurring] = useState(false);
    const [repeatDays, setRepeatDays] = useState<string[]>([]);
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);
    const [visibleToChild, setVisibleToChild] = useState(true);
    const router = useRouter();

    const days = ['MA', 'TI', 'ON', 'TO', 'FR', 'LØ', 'SØ'];

    useEffect(() => {
        const loadChildren = async () => {
            try {
                const householdId = await getParentHouseholdId();
                const data = await fetchChildrenByHousehold(householdId);
                setChildren(data);
            } catch (err) {
            }
        };

        loadChildren();
    }, []);

    const handleSave = async () => {
        if (!taskName || !points || (!recurring && !dateForCompletion)) return;

        if (selectedChildIds.length === 0) {
            alert('Du må velge minst ett barn');
            return;
        }

        let finalDateForCompletion: Date | null = dateForCompletion ?? null;

        if (recurring && repeatDays.length > 0) {
            const today = new Date();
            const end = new Date();
            end.setDate(today.getDate() + 30);

            const recurringDates = getRecurringDates(repeatDays, today, end);
            if (recurringDates.length > 0) {
                finalDateForCompletion = recurringDates[0];
            }
        }

        try {
            await createTaskForCurrentUser({
                name: taskName,
                points: Number(points),
                recurring,
                repeatDays,
                dateForCompletion: finalDateForCompletion,
                assignedChildIds: selectedChildIds,
                visibleToChild,
            });

            router.replace('/tasks');
        } catch (err) {
            console.error('Feil ved lagring av oppgave:', err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>NY OPPGAVE</Text>

            <Text style={styles.label}>Navn på oppgave</Text>
            <TextInput
                value={taskName}
                testID="taskNameID"
                onChangeText={setTaskName}
                style={styles.input}
            />

            <Text style={styles.label}>Tildel til barn</Text>
            <View style={styles.weekRow}>
                {children.map((child) => {
                    const isSelected = selectedChildIds.includes(child.id);
                    return (
                        <TouchableOpacity
                            key={child.id}
                            testID="assign_child"
                            onPress={() => {
                                if (isSelected) {
                                    setSelectedChildIds((prev) =>
                                        prev.filter((id) => id !== child.id)
                                    );
                                } else {
                                    setSelectedChildIds((prev) => [...prev, child.id]);
                                }
                            }}
                            style={[styles.dayBtn, isSelected && styles.selectedDayBtn]}
                        >
                            <Text style={styles.dayText}>{child.firstName}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

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
                    <TouchableOpacity
                        style={styles.datePickerBtn}
                        onPress={() => setShowDatePicker(true)}
                        testID="datePicker"
                    >
                        <Text>
                            {dateForCompletion
                                ? format(dateForCompletion, 'dd.MM.yyyy', { locale: nb })
                                : ''}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateForCompletion}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (event?.type === 'set' && selectedDate) {
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

            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[styles.toggleBtn, visibleToChild && styles.selectedToggle]}
                    onPress={() => setVisibleToChild(true)}
                    testID="visibleToggle"
                >
                    <Text>Vis</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, !visibleToChild && styles.selectedToggle]}
                    onPress={() => setVisibleToChild(false)}
                    testID="hiddenToggle"
                >
                    <Text>Skjul</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Lagre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Avbryt</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
