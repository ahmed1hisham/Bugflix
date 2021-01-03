import {StyleSheet, Dimensions} from 'react-native';
import {veryDarkGrey, white, lightGrey, grey} from '../../../theme/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  movieCardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: width - 30,
    marginVertical: 7.5,
    backgroundColor: veryDarkGrey,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: grey,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
    height: width > 360 ? 200 : 180,
  },
  titleStyle: {
    fontSize: width > 360 ? 24 : 20,
    color: white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateStyle: {
    fontSize: 16,
    color: lightGrey,
    marginBottom: 15,
  },
  overviewStyle: {
    width: '100%',
    flexWrap: 'wrap',
    fontSize: 16,
    color: lightGrey,
  },
  imageContainerStyle: {
    flex: 2,
    width: width > 360 ? 135 : 120,
    height: '100%',
  },
  imageStyle: {
    width: width > 360 ? 135 : 120,
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {padding: 10, flex: 3},
});
