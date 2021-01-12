import 'react-native-gesture-handler/jestSetup';
import * as ReactNative from 'react-native';

jest.mock('react-native-gesture-handler', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('react-native-reanimated', () => {
  const {View} = require('react-native');
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View,
    Extrapolate: {CLAMP: jest.fn()},
    Clock: jest.fn(),
    greaterThan: jest.fn(),
    lessThan: jest.fn(),
    startClock: jest.fn(),
    stopClock: jest.fn(),
    clockRunning: jest.fn(),
    not: jest.fn(),
    or: jest.fn(),
    and: jest.fn(),
    spring: jest.fn(),
    decay: jest.fn(),
    defined: jest.fn(),
    call: jest.fn(),
    block: jest.fn(),
    abs: jest.fn(),
    greaterOrEq: jest.fn(),
    lessOrEq: jest.fn(),
    debug: jest.fn(),
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
    Easing: {
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});

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

jest.mock('@react-native-community/netinfo', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  return {
    RNVectorIconsManager: jest.mock(),
    createIconSetFromIcoMoon: jest.fn(),
  };
});

jest.mock('react-native-tab-view');
