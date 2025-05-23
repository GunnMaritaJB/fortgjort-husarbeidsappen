import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#F7FFF9' },
    noTasks: { textAlign: 'center', marginTop: 20, fontSize: 16 },
    taskCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
    points: { color: '#555', marginBottom: 8 },
    statusDone: { color: 'green', fontWeight: 'bold', marginBottom: 10 },
    statusTodo: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
    approveBtn: {
        backgroundColor: '#D4F1D7',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    approveText: { color: '#2e7d32', fontWeight: '600' },
    approvedStatus: {
        color: '#2e7d32',
        fontWeight: '600',
        fontSize: 14,
        marginTop: -4,
        marginBottom: 10,
    },
    dueDate: {
        fontSize: 13,
        color: '#555', // grå, lett å lese
        marginTop: 4,
        fontStyle: 'italic',
    },
    deadlineText: {
        fontSize: 12,
        color: '#333',
        marginBottom: 6,
    },
    rejectBtn: {
        backgroundColor: '#FDECEA',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    rejectText: {
        color: '#c62828',
        fontWeight: '600',
    },



});
