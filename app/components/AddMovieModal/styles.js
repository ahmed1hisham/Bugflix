import {StyleSheet, Dimensions} from 'react-native';
import {grey, red, veryDarkGrey, white} from '../../theme/colors';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  modalBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: veryDarkGrey,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.7,
    padding: 15,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
  },
  titleStyle: {
    fontSize: 24,
    color: white,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    width: 135,
    height: 150,
    marginBottom: 15,
  },
  imageStyle: {width: 135, height: '100%', resizeMode: 'contain'},
  contentContainerStyle: {alignItems: 'center', paddingTop: 10},
  movieTitleStyle: {marginBottom: 10},
  saveButtonContainer: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  saveButton: {
    padding: 15,
    width: 75,
    backgroundColor: red,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: white,
    fontSize: 16,
    fontWeight: '500',
  },
  datePickerField: {
    backgroundColor: grey,
    width: '100%',
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateFieldText: {
    fontSize: 18,
    fontWeight: '500',
  },
  imageTouchable: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
