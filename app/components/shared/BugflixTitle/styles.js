import {StyleSheet} from 'react-native';
import {red} from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 42,
    width: '100%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 42,
    color: red,
    fontWeight: 'bold',
  },
});
