import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';

import { AppStackNavigatorParamList } from '../../../navigator-params';

export type SearchHomeTabParamList = {
  'home/search/partner': undefined;
  'home/search/store': undefined;
  'home/search/product': undefined;
};

export type SearchHomeNavigationProp = CompositeNavigationProp<
  NavigationProp<AppStackNavigatorParamList>,
  NavigationProp<SearchHomeTabParamList>
>;
