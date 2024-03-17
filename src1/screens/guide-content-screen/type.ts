import { StackScreenProps } from '@react-navigation/stack';

import { AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, 'guide/content'>;

export type GuideContentScreenNavigationProps = PropsType['navigation'];
export type GuideContentScreenRouteProps = PropsType['route'];
