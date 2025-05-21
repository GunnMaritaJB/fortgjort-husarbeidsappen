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
import ConfirmApprovalModal from '@/features/parent/components/approveModal';
import RejectConfirmationModal from '@/features/parent/components/rejectModal';
import { confirmApproval, rejectTask } from '@/features/task/services/task';
import{styles as approvestyles} from '@/features/parent/styles/taskForChildrenScreenStyles'
import { deleteTask } from '@/features/task/services/task';
import { Alert } from 'react-native';

export default function TasksHome() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [childMap, setChildMap] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDeadline, setSortByDeadline] = useState<'asc' | 'desc' | null>(null);
    const [sortByChildName, setSortByChildName] = useState<'asc' | 'desc' | null>(null);
    const [sortByVisibility, setSortByVisibility] = useState<'asc' | 'desc' | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);


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

                            {item.completed ? (
                                <><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                                    {item.completed && (
                                        <Text style={[styles.statusBadge, { backgroundColor: '#FFF8E1', color: '#FF9800' }]}>
                                            ✅ Fullført
                                        </Text>
                                    )}
                                    {item.completed && !item.approved && (
                                        <Text style={[styles.statusBadge, { backgroundColor: '#FFF3E0', color: '#FB8C00' }]}>
                                            🕒 Venter på godkjenning
                                        </Text>
                                    )}
                                    {item.approved && (
                                        <Text style={[styles.statusBadge, { backgroundColor: '#E8F5E9', color: '#2E7D32' }]}>
                                            🟢 Godkjent
                                        </Text>
                                    )}
                                    {item.visibleToChild ? (
                                        <Text style={[styles.statusBadge, { backgroundColor: '#E3F2FD', color: '#1565C0' }]}>
                                            Synlig
                                        </Text>
                                    ) : (
                                        <Text style={[styles.statusBadge, { backgroundColor: '#FBE9E7', color: '#D84315' }]}>
                                            🚫 Skjult
                                        </Text>
                                    )}
                                </View>
                                    {!item.approved && (
                                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                                            <TouchableOpacity
                                                style={approvestyles.approveBtn}
                                                onPress={() => {
                                                    setSelectedTask(item);
                                                    setShowApprovalModal(true);
                                                }}
                                            >
                                                <Text style={approvestyles.approveText}>Bekreft</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={approvestyles.rejectBtn}
                                                onPress={() => {
                                                    setSelectedTask(item);
                                                    setShowRejectModal(true);
                                                }}
                                            >
                                                <Text style={approvestyles.rejectText}>Underkjenn</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </>
                            ) : (
                                <Text style={{ color: '#8B0000', fontWeight: 'bold' }}>❌ Ikke fullført</Text>
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
                            <TouchableOpacity
                                onPress={async () => {
                                    const householdId = await getParentHouseholdId();

                                    if (item.completed && !item.approved) {
                                        Alert.alert(
                                            'Kan ikke slette',
                                            'Oppgaven er fullført av barnet, men ikke godkjent enda. Du må godkjenne eller avvise den før den kan slettes.'
                                        );
                                        return;
                                    }

                                    Alert.alert(
                                        'Slett oppgave',
                                        'Er du sikker på at du vil slette denne oppgaven?',
                                        [
                                            { text: 'Avbryt', style: 'cancel' },
                                            {
                                                text: 'Slett',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    await deleteTask(householdId, item.id);
                                                },
                                            },
                                        ]
                                    );
                                }}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>Slett</Text>
                            </TouchableOpacity>


                        </View>
                    </TouchableOpacity>
                )}
            />
            <ConfirmApprovalModal
                visible={showApprovalModal}
                task={selectedTask}
                onCancel={() => {
                    setShowApprovalModal(false);
                    setSelectedTask(null);
                }}
                onConfirm={async () => {
                    if (selectedTask) {
                        const householdId = await getParentHouseholdId();
                        await confirmApproval(householdId, selectedTask);
                    }
                    setShowApprovalModal(false);
                    setSelectedTask(null);
                }}
            />
            <RejectConfirmationModal
                visible={showRejectModal}
                task={selectedTask}
                onCancel={() => {
                    setShowRejectModal(false);
                    setSelectedTask(null);
                }}
                onConfirm={async () => {
                    if (selectedTask) {
                        const householdId = await getParentHouseholdId();
                        await rejectTask(householdId, selectedTask.id);
                    }
                    setShowRejectModal(false);
                    setSelectedTask(null);
                }}
            />
        </View>
    );
}
