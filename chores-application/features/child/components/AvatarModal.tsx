import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import AvatarPicker from '@/features/parent/components/avatarPicker';
import{styles} from '@/features/child/styles/avatarModalStyles'
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

