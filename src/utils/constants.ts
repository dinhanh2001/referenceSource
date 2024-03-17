import { Platform, Dimensions } from 'react-native';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 812;
