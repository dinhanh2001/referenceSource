import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<
  AppStackNavigatorParamList,
  AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN
>;

export type RepairRequestDetailScreenNavigationProps = PropsType['navigation'];
export type RepairRequestDetailScreenRouteProps = PropsType['route'];
