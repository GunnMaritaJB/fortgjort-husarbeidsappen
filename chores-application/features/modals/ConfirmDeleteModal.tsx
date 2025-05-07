// features/parent/components/ConfirmDeleteModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({ visible, onCancel, onConfirm }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Slett profil</Text>
                    <Text style={styles.message}>Er du sikker på at du vil slette denne barneprofilen?</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
                            <Text style={styles.cancelText}>Avbryt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.delete]} onPress={onConfirm}>
                            <Text style={styles.deleteText}>Slett</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancel: {
        backgroundColor: '#ccc',
    },
    delete: {
        backgroundColor: '#e57373',
    },
    cancelText: {
        color: '#333',
        fontWeight: 'bold',
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
