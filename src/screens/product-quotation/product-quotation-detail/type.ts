import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type ProductQuotationDetailRouteProp = RouteProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_QUOTATION_DETAIL_SCREEN
>;

export type ProductQuotationDetailNavigationProp = NavigationProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_QUOTATION_DETAIL_SCREEN
>;

export type FormResponse = {
  response: string;
  medias: any[];
};
