import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.ACCOUNT_ADDRESS>;

export type AccountAddressScreenNavigationProps = PropsType['navigation'];
export type AccountAddressScreenRouteProps = PropsType['route'];
