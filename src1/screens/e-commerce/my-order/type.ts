import { RouteProp } from '@react-navigation/native';

import { OrderStatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList, UseAppStackNavigatorScreenProps } from '../../../navigator-params';

export type ECommerceMyOrderTabScreenParam = {
  statuses: OrderStatusEnum[];
  refetchBadge?(): Promise<any>;
};

export type ECommerceMyOrderTabParamList = {
  'e-commerce/my-order/wait-for-confirm': ECommerceMyOrderTabScreenParam;
  'e-commerce/my-order/shipping': ECommerceMyOrderTabScreenParam;
  'e-commerce/my-order/complete': ECommerceMyOrderTabScreenParam;
  'e-commerce/my-order/cancel': ECommerceMyOrderTabScreenParam;
};

export type ECommerceMyOrderTabRouteProp = RouteProp<
  ECommerceMyOrderTabParamList,
  'e-commerce/my-order/wait-for-confirm'
>;
export type ECommerceMyOrderDetailRouteProp = RouteProp<AppStackNavigatorParamList, 'e-commerce/my-order-detail'>;
export type ECommerceMyOrderCancelTabRouteProp = RouteProp<AppStackNavigatorParamList, 'e-commerce/my-order-cancel'>;
export type ECommerceMyOrderReviewRouteProp = RouteProp<AppStackNavigatorParamList, 'e-commerce/my-order-review'>;

export type ECommerceMyOrderNavigationProp = UseAppStackNavigatorScreenProps<'e-commerce/my-order'>;

export const mappingOrder = {
  waiting: [OrderStatusEnum.WAIT_FOR_CONFIRM],
  shipping: [OrderStatusEnum.SHIPPING, OrderStatusEnum.DELIVERED],
  complete: [OrderStatusEnum.COMPLETE],
  cancel: [OrderStatusEnum.CANCEL],
};
