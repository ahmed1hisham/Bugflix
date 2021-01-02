import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {veryDarkGrey} from './app/theme/colors';
import HomeScreen from './app/screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount() {
    Icon.loadFont();
    SplashScreen.hide();
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor={veryDarkGrey} barStyle="light-content" />
        <HomeScreen />
      </>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
