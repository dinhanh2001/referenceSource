import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_CREATE_SETTLEMENT>;

export type RepairRequestCreateSettlementScreenNavigationProps = PropsType['navigation'];
export type RepairRequestCreateSettlementScreenRouteProps = PropsType['route'];

export type AdditionalFee = {
  name: string;
  amount: string;
};

export type FormCreateSettlement = {
  additional: AdditionalFee[];
};
