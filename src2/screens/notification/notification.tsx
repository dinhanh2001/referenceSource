import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Badge } from '@rneui/themed';
import React, { useCallback } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '../../components';
import { useUserNotificationTypeUnSeenCountQuery } from '../../graphql/queries/userNotificationTypeUnSeenCount.generated';
import { NotificationTypeEnum } from '../../graphql/type.interface';
import { MenuBoardCustom, NotificationSVG, ReceiptCustomSVG, RepairIcon } from '../../svg';

import { NotificationList } from './notification-list';
import { NotificationsTabParamList, tabBarLabelProps } from './type';

const Tab = createMaterialTopTabNavigator<NotificationsTabParamList>();

export const Notification = React.memo(() => {
  const { width } = useWindowDimensions();
  const { data, refetch: refetchBadge } = useUserNotificationTypeUnSeenCountQuery();

  const tabBarLabel = useCallback(
    (type: NotificationTypeEnum) =>
      ({ focused }: tabBarLabelProps) => {
        const { icon: Icon, label } = NOTIFICATION_TABS[type as keyof typeof NOTIFICATION_TABS];
        const color = focused ? tw.color('grayscale-black') : tw.color('grayscale-light');
        const isRepair = type === NotificationTypeEnum.BOOKING;
        const count = data?.userNotificationTypeUnSeenCount?.find?.((e) => e?.type === type)?.count || 0;

        return (
          <View style={tw`justify-center items-center gap-6px w-${width / 4}px`}>
            <View style={tw`relative`}>
              <Icon stroke={isRepair ? color : undefined} fill={isRepair ? undefined : color} />
              {count > 0 && (
                <Badge
                  value={count > 99 ? '99+' : count}
                  containerStyle={tw`absolute -top-10px -right-20px`}
                  badgeStyle={tw`bg-error`}
                  textStyle={tw`text-10px`}
                />
              )}
            </View>
            <Text style={tw`text-[${color as string}] text-10px`}>{label}</Text>
          </View>
        );
      },
    [data?.userNotificationTypeUnSeenCount, width],
  );

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <View style={tw`mx-4 mt-10px mb-3`}>
        <Text style={tw`text-17px font-semibold `}>Thông báo</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: tw`w-auto pl-0 pr-0`,
          tabBarIndicatorStyle: {
            backgroundColor: tw.color('white'),
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: tabBarLabel(NotificationTypeEnum.ORDER),
          }}
          name="notification/order"
          component={NotificationList}
          initialParams={{
            type: NotificationTypeEnum.ORDER,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: tabBarLabel(NotificationTypeEnum.MAINTENANCE),
          }}
          name="notification/maintenance"
          component={NotificationList}
          initialParams={{
            type: NotificationTypeEnum.MAINTENANCE,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: tabBarLabel(NotificationTypeEnum.BOOKING),
          }}
          name="notification/booking"
          component={NotificationList}
          initialParams={{
            type: NotificationTypeEnum.BOOKING,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: tabBarLabel(NotificationTypeEnum.OTHER),
          }}
          name="notification/other"
          component={NotificationList}
          initialParams={{
            type: NotificationTypeEnum.OTHER,
            refetchBadge,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
});

const NOTIFICATION_TABS = {
  [NotificationTypeEnum.ORDER]: {
    label: 'Đơn hàng',
    icon: ReceiptCustomSVG,
  },
  [NotificationTypeEnum.MAINTENANCE]: {
    label: 'Lịch bảo dưỡng',
    icon: MenuBoardCustom,
  },
  [NotificationTypeEnum.BOOKING]: {
    label: 'Sửa chữa',
    icon: RepairIcon,
  },
  [NotificationTypeEnum.OTHER]: {
    label: 'Khác',
    icon: NotificationSVG,
  },
};
