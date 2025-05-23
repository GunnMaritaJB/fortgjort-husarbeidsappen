import React from 'react';
import {Modal, View, Text, TouchableOpacity, Pressable,} from 'react-native';
import { Task } from '@/features/task/models/Task';
import {styles} from '@/features/parent/styles/tasks/approvModalStyles'

type Props = {
    visible: boolean;
    task: Task | null;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmApprovalModal({
                                                 visible,
                                                 task,
                                                 onCancel,
                                                 onConfirm,
                                             }: Props) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <Pressable style={styles.overlay} onPress={onCancel}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Bekreft oppgave</Text>
                    <Text style={styles.text}>
                        Er du sikker på at du vil bekrefte oppgaven{' '}
                        <Text style={{ fontWeight: 'bold' }}>{task?.name}</Text>?
                    </Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Avbryt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
                            <Text style={styles.confirmText}>Ja, bekreft</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}
