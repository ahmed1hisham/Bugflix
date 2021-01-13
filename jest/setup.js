import 'react-native-gesture-handler/jestSetup';
import * as ReactNative from 'react-native';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

jest.mock('react-native', () => {
  return Object.setPrototypeOf(
    {
      StyleSheet: {
        ...ReactNative.StyleSheet,
        create: jest.fn((e) => e),
      },
    },
    ReactNative,
  );
});

jest.mock('react-native-tab-view');
jest.mock('react-native-vector-icons', () => {
  return {
    RNVectorIconsManager: jest.mock(),
    createIconSetFromIcoMoon: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {});
