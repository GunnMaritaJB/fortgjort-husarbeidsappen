import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, where , updateDoc} from 'firebase/firestore';
import { Task } from '@/features/task/models/Task'; // juster stien hvis nødvendig

export default function TasksHome() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const uid = getAuth().currentUser?.uid;
            if (!uid) return;

            const parentDoc = await getDoc(doc(db, 'parents', uid));
            const householdId = parentDoc.data()?.householdId;
            if (!householdId) return;

            const q = query(
                collection(db, 'tasks'),
                where('householdId', '==', householdId),
                orderBy('dateAssigned', 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data: Task[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Task, 'id'>),
                }));
                setTasks(data);
            });

            return () => unsubscribe();
        };

        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>OPPGAVER</Text>

            <View style={styles.searchRow}>
                <TextInput
                    placeholder="Søk i oppgaver"
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={() => router.push('/(parent)/(tasks)/create_task')}>
                    <Ionicons name="add" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                <Text style={styles.filter}>Barn</Text>
                <Text style={styles.filter}>Frist</Text>
                <Text style={styles.filter}>Status</Text>
                <Text style={styles.filter}>Synlig</Text>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noTasks}>Ingen oppgaver enda</Text>}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.name} – {item.points} poeng</Text>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f1fefe' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 10,
    },
    filter: { fontWeight: '600', fontSize: 14 },
    noTasks: { textAlign: 'center', marginTop: 32, color: '#999' },
    taskItem: {
        backgroundColor: '#e3f3f2',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
    },
});
