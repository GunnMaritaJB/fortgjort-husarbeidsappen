import { StyleSheet } from 'react-native';

export const menuStyles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 220,
        height: '100%',
        backgroundColor: '#ffffffee',
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1000,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    logoutButton: {
        marginBottom: 20,
        paddingVertical: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    },
    close: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
        textAlign: 'center',
    },
    hamburgerButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2000,
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 6,
        elevation: 4,
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 999,
    },


});
