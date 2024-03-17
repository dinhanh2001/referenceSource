import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.SURVEY_SCREEN>;

export type SurveyRouteProps = PropsType['route'];

export type SurveyNavigationProps = PropsType['navigation'];
