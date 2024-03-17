import { RouteProp } from '@react-navigation/native';

import {
  AppStackNavigatorParamList,
  AppStackNavigatorScreenProps,
  UseAppStackNavigatorScreenProps,
} from '../../../navigator-params';

export type ECommerceSearchNavigationProp = UseAppStackNavigatorScreenProps<'e-commerce/search-result'>;

export type ECommerceSearchResultRouteProp = AppStackNavigatorScreenProps<'e-commerce/search-result'>['route'];

export enum ECommerceSearchResultTabEnum {
  ALL,
  DEPARTMENT,
  NEW,
  OLD,
  ACCESSORY,
}

export type ECommerceSearchResultTabScreenParam = {
  type: ECommerceSearchResultTabEnum;
  search?: string;
};

export type ECommerceSearchResultTabParamList = {
  'e-commerce/search-result/all': ECommerceSearchResultTabScreenParam;
  'e-commerce/search-result/department': ECommerceSearchResultTabScreenParam;
  'e-commerce/search-result/new': ECommerceSearchResultTabScreenParam;
  'e-commerce/search-result/old': ECommerceSearchResultTabScreenParam;
  'e-commerce/search-result/accessory': ECommerceSearchResultTabScreenParam;
};

export type ECommerceSearchResultListRouteProp = RouteProp<
  ECommerceSearchResultTabParamList,
  'e-commerce/search-result/all'
>;

export type ECommerceSearchFilterRouteProps = RouteProp<AppStackNavigatorParamList, 'e-commerce/search-filter'>;
export type ECommerceSearchFilterNavigationProps = UseAppStackNavigatorScreenProps<'e-commerce/search-filter'>;
