import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEVICE_ID } from '../constants';
// import { getFirebaseDeviceId } from '../helpers';

export const initDeviceId = async () => {
  // const deviceId = await getFirebaseDeviceId();

  await AsyncStorage.setItem(DEVICE_ID, '');
};
