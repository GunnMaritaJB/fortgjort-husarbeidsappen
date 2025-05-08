import { View } from 'react-native';
import { childProfileStyles as styles } from '@/features/parent/styles/childProfileStyles';
import ChildProfileButton from './ChildProfileButtons';
import { Alert } from 'react-native';
import { deleteChild } from '@/features/parent/services/child';
import {router} from "expo-router";


type Props = {
    onShowRewards: () => void;
    onShowTasks: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

export default function ChildProfileActions({
                                                onShowRewards,
                                                onShowTasks,
                                                onEdit,
                                                onDelete,
                                            }: Props) {
    return (
        <View style={styles.actionContainer}>
            <ChildProfileButton title="Vis belønninger" onPress={onShowRewards} />
            <ChildProfileButton title="Vis tasks" onPress={onShowTasks} />
            <ChildProfileButton title="Rediger profil" onPress={onEdit} />
            <ChildProfileButton title="Slett profil" onPress={onDelete} />
        </View>
    );
}
