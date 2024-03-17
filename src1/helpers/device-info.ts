import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const getAppVersion = () => {
  return Constants.expoConfig?.version;
};

export const getBuildNumber = () => {
  return Platform.OS === 'android'
    ? Constants.expoConfig?.ios?.buildNumber
    : Constants.expoConfig?.android?.versionCode;
};
