import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import NetInfo from '@react-native-community/netinfo';

export default OfflineMessage = (props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected === false ? (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  ) : null;
};
