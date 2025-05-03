import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export interface Purchase {
    id: string;
    childId: string;
    rewardId: string;
    timeStamp: Timestamp;
    used: boolean;
}
