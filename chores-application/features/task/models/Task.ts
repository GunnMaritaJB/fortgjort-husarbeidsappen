import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export interface Task {
    id: string;
    name: string;
    points: number;
    approved: boolean;
    completed: boolean;
    completedAt?: number | null;
    dateAssigned: Timestamp;
    dateForCompletion: Timestamp | null;
    recurring: boolean;
    repeatDays?: string[];
    childId: string;
    childName?: string;
    householdId: string;
    visibleToChild: boolean;
}
