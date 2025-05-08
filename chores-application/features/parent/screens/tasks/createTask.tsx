// parent/screens/tasks/createTask.tsx
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { getDoc, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { nb } from 'date-fns/locale';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates';
import { format } from 'date-fns';


const norwegianTranslation = {
    save: 'Lagre',
    selectSingle: 'Velg dato',
    selectMultiple: 'Velg datoer',
    selectRange: 'Velg periode',
    notAccordingToDateFormat: (input: string) => `Ugyldig dato: ${input}`,
    mustBeHigherThan: (date: string) => `Må være etter ${date}`,
    mustBeLowerThan: (date: string) => `Må være før ${date}`,
    mustBeBetween: (start: string, end: string) => `Må være mellom ${start} og ${end}`,
    dateIsDisabled: (date: string) => `Datoen ${date} er deaktivert`,
    previous: 'Forrige',
    next: 'Neste',
    typeInDate: 'Skriv dato',
    pickDateFromCalendar: 'Velg dato fra kalender',
    close: 'Lukk',
};

// 👇 Cast til `any` kun ved bruk, ikke på hele objektet
registerTranslation('no', norwegianTranslation as any);





export default function CreateTaskScreen() {
    const [taskName, setTaskName] = useState('');
    const [points, setPoints] = useState('');
    const [open, setOpen] = useState(false);
    const [dateForCompletion, setDateForCompletion] = useState<Date | undefined>(new Date());
    const router = useRouter();

    const handleSave = async () => {
        if (!taskName || !points || !dateForCompletion) return;

        const uid = getAuth().currentUser?.uid;
        if (!uid) return;

        const parentDoc = await getDoc(doc(db, 'parents', uid));
        const householdId = parentDoc.data()?.householdId;
        if (!householdId) return;

        await addDoc(collection(db, 'tasks'), {
            name: taskName,
            points: Number(points),
            addedBy: uid,
            householdId,
            approved: false,
            completed: false,
            recurring: false,
            dateAssigned: serverTimestamp(),
            dateForCompletion,
        });

        router.replace('/tasks');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>NY OPPGAVE</Text>

            <Text style={styles.label}>Navn på oppgave</Text>
            <TextInput
                value={taskName}
                onChangeText={setTaskName}
                style={styles.input}
            />

            <Text style={styles.label}>Poengsum</Text>
            <TextInput
                value={points}
                onChangeText={setPoints}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Frist for oppgave</Text>
            <TouchableOpacity style={styles.datePickerBtn} onPress={() => setOpen(true)}>
                <Text>
                    {dateForCompletion ? format(dateForCompletion, 'dd.MM.yyyy', { locale: nb }) : ''}
                </Text>
            </TouchableOpacity>

            <DatePickerModal
                locale="no"
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={dateForCompletion}
                onConfirm={({ date }) => {
                    setOpen(false);
                    setDateForCompletion(date);
                }}
            />

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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1fefe', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { marginTop: 16, fontSize: 16 },
    input: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        marginTop: 8,
    },
    datePickerBtn: {
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    saveButton: {
        backgroundColor: '#b0e0d3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
    },
    buttonText: { fontSize: 16 },
});
