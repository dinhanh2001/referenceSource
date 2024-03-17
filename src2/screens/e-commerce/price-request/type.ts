import { NavigationProp, RouteProp } from '@react-navigation/native';

import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import {
  AppStackNavigatorParamList,
  AppStackNavigatorScreenProps,
  UseAppStackNavigatorScreenProps,
} from '../../../navigator-params';

export type ECommercePriceRequestTabScreenParam = {
  type: ProductQuotationStatusEnum;
  refetchBadge?(): Promise<any>;
};

export type ECommercePriceRequestTabParamList = {
  'e-commerce/my-order/wait-for-confirm': ECommercePriceRequestTabScreenParam;
  'e-commerce/my-order/complete': ECommercePriceRequestTabScreenParam;
};

export type ECommercePriceRequestTabRouteProp = RouteProp<
  ECommercePriceRequestTabParamList,
  'e-commerce/my-order/wait-for-confirm'
>;

export type ECommercePriceRequestNavigationProp = NavigationProp<AppStackNavigatorParamList>;
export type ECommercePriceRequestFormNavigationProp =
  UseAppStackNavigatorScreenProps<'e-commerce/price-request-form-quotation'>;

export type ECommercePriceRequestFormQuotationRouteProp =
  AppStackNavigatorScreenProps<'e-commerce/price-request-form-quotation'>['route'];
export type ECommercePriceRequestDetailQuotationRouteProp =
  AppStackNavigatorScreenProps<'e-commerce/price-request-detail'>['route'];

export type FormQuotation = {
  count: number;
  question: string;
};
