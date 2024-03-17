import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.TECHNICIAN_DETAIL_SCREEN>;

export type TechnicianDetailScreenNavigationProps = PropsType['navigation'];
export type TechnicianDetailScreenRouteProps = PropsType['route'];
