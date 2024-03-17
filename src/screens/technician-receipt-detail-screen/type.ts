import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.TECHNICIAN_RECEIPT_DETAIL_SCREEN>;

export type TechnicianReceiptDetailScreenNavigationProps = PropsType['navigation'];
export type TechnicianReceiptDetailScreenRouteProps = PropsType['route'];
