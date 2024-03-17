import { StackScreenProps } from '@react-navigation/stack';

import { AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, 'guide/detail'>;

export type GuideDetailScreenNavigationProps = PropsType['navigation'];
export type GuideDetailScreenRouteProps = PropsType['route'];
