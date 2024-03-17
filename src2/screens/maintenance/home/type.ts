import { CompositeNavigationProp, NavigationProp, RouteProp } from '@react-navigation/native';

import { MaintenanceStatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList, RootNavigatorParamList } from '../../../navigator-params';

export type MaintanenceTabScreenParam = {
  status: MaintenanceStatusEnum[];
  refetchBadge?(): Promise<any>;
};

export enum MaintenanceTabParamEnum {
  waiting = 'maintenance/list-waiting',
  approved = 'maintenance/list-approved',
  reject = 'maintenance/list-reject',
}

export type MaintenanceTabParamList = {
  [MaintenanceTabParamEnum.waiting]: MaintanenceTabScreenParam;
  [MaintenanceTabParamEnum.approved]: MaintanenceTabScreenParam;
  [MaintenanceTabParamEnum.reject]: MaintanenceTabScreenParam;
};

export type MaintenanceTabRouteProp = RouteProp<MaintenanceTabParamList, MaintenanceTabParamEnum.waiting>;

export type MaintenanceNavigationProp = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AppStackNavigatorParamList>
>;
