import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppStackNavigatorParamList } from '../../../navigator-params';

export type MaintenanceDetailNavigationProps = NavigationProp<AppStackNavigatorParamList>;

export type MaintenanceDetailRouteProps = RouteProp<AppStackNavigatorParamList, 'maintenance/detail'>;
