import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    fabButton: {
        position: 'absolute',
        bottom: 40,
        left: 30,
        backgroundColor: '#FFD700',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    menuContainer: {
        position: 'absolute',
        paddingTop: 20,
        top: 100,
        right: 20,
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 70,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: 200,
        height: 100,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    menuText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4D4421',
        textAlign: 'center',
    },
    fabButtonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 30,
        zIndex: 99, // sørger for at den alltid vises over menyen
    },

});