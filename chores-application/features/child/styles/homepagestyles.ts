import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
    },
    topSection: {
        alignItems: 'center',
        marginBottom: 50,
    },
    avatarCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    avatar: {
        fontSize: 80,
    },
    greeting: {
        fontSize: 40,
        fontWeight: '700',
        color: '#4D4421',
    },
    starburst: {
        backgroundColor: '#FFD600',
        padding: 20,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#FFCA28',
        alignItems: 'center',
    },
    points: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    pointsLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    goalSection: {
        marginTop: 30,
        alignItems: 'center',
    },
    goalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    progressBar: {
        width: 250,
        height: 20,
        flexDirection: 'row',
        backgroundColor: '#C8E6C9',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressFill: {
        backgroundColor: '#388E3C',
        height: '100%',
    },
    remaining: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    setGoalButton: {
        backgroundColor: '#FFEB3B',
        padding: 14,
        borderRadius: 10,
        elevation: 4,
    },
    setGoalText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0006',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        maxWidth: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
