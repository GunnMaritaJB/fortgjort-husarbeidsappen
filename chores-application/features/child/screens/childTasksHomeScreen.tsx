import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useGlobalSearchParams } from 'expo-router';
import { collections } from '@/shared/paths/firebasePaths';
import CompleteTaskModal from '@/features/child/components/completeTaskModal';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Task, listenToTasksForChild, toggleTaskCompletion } from '@/features/task/services/task';



export default function ChildTasksHomeScreen() {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const rawParams = useGlobalSearchParams();
    const childId = typeof rawParams.id === 'string' ? rawParams.id : Array.isArray(rawParams.id) ? rawParams.id[0] : null;
    const householdId = typeof rawParams.householdId === 'string' ? rawParams.householdId : Array.isArray(rawParams.householdId) ? rawParams.householdId[0] : null;

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!childId || !householdId) return;
        const unsubscribe = listenToTasksForChild(householdId, childId, setTasks, setLoading);
        return unsubscribe;
    }, [childId, householdId]);


    const confirmTaskDone = async () => {
        if (!selectedTask || typeof householdId !== 'string') return;
        await toggleTaskCompletion(householdId, selectedTask.id, !selectedTask.completed);
        setModalVisible(false);
        setSelectedTask(null);
    };

    const handleCompleteTask = (task: any) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const getEmoji = (taskName: string) => {
        const name = taskName.toLowerCase();
        if (name.includes('ryd')) return '🧹✨';
        if (name.includes('vaske')) return '🫧🧼';
        if (name.includes('oppvask')) return '🍽️🫧';
        return '🌟';
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.completed]}
            onPress={() => handleCompleteTask(item)}
        >
            <Text style={styles.taskTitle}>
                {getEmoji(item.name)} {item.name.toUpperCase()}
            </Text>
            <Text style={styles.taskPoints}>{item.points} poeng</Text>
            {item.completed && <Text style={styles.taskStatus}>✅ Fullført</Text>}
        </TouchableOpacity>
    );

    if (loading) return <Text style={{ textAlign: 'center', marginTop: 100 }}>Laster oppgaver...</Text>;

    return (
        <LinearGradient
            colors={['#D7FBE8', '#FFF8DC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
        >

        <View style={styles.container}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
                <CompleteTaskModal
                    visible={modalVisible}
                    task={selectedTask}
                    onConfirm={confirmTaskDone}
                    onCancel={() => setModalVisible(false)}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    taskCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 8,
        paddingVertical: 20,
        paddingHorizontal: 14,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        minHeight: 130,
        borderWidth: 2,
        borderColor: '#AED581', // frisk grønn
    },
    completed: {
        backgroundColor: '#E6F4EA',
        borderColor: '#43A047',
    },
    taskTitle: {
        fontWeight: '800',
        fontSize: 18,
        color: '#1B5E20',
        marginBottom: 6,
        textAlign: 'center',
    },
    taskPoints: {
        fontSize: 15,
        color: '#616161',
        marginBottom: 6,
    },
    taskStatus: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '600',
    },

    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },

});
