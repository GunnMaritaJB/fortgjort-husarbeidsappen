import { StyleSheet } from 'react-native';

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdfb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  grayButton: {
    backgroundColor: '#dadada',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  grayButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  blueButton: {
    backgroundColor: '#2e81f4',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
  },
  blueButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
