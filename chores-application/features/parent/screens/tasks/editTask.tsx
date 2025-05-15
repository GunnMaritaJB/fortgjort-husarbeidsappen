import { ScrollView, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTaskStyles as styles } from '@/features/task/styles/createTaskStyles';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import { getParentHouseholdId } from '@/features/parent/services/parent';
import { db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Child } from '@/features/child/models/Child';

export default function EditTaskScreen() {
    const [taskName, setTaskName] = useState('');
    const [points, setPoints] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateForCompletion, setDateForCompletion] = useState<Date | undefined>(new Date());
    const [recurring, setRecurring] = useState(false);
    const [repeatDays, setRepeatDays] = useState<string[]>([]);
    const [visibleToChild, setVisibleToChild] = useState(true);
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);
    const days = ['MA', 'TI', 'ON', 'TO', 'FR', 'LØ', 'SØ'];

    const router = useRouter();
    const { id: taskId } = useLocalSearchParams();

    useEffect(() => {
        const loadTaskAndChildren = async () => {
            try {
                const householdId = await getParentHouseholdId();

                // Fetch children
                const data = await fetchChildrenByHousehold(householdId);
                setChildren(data);

                // Fetch task
                const taskRef = doc(db, `households/${householdId}/tasks/${taskId}`);
                const taskSnap = await getDoc(taskRef);
                if (taskSnap.exists()) {
                    const task = taskSnap.data();
                    setTaskName(task.name);
                    setPoints(task.points.toString());
                    setRecurring(task.recurring);
                    setRepeatDays(task.repeatDays || []);
                    setDateForCompletion(task.dateForCompletion?.toDate?.() || new Date());
                    setVisibleToChild(task.visibleToChild ?? true);
                    setSelectedChildIds(task.assignedTo ?? []);
                }
            } catch (err) {
                console.error('Feil ved lasting:', err);
            }
        };

        if (taskId) loadTaskAndChildren();
    }, [taskId]);

    const handleSave = async () => {
        if (!taskName || !points || (!recurring && !dateForCompletion)) return;

        if (selectedChildIds.length === 0) {
            alert('Du må velge minst ett barn');
            return;
        }

        try {
            const householdId = await getParentHouseholdId();
            const taskRef = doc(db, `households/${householdId}/tasks/${taskId}`);

            await updateDoc(taskRef, {
                name: taskName,
                points: Number(points),
                recurring,
                repeatDays,
                dateForCompletion: recurring ? null : dateForCompletion,
                assignedTo: selectedChildIds,
                visibleToChild,
            });

            router.replace('/(parent)/(tabs)/tasks');
        } catch (err) {
            console.error('Feil ved oppdatering av oppgave:', err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>REDIGER OPPGAVE</Text>

            <Text style={styles.label}>Navn på oppgave</Text>
            <TextInput
                value={taskName}
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
                            onPress={() => {
                                if (isSelected) {
                                    setSelectedChildIds(selectedChildIds.filter((id) => id !== child.id));
                                } else {
                                    setSelectedChildIds([...selectedChildIds, child.id]);
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
                    <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
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

            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[styles.toggleBtn, visibleToChild && styles.selectedToggle]}
                    onPress={() => setVisibleToChild(true)}
                >
                    <Text>Vis</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, !visibleToChild && styles.selectedToggle]}
                    onPress={() => setVisibleToChild(false)}
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
