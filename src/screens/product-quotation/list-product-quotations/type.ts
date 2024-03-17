import { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type ProductQuotationTabScreenParam = {
  status: ProductQuotationStatusEnum;
  refetchBadges?(): Promise<any>;
};

export type ProductQuotationTabParamList = {
  [ProductQuotationStatusEnum.SENT]: ProductQuotationTabScreenParam;
  [ProductQuotationStatusEnum.RESPONDED]: ProductQuotationTabScreenParam;
};

export type ProductQuotationTabRouteProp = RouteProp<ProductQuotationTabParamList, ProductQuotationStatusEnum.SENT>;

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN>;

export type ProductQuotationTabNavigationProps = PropsType['navigation'];
export type ProductQuotationListRouteProp = RouteProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN
>;
