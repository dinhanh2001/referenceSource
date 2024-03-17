import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type MyOrderDetailRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.MY_ORDER_DETAIL_SCREEN>;

export type MyOrderDetailNavigationProp = NavigationProp<AppStackNavigatorParamList>;
