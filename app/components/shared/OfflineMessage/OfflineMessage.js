import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export default OfflineMessage = (props) => {
  return props.isConnected === false ? (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  ) : null;
};
