import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export interface Task {
    id: string; 
    childId: string;
    addedBy: string;
    approved: boolean;
    completed: boolean;
    dateAssigned: Timestamp;
    dateForCompletion: Timestamp;
    name: string;
    points: number;
    recurring: boolean;
    repeatDays?: string[];
}
