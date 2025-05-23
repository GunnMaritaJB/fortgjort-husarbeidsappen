import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {listenToTasksForChild, rejectTask} from '@/features/task/services/task';
import { Task } from '@/features/task/models/Task';
import { getParentHouseholdId } from '@/features/parent/services/parent';
import ConfirmApprovalModal from '@/features/parent/components/approveModal';
import { format } from 'date-fns';
import { fetchChildrenByHousehold } from '@/features/child/services/child';
import RejectConfirmationModal from '@/features/parent/components/rejectModal';
import {styles} from '@/features/parent/styles/profile/taskForChildrenScreenStyles'
import { confirmApproval } from '@/features/task/services/task';



export default function TaskForChildScreen() {
    const { id: childId } = useLocalSearchParams<{ id: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [householdId, setHouseholdId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);


    const safeFormatDate = (value: any): string => {
        if (!value) return '';
        let date: Date;

        if (typeof value === 'number') {
            date = new Date(value);
        } else if (value.toDate) {
            // Firebase Timestamp
            date = value.toDate();
        } else if (value instanceof Date) {
            date = value;
        } else {
            return '';
        }

        return isNaN(date.getTime()) ? '' : format(date, 'dd.MM.yyyy');
    };


    useEffect(() => {
        const load = async () => {
            try {
                if (!childId) throw new Error('childId mangler!');
                const householdId = await getParentHouseholdId();
                setHouseholdId(householdId);
                const children = await fetchChildrenByHousehold(householdId);
                const map: Record<string, string> = {};
                children.forEach(child => {
                    map[child.id] = child.firstName;
                });
                const unsubscribe = listenToTasksForChild(
                    householdId,
                    childId,
                    (incomingTasks) => {
                        const tasksWithNames = incomingTasks.map(task => ({
                            ...task,
                            childName: map[task.childId ?? ''] ?? 'barn',
                        }));
                        setTasks(tasksWithNames);
                    },
                    setLoading,
                    { showCompletedAndApproved: true }
                );


                return () => unsubscribe();
            } catch (error) {
                console.error('Feil i load():', error);
                setLoading(false);
            }
        };

        load();
    }, [childId]);

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    return (
        <ScrollView style={styles.container}>
            {tasks.length === 0 && <Text style={styles.noTasks}>Ingen oppgaver funnet</Text>}

            {tasks.map(task => (
                <View key={task.id} style={styles.taskCard}>
                    <Text style={styles.title}>{task.name.toUpperCase()}</Text>
                    <Text style={styles.points}>{task.points} poeng</Text>
                    {safeFormatDate(task.dateForCompletion) && (
                        <Text style={styles.deadlineText}>
                            Frist: {safeFormatDate(task.dateForCompletion)}
                        </Text>
                    )}


                    {task.childName && (
                        <Text style={styles.dueDate}>
                            Tildelt: {task.childName}
                        </Text>
                    )}

                    <Text style={task.completed ? styles.statusDone : styles.statusTodo}>
                        {task.completed ? '✅ Fullført' : '❌ Ikke fullført'}
                    </Text>

                    {task.approved && (
                        <Text style={styles.approvedStatus}>
                            🟢 Godkjent
                        </Text>
                    )}

                    {task.completed && task.completedAt && (
                        <Text style={{ fontSize: 12, color: '#666' }}>
                            Fullført av {task.childName ?? 'barn'}: {safeFormatDate(task.completedAt)}
                        </Text>
                    )}


                    {task.completed && !task.approved && (
                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                            <TouchableOpacity
                                style={styles.approveBtn}
                                onPress={() => {
                                    setSelectedTask(task);
                                    setModalVisible(true);
                                }}
                            >
                                <Text style={styles.approveText}>Bekreft</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.rejectBtn}
                                onPress={() => {
                                    setSelectedTask(task);
                                    setRejectModalVisible(true);
                                }}
                            >
                                <Text style={styles.rejectText}>Underkjenn</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                </View>
            ))}

            <ConfirmApprovalModal
                visible={modalVisible}
                task={selectedTask}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedTask(null);
                }}
                onConfirm={async () => {
                    if (householdId && selectedTask) {
                        try {
                            await confirmApproval(householdId, selectedTask);
                            setModalVisible(false);
                            setSelectedTask(null);
                        } catch (error) {
                            console.error('Feil ved bekreftelse av oppgave:', error);
                        }
                    }
                }}
            />

            <RejectConfirmationModal
                visible={rejectModalVisible}
                task={selectedTask}
                onCancel={() => {
                    setRejectModalVisible(false);
                    setSelectedTask(null);
                }}
                onConfirm={async () => {
                    if (householdId && selectedTask) {
                        await rejectTask(householdId, selectedTask.id);
                    }
                    setRejectModalVisible(false);
                    setSelectedTask(null);
                }}
            />

        </ScrollView>
    );
}

