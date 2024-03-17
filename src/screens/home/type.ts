import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';

import { AppStackNavigatorParamList, BottomTabNavigatorParamList } from '../../navigator-params';

export type HomeScreenNavigationProps = CompositeNavigationProp<
  NavigationProp<AppStackNavigatorParamList>,
  NavigationProp<BottomTabNavigatorParamList>
>;
