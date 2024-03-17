import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type MyOrderCancelRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.MY_ORDER_CANCEL_REASON_SCREEN>;

export type MyOrderCancelNavigationProp = NavigationProp<AppStackNavigatorParamList>;
