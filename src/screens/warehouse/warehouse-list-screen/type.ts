import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.WAREHOUSE_LIST_SCREEN>;

export type WarehouseListScreenNavigationProps = PropsType['navigation'];
export type WarehouseListScreenRouteProps = PropsType['route'];
