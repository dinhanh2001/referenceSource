import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<
  AppStackNavigatorParamList,
  AppRoutes.REPAIR_REQUEST_QUOTATION_REJECT_DETAIL
>;

export type RepairRequestRejectDetailScreenNavigationProps = PropsType['navigation'];
export type RepairRequestRejectDetailScreenRouteProps = PropsType['route'];
