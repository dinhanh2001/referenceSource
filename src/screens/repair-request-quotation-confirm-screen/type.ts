import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<
  AppStackNavigatorParamList,
  AppRoutes.REPAIR_REQUEST_QUOTATION_CONFIRM_SCREEN
>;

export type RepairRequestQuotationConfirmScreenNavigationProps = PropsType['navigation'];
export type RepairRequestQuotationConfirmScreenRouteProps = PropsType['route'];
