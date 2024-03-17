import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavigatorParamList, AppRoutes } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.MALFUNCTION_SCREEN>;

export type MalfunctionScreenNavigationProps = PropsType['navigation'];
export type MalfunctionScreenRouteProps = PropsType['route'];
