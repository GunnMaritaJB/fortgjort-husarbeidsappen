import { styles } from '@/features/child/styles/completeTaskModalStyles';
import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

type Props = {
    visible: boolean;
    task: any;
    onConfirm: () => void;
    onCancel: () => void;
};

const CompleteTaskModal = ({ visible, task, onConfirm, onCancel }: Props) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const isCompleted = task?.completed;

    const [shouldShowConfetti, setShouldShowConfetti] = useState(false);
    const [confettiKey, setConfettiKey] = useState(0);

    const handlePress = () => {
        const shouldCelebrate = !task?.completed;

        if (shouldCelebrate) {
            Animated.sequence([
                Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
                Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();

            setShouldShowConfetti(true);
            setConfettiKey(prev => prev + 1);
            setTimeout(() => setShouldShowConfetti(false), 1800);
        }

        onConfirm();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                {shouldShowConfetti && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                        <ConfettiCannon
                            key={confettiKey}
                            count={70}
                            origin={{ x: 200, y: 10 }}
                            explosionSpeed={350}
                            fallSpeed={3000}
                            fadeOut
                        />
                    </View>
                )}

                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.modalText}>
                        {isCompleted
                            ? 'Er du sikker på at du vil angre?'
                            : 'Er du ferdig med denne oppgaven?'}
                    </Text>
                    <Text style={styles.taskName}>{task?.name?.toUpperCase()}</Text>

                    <View style={styles.emojiRow}>
                        <TouchableOpacity onPress={handlePress} style={styles.emojiButton}>
                            <Text style={styles.emoji}>{isCompleted ? '❌' : '🎉'}</Text>
                            <Text style={styles.buttonLabel}>
                                {isCompleted ? 'Ja, angre' : 'Ja!'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={styles.emojiButton}>
                            <Text style={styles.emoji}>{isCompleted ? '🙂' : '😐'}</Text>
                            <Text style={styles.buttonLabel}>Nei</Text>
                        </TouchableOpacity>
                    </View>

                </Animated.View>
            </View>
        </Modal>
    );
};

export default CompleteTaskModal;
