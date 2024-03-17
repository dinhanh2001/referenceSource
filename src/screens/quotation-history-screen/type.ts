import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.QUOTATION_HISTORY>;

export type QuotationHistoryScreenNavigationProps = PropsType['navigation'];
export type QuotationHistoryScreenRouteProps = PropsType['route'];
