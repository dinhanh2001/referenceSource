import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';

import { AuthStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';

export type DiagnosticSelectNavigationProps = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AuthStackNavigatorParamList>
>;
