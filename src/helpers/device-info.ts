import constants from 'expo-constants';

export const getAppVersion = () => {
  return constants.expoConfig?.version;
};
