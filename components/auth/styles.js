import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  validationView: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 3,
  },
  validationText: {
    color: 'red',
  },
  submitButton: {
    margin: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  formInput: {
    margin: 6,
  },
  submitErrorView: {
    backgroundColor: '#F25050',
    padding: 8,
    margin: 6,
    borderRadius: 10,
  },
  submitErrorText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default styles;