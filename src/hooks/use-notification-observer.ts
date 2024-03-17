import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import { AppRoutes, AppStackNavigatorParamList } from '../navigator-params';
import { NotificationEntity, NotificationTypeEnum } from '../graphql/type.interface';

export function useNotificationObserver() {
  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const data = notification.request.content.data as NotificationEntity;

      if (data != null) {
        switch (data.objectType) {
          case NotificationTypeEnum.ORDER:
            navigation.navigate(AppRoutes.MY_ORDER_DETAIL_SCREEN, { orderId: data.objectId as string });
            break;

          case NotificationTypeEnum.BOOKING:
            navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN, { bookingId: data.objectId as string });
            break;

          default:
            break;
        }
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [navigation]);
}
