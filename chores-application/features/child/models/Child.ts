export interface Child {
    id: string;
    firstName: string;
    householdId: string;
    avatar: string;
    dob: string;
    points: number;

    goal?: {
        rewardId: string;
        title: string;
        cost: number;
    };
}
