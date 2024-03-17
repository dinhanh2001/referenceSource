import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.TECHNICIAN_REPAIR_DETAIL_SCREEN>;

export type TechnicianRepairDetailScreenNavigationProps = PropsType['navigation'];
export type TechnicianRepairDetailScreenRouteProps = PropsType['route'];
