import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.PRODUCT_LIST_SCREEN>;

export type ProductListScreenNavigationProps = PropsType['navigation'];
export type ProductListScreenRouteProps = PropsType['route'];
