import {StyleSheet, Dimensions} from 'react-native';
import {white} from '../../../theme/colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    top: getStatusBarHeight(),
  },
  offlineText: {
    color: white,
    fontSize: 16,
  },
});
