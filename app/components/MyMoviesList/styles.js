import {StyleSheet} from 'react-native';
import {veryDarkGrey, white} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryDarkGrey,
    alignItems: 'center',
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreActivityIndicator: {
    marginTop: 20,
  },
  emptyMoviesView: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  emptyMoviesText: {
    width: '80%',
    fontSize: 20,
    color: white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
