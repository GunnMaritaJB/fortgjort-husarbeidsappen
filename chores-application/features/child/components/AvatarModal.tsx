import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AvatarPicker from '@/features/parent/components/avatarPicker';
import {Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    visible: boolean;
    selected: string;
    onClose: () => void;
    onSelect: (avatar: string) => void;
};



export default function AvatarModal({ visible, selected, onClose, onSelect }: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialIcons name="cancel" size={44} color="#E53935" />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Velg din avatar</Text>
                    <AvatarPicker selected={selected} size="large" onSelect={(newAvatar) => {onSelect(newAvatar);
                            onClose();
                        }}
                    />
                </View>


            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0006',
        paddingHorizontal: 10,
    },

    modalContent: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 32,
        width: '95%',
        height: 600,
        maxHeight: '80%',
        elevation: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },


    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#4D4421',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 20,
        padding: 4,
    },
    closeText: {
        fontSize: 28,
        color: '#E53935',
        fontWeight: 'bold',
    },
});
