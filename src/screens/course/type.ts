import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList, UseAppStackNavigatorScreenProps } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.COURSE_DETAIL>;

export type CourseDetailScreenRouteProps = PropsType['route'];

export type PartnerCourseScreenNavigationProp = UseAppStackNavigatorScreenProps<AppRoutes.COURSE>;
