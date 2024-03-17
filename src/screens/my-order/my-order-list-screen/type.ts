import { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { OrderStatusEnum } from '../../../graphql/type.interface';

export type MyOrderTabScreenParam = {
  statuses: OrderStatusEnum[];
  refetchBadges?(): Promise<any>;
};

export type MyOrderTabParamList = {
  [AppRoutes.MY_ORDER_WAITING_SCREEN]: MyOrderTabScreenParam;
  [AppRoutes.MY_ORDER_INPROGRESS_SCREEN]: MyOrderTabScreenParam;
  [AppRoutes.MY_ORDER_COMPLETED_SCREEN]: MyOrderTabScreenParam;
  [AppRoutes.MY_ORDER_CANCELED_SCREEN]: MyOrderTabScreenParam;
};

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.MY_ORDER_LIST_SCREEN>;

export type MyOrderTabNavigationProps = PropsType['navigation'];
export type MyOrderListRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.MY_ORDER_LIST_SCREEN>;
export type MyOrderTabRouteProp = RouteProp<MyOrderTabParamList, AppRoutes.MY_ORDER_WAITING_SCREEN>;

export const MyOrderMapping = {
  waiting: [OrderStatusEnum.WAIT_FOR_CONFIRM],
  inprogress: [OrderStatusEnum.SHIPPING],
  completed: [OrderStatusEnum.COMPLETE, OrderStatusEnum.DELIVERED],
  canceled: [OrderStatusEnum.CANCEL],
};
