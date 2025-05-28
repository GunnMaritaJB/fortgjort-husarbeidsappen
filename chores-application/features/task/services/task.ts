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
import { Task } from '../models/Task';
import { getRecurringDates } from '@/features/task/services/generateRecurringDates';
import {endOfDay, endOfMonth} from 'date-fns';
import { startOfDay, addDays } from 'date-fns';
import { shouldShowInParentView } from '@/features/task/services/taskFilter';




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

    const unsubscribe = onSnapshot(q, async (snapshot) => {
        const promises = snapshot.docs.map(async (doc) => {
            const task = { id: doc.id, ...(doc.data() as Omit<Task, 'id'>) };
            await resetIfExpired(doc.ref, task);
            return task;
        });

        const data = await Promise.all(promises);
        onUpdate(data.filter(shouldShowInParentView));
    });

    return unsubscribe;
};

export const createTaskForCurrentUser = async (task: {
    name: string;
    points: number;
    recurring: boolean;
    repeatDays: string[];
    dateForCompletion: Date | null;
    assignedChildIds: string[]; // brukes fortsatt
    visibleToChild: boolean;
}) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) throw new Error('Bruker ikke innlogget');

    const parentDoc = await getDoc(doc(db, 'parents', uid));
    const householdId = parentDoc.data()?.householdId;
    if (!householdId) throw new Error('Fant ikke householdId');

    for (const childId of task.assignedChildIds) {
        await addDoc(collection(db, collections.tasksByHousehold(householdId)), {
            name: task.name,
            points: task.points,
            recurring: task.recurring,
            repeatDays: task.repeatDays,
            dateForCompletion: task.dateForCompletion
                ? Timestamp.fromDate(task.dateForCompletion)
                : null,
            visibleToChild: task.visibleToChild,
            addedBy: uid,
            householdId,
            childId,
            approved: false,
            completed: false,
            dateAssigned: serverTimestamp(),
        });
    }
};


export const confirmApproval = async (householdId: string, task: Task) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, task.id));
    await updateDoc(taskRef, { approved: true });

    const childRef = doc(db, collections.childDocPath(householdId, task.childId!));
    const childSnap = await getDoc(childRef);
    const currentPoints = childSnap.data()?.points ?? 0;

    await updateDoc(childRef, {
        points: currentPoints + task.points,
    });
};


export const deleteTask = async (householdId: string, taskId: string) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, taskId));
    await deleteDoc(taskRef);
};

export const listenToTasksForChild = (
    householdId: string,
    childId: string,
    onUpdate: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void,
    options?: { showCompletedAndApproved?: boolean }
): (() => void) => {
    const q = query(
        collection(db, collections.tasksByHousehold(householdId)),
        where('childId', '==', childId)
    );

    const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
            const now = new Date();

            const getDeadlineDate = (date: Timestamp | number | undefined | null): Date => {
                if (!date) return new Date(8640000000000000);
                if (typeof date === 'number') return new Date(date);
                if ('toDate' in date) return date.toDate();
                return new Date(8640000000000000);
            };

            const data: Task[] = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as Task))
                .filter(task => {
                    const deadline = getDeadlineDate(task.dateForCompletion);
                    return (
                        (options?.showCompletedAndApproved || !(task.completed && task.approved)) &&
                        deadline >= startOfDay(now) &&
                        task.visibleToChild
                    );
                });

            onUpdate(data);
            setLoading(false);
        },
        (error) => {
            console.error('🔥 Feil ved snapshot:', error);
            setLoading(false);
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
    await updateDoc(taskRef, {
        completed,
        completedAt: completed ? Date.now() : null,
    });
};

export const rejectTask = async (householdId: string, taskId: string) => {
    const taskRef = doc(db, collections.taskDocPath(householdId, taskId));
    await updateDoc(taskRef, {
        completed: false,
        approved: false,
        completedAt: null,
    });
};


export const resetIfExpired = async (taskRef: any, task: Task): Promise<void> => {
    const now = new Date();
    const deadlineDate = (task.dateForCompletion as any)?.toDate?.() ?? new Date(8640000000000000);
    const expired = now > endOfDay(deadlineDate); // 🟢 Endringen er her

    if (!expired) return;

    if (task.recurring && Array.isArray(task.repeatDays)) {
        const now = new Date();
        const deadlineDate = (task.dateForCompletion as any)?.toDate?.() ?? new Date(8640000000000000);
        const expired = now > endOfDay(deadlineDate);

        if (task.completed && !task.approved) return;

        if (expired) {
            const upcoming = getRecurringDates(task.repeatDays, now, endOfMonth(now));
            const next = upcoming.find(d => d > now);

            await updateDoc(taskRef, {
                completed: false,
                approved: false,
                completedAt: null,
                dateAssigned: Timestamp.now(),
                dateForCompletion: next ? Timestamp.fromDate(next) : null,
            });
        }
    }

    if (!task.recurring && task.completed && task.approved) {
        await updateDoc(taskRef, {
            completed: false,
            approved: false,
            completedAt: null,
            dateAssigned: Timestamp.now(),
        });
    }
};



