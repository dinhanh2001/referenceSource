import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavigatorParamList } from '../../../navigator-params';

type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, 'form-survey'>;

export type SurveyRouteProps = PropsType['route'];

export type SurveyNavigationProps = PropsType['navigation'];
