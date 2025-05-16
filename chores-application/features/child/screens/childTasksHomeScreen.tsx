import React, { useEffect, useState } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import CompleteTaskModal from '@/features/child/components/completeTaskModal';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import { listenToTasksForChild, toggleTaskCompletion } from '@/features/task/services/task';
import {styles} from '@/features/task/styles/taskHomeScreenStyles'
import{Task} from '@/features/task/models/Task'



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
        if (name.includes('rydd') || name.includes('rydde')) return '🧹✨';
        if (name.includes('vask') || name.includes('vaske')) return '🫧🧼';
        if (name.includes('oppvask') || name.includes('oppvasken')) return '🍽️🫧';
        if (name.includes('soppel') || name.includes('søppel')
            || name.includes('søppelet')|| name.includes('soppelet')) return '🗑️🚮';

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
