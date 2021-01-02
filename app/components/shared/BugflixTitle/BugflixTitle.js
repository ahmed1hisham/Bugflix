import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

export default BugflixTitle = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/images/Header.png')}
      />
    </View>
  );
};
