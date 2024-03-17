import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavigatorParamList, AppRoutes } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.MEDIA_LIST_VIEW_SCREEN>;

export type ImageViewScreenNavigationProps = PropsType['navigation'];
export type ImageViewScreenRouteProps = PropsType['route'];
