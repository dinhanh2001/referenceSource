import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.VOUCHER_DETAIL_SCREEN>;

export type VoucherDetailScreenNavigationProps = PropsType['navigation'];
export type VoucherDetailScreenRouteProps = PropsType['route'];
