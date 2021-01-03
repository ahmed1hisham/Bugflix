import {StyleSheet, Dimensions, Platform} from 'react-native';
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
    top: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    zIndex: 10,
  },
  offlineText: {
    color: white,
    fontSize: 16,
  },
});
