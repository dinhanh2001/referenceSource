import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.VOUCHER_SCREEN>;

export type VoucherScreenNavigationProps = PropsType['navigation'];
export type VoucherScreenRouteProps = PropsType['route'];
