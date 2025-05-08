import { StyleSheet } from 'react-native';

export const confirmEmailStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2fefc',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2e81f4',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
