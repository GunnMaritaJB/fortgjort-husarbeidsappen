import { FlatList } from 'react-native';
import ChildItem from './ChildItem';

type Child = {
    id: string;
    firstName: string;
    avatar: string;
};

export default function ChildList({ children }: { children: Child[] }) {
    return (
        <FlatList
            data={children}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ChildItem id={item.id} firstName={item.firstName} avatar={item.avatar} />
            )}
            style={{ marginTop: 16 }}
        />
    );
}
