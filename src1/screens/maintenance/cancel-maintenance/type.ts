import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppStackNavigatorParamList } from '../../../navigator-params';

export type CancelMaintenanceNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export type CancelMaintenanceRouteProp = RouteProp<AppStackNavigatorParamList, 'maintenance/cancel'>;
