import { NavigationProp, RouteProp } from '@react-navigation/native';

import { NotificationTypeEnum } from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';

export type NotificationTabScreenParam = {
  type: NotificationTypeEnum;
  refetchBadge?(): Promise<any>;
};

export type NotificationsTabParamList = {
  'notification/order': NotificationTabScreenParam;
  'notification/maintenance': NotificationTabScreenParam;
  'notification/booking': NotificationTabScreenParam;
  'notification/other': NotificationTabScreenParam;
};

export type tabBarLabelProps = {
  focused: boolean;
};

export type NotificationTabRouteProp = RouteProp<NotificationsTabParamList, 'notification/order'>;

export type NotificationNavigationProp = NavigationProp<AppStackNavigatorParamList>;
