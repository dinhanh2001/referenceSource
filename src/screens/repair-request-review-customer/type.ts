import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_REVIEW_CUSTOMER>;

export type RepairRequestReviewCustomerScreenNavigationProps = PropsType['navigation'];
export type RepairRequestReviewCustomerScreenRouteProps = PropsType['route'];
