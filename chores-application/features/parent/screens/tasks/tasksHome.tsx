import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Task } from '@/features/task/models/Task';
import { format, endOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';
import { getRecurringDates } from '@/features/task/services/generateRecurringDates';
import { listenToTasksForParent } from '@/features/task/services/task';
import { taskListStyles as styles } from '@/features/task/styles/taskListStyles';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import { getParentHouseholdId } from '@/features/parent/services/parent';

export default function TasksHome() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [childMap, setChildMap] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDeadline, setSortByDeadline] = useState<'asc' | 'desc' | null>(null);
    const [sortByChildName, setSortByChildName] = useState<'asc' | 'desc' | null>(null);
    const [sortByVisibility, setSortByVisibility] = useState<'asc' | 'desc' | null>(null);

    useEffect(() => {
        let unsubscribe: () => void;

        const loadChildren = async () => {
            try {
                const householdId = await getParentHouseholdId();
                const children = await fetchChildrenByHousehold(householdId);

                const map: Record<string, string> = {};
                children.forEach(child => {
                    map[child.id] = child.firstName;
                });
                setChildMap(map);
            } catch (err) {
                console.error('Feil ved lasting av barn:', err);
            }
        };

        loadChildren();

        const start = async () => {
            unsubscribe = await listenToTasksForParent(setTasks);
        };

        start();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const filteredTasks = tasks
        .filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortByChildName) {
                const nameA = childMap[a.childId] ?? '';
                const nameB = childMap[b.childId] ?? '';
                return sortByChildName === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            }

            if (sortByVisibility) {
                const visA = a.visibleToChild ? 1 : 0;
                const visB = b.visibleToChild ? 1 : 0;
                return sortByVisibility === 'asc' ? visA - visB : visB - visA;
            }

            if (!sortByDeadline) return 0;

            const now = new Date();

            const getDate = (task: Task) => {
                if (task.recurring && Array.isArray(task.repeatDays)) {
                    const next = getRecurringDates(task.repeatDays, now, endOfMonth(now)).find(d => d > now);
                    return next ?? new Date(8640000000000000);
                }
                return (task.dateForCompletion as any)?.toDate?.() ?? new Date(8640000000000000);
            };
            const dateA = getDate(a);
            const dateB = getDate(b);
            return sortByDeadline === 'asc'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });

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

                <TouchableOpacity onPress={() => router.push('/(parent)/(tabs)/tasks/create_task')}>
                    <Ionicons testID={"addTaskButton"} name="add" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                <TouchableOpacity
                    onPress={() => {
                        if (sortByChildName === 'asc') setSortByChildName('desc');
                        else if (sortByChildName === 'desc') setSortByChildName(null);
                        else setSortByChildName('asc');
                    }}
                >
                    <Text style={styles.filter}>
                        Barn {sortByChildName === 'asc' ? '▲' : sortByChildName === 'desc' ? '▼' : ''}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (sortByDeadline === 'asc') setSortByDeadline('desc');
                        else if (sortByDeadline === 'desc') setSortByDeadline(null);
                        else setSortByDeadline('asc');
                    }}
                >
                    <Text style={styles.filter}>
                        Frist {sortByDeadline === 'asc' ? '▲' : sortByDeadline === 'desc' ? '▼' : ''}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.filter}>Status</Text>

                <TouchableOpacity
                    onPress={() => {
                        if (sortByVisibility === 'asc') setSortByVisibility('desc');
                        else if (sortByVisibility === 'desc') setSortByVisibility(null);
                        else setSortByVisibility('asc');
                    }}
                >
                    <Text style={styles.filter}>
                        Synlig {sortByVisibility === 'asc' ? '▲' : sortByVisibility === 'desc' ? '▼' : ''}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noTasks}>Ingen oppgaver enda</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/tasks/edit_task?id=${item.id}`)}>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.name} – {item.points} poeng</Text>

                            {item.childId && (
                                <Text style={styles.dueDate}>
                                    Tildelt: {childMap[item.childId] ?? 'Ukjent'}
                                </Text>
                            )}

                            {item.dateForCompletion && (
                                <Text style={styles.dueDate}>
                                    Frist: {format((item.dateForCompletion as any)?.toDate?.(), 'dd.MM.yyyy', { locale: nb })}
                                </Text>
                            )}

                            {item.recurring && Array.isArray(item.repeatDays) && item.repeatDays.length > 0 && (
                                <View style={{ marginTop: 4 }}>
                                    <Text style={styles.dueDate}>Gjentas: {item.repeatDays?.join(', ')}</Text>
                                    {(() => {
                                        const dates = getRecurringDates(item.repeatDays ?? [], new Date(), endOfMonth(new Date()));
                                        const next = dates.find(d => d > new Date());
                                        return next ? (
                                            <Text style={styles.dueDate}>
                                                Neste: {format(next, 'dd.MM.yyyy', { locale: nb })}
                                            </Text>
                                        ) : null;
                                    })()}
                                </View>
                            )}

                            {typeof item.visibleToChild === 'boolean' && (
                                <Text
                                    style={{
                                        marginTop: 4,
                                        paddingVertical: 4,
                                        paddingHorizontal: 10,
                                        borderRadius: 8,
                                        backgroundColor: item.visibleToChild ? '#D4F1D7' : '#F2C2C2',
                                        color: '#333',
                                        alignSelf: 'flex-start',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.visibleToChild ? 'Synlig' : 'Skjult'}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
