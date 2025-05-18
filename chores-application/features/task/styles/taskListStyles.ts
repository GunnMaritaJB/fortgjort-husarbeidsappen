import { StyleSheet } from 'react-native';
export const taskListStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f1fefe',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 12,
    },
    filter: {
        fontWeight: '600',
        fontSize: 14,
    },
    noTasks: {
        textAlign: 'center',
        marginTop: 32,
        color: '#999',
    },
    taskItem: {
        backgroundColor: '#e3f3f2',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    taskText: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    dueDate: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#ffe4e4',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    deleteButtonText: {
        color: '#a00',
        fontWeight: '600',
        fontSize: 13,
    },

    statusPending: {
        backgroundColor: '#fff3cd',
        color: '#856404',
    },
    statusApproved: {
        backgroundColor: '#E6F4EA', // lys grønn
        color: '#1E7F3D',
    },
    statusCompleted: {
        backgroundColor: '#E6F4EA',
        color: '#B95C00',
    },
    statusVisible: {
        backgroundColor: '#DDEBF8', // blå
        color: '#005A9C',
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },



});
