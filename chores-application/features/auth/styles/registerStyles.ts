import { StyleSheet } from 'react-native';
import { sharedAuthStyles } from './sharedAuthStyles';

export const registerStyles = StyleSheet.create({
  ...sharedAuthStyles,
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
