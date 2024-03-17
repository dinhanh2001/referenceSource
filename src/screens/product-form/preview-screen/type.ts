import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList>;

export type ProductPreviewNavigationProps = PropsType['navigation'];
export type ProductPreviewRouteProps = RouteProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW
>;
