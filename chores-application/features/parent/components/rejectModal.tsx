import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/features/task/models/Task';
import {styles} from '@/features/parent/styles/tasks/rejectModalStyles';
type Props = {
    visible: boolean;
    task: Task | null;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function RejectConfirmationModal({ visible, task, onCancel, onConfirm }: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Underkjenn oppgave</Text>
                    <Text style={styles.message}>
                        Er du sikker på at du vil underkjenne {task?.name?.toLowerCase()}?
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Avbryt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Underkjenn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

