import { StyleSheet } from 'react-native';

export const taskListStyles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f1fefe' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
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
        marginBottom: 10,
    },
    filter: { fontWeight: '600', fontSize: 14 },
    noTasks: { textAlign: 'center', marginTop: 32, color: '#999' },
    taskItem: {
        backgroundColor: '#e3f3f2',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
    },
    dueDate: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
});
