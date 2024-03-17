import { StackScreenProps } from '@react-navigation/stack';

import { AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, 'guide/list'>;

export type GuideListScreenNavigationProps = PropsType['navigation'];
export type GuideListScreenRouteProps = PropsType['route'];
