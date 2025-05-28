// features/task/utils/taskFilters.ts
import { Task } from '../models/Task';
import { startOfDay } from 'date-fns';

const getDeadline = (raw: any): Date => {
    if (!raw) return new Date(8640000000000000);
    if (typeof raw === 'number') return new Date(raw);
    if (typeof raw?.toDate === 'function') return raw.toDate();
    return new Date(raw);
};

export const shouldShowInParentView = (task: Task): boolean => {
    const now = new Date();
    const deadline = getDeadline(task.dateForCompletion);
    if (task.completed && !task.approved) return true;
    if (!task.completed && deadline >= startOfDay(now)) return true;
    return !(task.completed && task.approved && deadline < startOfDay(now));
};
