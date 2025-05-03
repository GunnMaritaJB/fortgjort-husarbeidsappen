import { StyleSheet } from 'react-native';
import { sharedAuthStyles } from './sharedAuthStyles';

export const loginStyles = StyleSheet.create({
  ...sharedAuthStyles,
  backButton: {
    marginBottom: 16,
  },
  title: {
    ...sharedAuthStyles.title,
    marginBottom: 80, 
  },
  loginButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    ...sharedAuthStyles.buttonText,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  link: {
    fontSize: 14,
    color: 'black',
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 16,
  },
});
