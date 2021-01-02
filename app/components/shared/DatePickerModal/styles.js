import {StyleSheet, Dimensions} from 'react-native';
import {red, veryDarkGrey} from '../../../theme/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  doneButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  doneButtonText: {
    fontSize: 18,
    color: red,
    fontWeight: 'bold',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: veryDarkGrey,
    borderRadius: 10,
    paddingVertical: 15,
    width: width * 0.84,
  },
});
