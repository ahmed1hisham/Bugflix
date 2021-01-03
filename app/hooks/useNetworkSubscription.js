import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkSubscription = (initialValue) => {
  const [isConnected, setIsConnected] = useState(initialValue);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [isConnected, setIsConnected];
};
