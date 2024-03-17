import { Platform, Dimensions } from 'react-native';

import { OperatingUnitEnum } from '../graphql/type.interface';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 812;

export const STORAGE_KEY = {
  recentSearchedLocation: 'recentSearchedLocation',
};

export enum USER_TYPE {
  KTV = 'KTV',
  CUSTOMER = 'CUSTOMER',
}

export const OPERATING_UNIT: any = {
  [OperatingUnitEnum.HOURS]: 'Giờ',
  [OperatingUnitEnum.KM]: 'Km',
};

export const KEY_STORAGE = {
  SEARCH_E_COMMERCE: 'serch-e-commerce',
};
