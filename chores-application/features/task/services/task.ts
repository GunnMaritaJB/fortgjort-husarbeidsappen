import { db } from '@/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc,addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Task } from '@/features/task/models/Task';
import { collections } from '@/shared/paths/firebasePaths';


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
        const data: Task[] = snapshot.docs.map(doc => ({
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
        dateForCompletion: task.recurring ? null : task.dateForCompletion,
    });
};