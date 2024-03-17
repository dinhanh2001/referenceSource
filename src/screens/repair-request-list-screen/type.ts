import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_LIST_SCREEN>;

export type RepairRequestListScreenNavigationProps = PropsType['navigation'];
export type RepairRequestListScreenRouteProps = PropsType['route'];
