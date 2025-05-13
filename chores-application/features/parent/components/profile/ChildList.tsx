import { FlatList } from 'react-native';
import ChildItem from './ChildItem';
import {Child} from "@/features/child/models/Child";

type Props = {
    children: Child[];
    householdId: string | null;
};

export default function ChildList({ children, householdId }: Props) {
    return (
        <FlatList
            data={children}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ChildItem
                    id={item.id}
                    firstName={item.firstName}
                    avatar={item.avatar}
                    householdId={householdId}
                />
            )}
            style={{ marginTop: 16 }}
        />
    );
}