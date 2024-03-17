import { NavigationProp, RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export enum RevenueTab {
  All = 'revenue/all',
  Store = 'revenue/store',
  Service = 'revenue/service',
}

export type RevenueTabParamList = {
  [RevenueTab.All]: undefined;
  [RevenueTab.Store]: undefined;
  [RevenueTab.Service]: undefined;
};

export type RevenueNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export type RevenueFilterData = {
  periodType: string;
  startDate?: string;
  endDate?: string;
};

export type RevenueFilterRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.REVENUE_FILTER_SCREEN>;
export type RevenueFilterNavigationProp = NavigationProp<AppStackNavigatorParamList, AppRoutes.REVENUE_FILTER_SCREEN>;
