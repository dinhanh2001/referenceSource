import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.TECHNICIAN_LIST_SCREEN>;

export type TechnicianListScreenNavigationProps = PropsType['navigation'];
export type TechnicianListScreenRouteProps = PropsType['route'];
