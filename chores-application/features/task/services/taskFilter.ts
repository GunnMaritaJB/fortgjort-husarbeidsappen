// features/task/utils/taskFilters.ts
import { Task } from '../models/Task';
import { startOfDay } from 'date-fns';

const getDeadline = (raw: any): Date => {
    if (!raw) return new Date(8640000000000000); // FJERN i praksis
    if (typeof raw === 'number') return new Date(raw);
    if (typeof raw?.toDate === 'function') return raw.toDate();
    return new Date(raw);
};

export const shouldShowInChildView = (task: Task): boolean => {
    const now = new Date();
    const deadline = getDeadline(task.dateForCompletion);

    return (
        task.visibleToChild &&
        !task.approved &&
        (
            (task.completed && !task.approved) ||
            (!task.completed && deadline >= startOfDay(now))
        )
    );
};

export const shouldShowInParentView = (task: Task): boolean => {
    const now = new Date();
    const deadline = getDeadline(task.dateForCompletion);

    // vis alltid om ikke godkjent
    if (task.completed && !task.approved) return true;

    // vis frem til frist hvis ikke fullført
    if (!task.completed && deadline >= startOfDay(now)) return true;

    // hvis fullført OG godkjent, men frist er utløpt → skjul
    return !(task.completed && task.approved && deadline < startOfDay(now));
};
