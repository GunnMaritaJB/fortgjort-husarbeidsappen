// features/task/services/taskService.ts
import {
    collection,
    doc,
    getDoc,
    addDoc,
    serverTimestamp,
    onSnapshot,
    orderBy,
    query,
    where,
    updateDoc,
    Timestamp, deleteDoc,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collections } from '@/shared/paths/firebasePaths';


export type Task = {
    id: string;
    name: string;
    points: number;
    completed: boolean;
    approved: boolean;
    dateForCompletion?: Timestamp;
    dateAssigned?: Timestamp;
    assignedTo: string[];
    recurring: boolean;
    repeatDays: string[];
    addedBy: string;
    householdId: string;
};

// ✅ Hent oppgaver for forelder
export const listenToTasksForParent = async (
    onUpdate: (tasks: Task[]) => void
): Promise<() => void> => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) return () => {};

    const parentDoc = await getDoc(doc(db, 'parents', uid));
    const householdId = parentDoc.data()?.householdId;
    if (!householdId) return () => {};

    const q = query(
        collection(db, collections.tasksByHousehold(householdId)),
        orderBy('dateAssigned', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: Task[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Task, 'id'>),
        }));
        onUpdate(data);
    });

    return unsubscribe;
};

export const createTaskForCurrentUser = async (task: {
    name: string;
    points: number;
    recurring: boolean;
    repeatDays: string[];
    dateForCompletion: Date | null;
    assignedChildIds: string[];
    visibleToChild: boolean;
}) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) throw new Error('Bruker ikke innlogget');

    const parentDoc = await getDoc(doc(db, 'parents', uid));
    const householdId = parentDoc.data()?.householdId;
    if (!householdId) throw new Error('Fant ikke householdId');

    await addDoc(collection(db, collections.tasksByHousehold(householdId)), {
        name: task.name,
        points: task.points,
        addedBy: uid,
        householdId,
        approved: false,
        completed: false,
        recurring: task.recurring,
        repeatDays: task.repeatDays,
        dateAssigned: serverTimestamp(),
        dateForCompletion: task.dateForCompletion
            ? Timestamp.fromDate(task.dateForCompletion)
            : null,
        assignedTo: task.assignedChildIds,
        visibleToChild: task.visibleToChild,
    });
};

import { getRecurringDates } from '@/features/task/services/generateRecurringDates'; // sørg for riktig path

export const approveTask = async (householdId: string, taskId: string) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, taskId));
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) throw new Error('Fant ikke oppgaven');

    const task = taskSnap.data();

    if (task.recurring && Array.isArray(task.repeatDays)) {
        //const nextDate = getRecurringDates(task.repeatDays);

        await updateDoc(taskRef, {
            completed: false,
            approved: false,
           // dateForCompletion: nextDate,
            dateAssigned: serverTimestamp(),
        });
    } else {
        await updateDoc(taskRef, { approved: true });
    }
};


// 🆕 Fjern task
export const deleteTask = async (householdId: string, taskId: string) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, taskId));
    await deleteDoc(taskRef);
};

export const listenToTasksForChild = (
    householdId: string,
    childId: string,
    onUpdate: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
): (() => void) => {
    const q = query(
        collection(db, collections.tasksByHousehold(householdId)),
        where('assignedTo', 'array-contains', childId)
    );

    const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
            const now = new Date();
            const data: Task[] = snapshot.docs
                .map(doc => {
                    const task = { id: doc.id, ...doc.data() } as Task;
                    return task;
                })
                .filter(task => {
                    const deadline = task.dateForCompletion?.toDate?.() ?? new Date(8640000000000000);
                    const keep = !(task.completed && task.approved) && deadline >= now;
                    return keep;
                });

            onUpdate(data);
            setLoading(false);
        },
        (error) => {
            console.error('🔥 Feil ved snapshot:', error);
        }
    );

    return unsubscribe;
};

export const toggleTaskCompletion = async (
    householdId: string,
    taskId: string,
    completed: boolean
) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, taskId));
    await updateDoc(taskRef, { completed });
};