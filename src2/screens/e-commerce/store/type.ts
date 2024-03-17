import { RouteProp } from '@react-navigation/native';

import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../../navigator-params';

export enum ECommerceStoreTabEnum {
  HOME,
  PRODUCTS,
  REVIEW,
}

export type ECommerceStoreTabScreenParam = {
  type: ECommerceStoreTabEnum;
  storeId: string;
};

export type ECommerceStoreTabParamList = {
  'e-commerce/store/home': ECommerceStoreTabScreenParam;
  'e-commerce/store/products': ECommerceStoreTabScreenParam;
  'e-commerce/store/review': ECommerceStoreTabScreenParam;
};

export type ECommerceStoreDetailRouteProp = AppStackNavigatorScreenProps<'e-commerce/store-detail'>['route'];

export type ECommerceHomeStoreListRouteProp = RouteProp<ECommerceStoreTabParamList, 'e-commerce/store/home'>;

export type ECommerceHomeStoreListNavigationProps = UseAppStackNavigatorScreenProps<'e-commerce/store-detail'>;
