import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.CHOOSE_PRODUCT>;

export type ChooseProductScreenNavigationProps = PropsType['navigation'];
export type ChooseProductScreenRouteProps = PropsType['route'];
