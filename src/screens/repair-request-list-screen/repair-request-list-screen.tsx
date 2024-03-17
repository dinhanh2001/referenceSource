import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { TabBarLabel1, tw } from '../../components';
import { usePartnerCountItemForEachStatusQuery } from '../../graphql/queries/partnerCountItemForEachStatus.generated';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../navigator-params';
import { RepairRequestTabScreen } from '../repair-request-tab-screen';

import { useBookingStatus } from './use-booking-status';

type RepairRequestTabScreenParam = {
  bookingStatuses: BookingStatusEnum[];
  refetchBadge?(): Promise<any>;
};

export type RepairRequestTabParamList = {
  [AppRoutes.REPAIR_REQUEST_LIST_AWAITING_REQUEST]: RepairRequestTabScreenParam;
  [AppRoutes.REPAIR_REQUEST_LIST_INPROGRESS_REQUEST]: RepairRequestTabScreenParam;
  [AppRoutes.REPAIR_REQUEST_LIST_COMPLETED_REQUEST]: RepairRequestTabScreenParam;
  [AppRoutes.REPAIR_REQUEST_LIST_CANCELED_REQUEST]: RepairRequestTabScreenParam;
  [AppRoutes.REPAIR_REQUEST_LIST_CHECKING_REQUEST]: RepairRequestTabScreenParam;
  [AppRoutes.REPAIR_REQUEST_LIST_HAND_OVER]: RepairRequestTabScreenParam;
};

const Tab = createMaterialTopTabNavigator<RepairRequestTabParamList>();

export const RepairRequestListScreen = memo(() => {
  const { data, refetch: refetchBadge } = usePartnerCountItemForEachStatusQuery();

  const { bookingStatusMapping, isAgency } = useBookingStatus();

  const { canceledCount, checkingCount, completedCount, onGoingCount, waitToConfirmCount, handOverCount } =
    useMemo(() => {
      const list = data?.partnerCountItemForEachStatus ?? [];

      const calc = (statuses: BookingStatusEnum[]) =>
        list.filter((it) => statuses.includes(it.status)).reduce((p, v) => p + v.totalitems, 0);

      return {
        waitToConfirmCount: calc(bookingStatusMapping.waitToConfirm),
        onGoingCount: calc(bookingStatusMapping.onGoing),
        checkingCount: calc(bookingStatusMapping.checking),
        handOverCount: calc(bookingStatusMapping.handOver),
        completedCount: calc(bookingStatusMapping.completed),
        canceledCount: calc(bookingStatusMapping.canceled),
      };
    }, [
      bookingStatusMapping.canceled,
      bookingStatusMapping.checking,
      bookingStatusMapping.completed,
      bookingStatusMapping.handOver,
      bookingStatusMapping.onGoing,
      bookingStatusMapping.waitToConfirm,
      data?.partnerCountItemForEachStatus,
    ]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 13,
            lineHeight: 18,
          },
          tabBarIndicatorStyle: {
            backgroundColor: tw.color('white'),
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_AWAITING_REQUEST}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1 focused={focused} title={'Chờ nhận'} badge={waitToConfirmCount} />
            ),
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.waitToConfirm,
            refetchBadge: refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_INPROGRESS_REQUEST}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1 focused={focused} title={isAgency ? 'Chờ KTV nhận' : 'KTV đang đến'} badge={onGoingCount} />
            ),
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.onGoing,
            refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_CHECKING_REQUEST}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1
                focused={focused}
                title={isAgency ? 'KTV đang đến' : 'Kiểm tra - báo giá'}
                badge={checkingCount}
              />
            ),
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.checking,
            refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_HAND_OVER}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1
                focused={focused}
                title={isAgency ? 'Kiểm tra - báo giá' : 'KTV đang bàn giao'}
                badge={handOverCount}
              />
            ),
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.handOver,
            refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_COMPLETED_REQUEST}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1 focused={focused} title={'Hoàn thành'} badge={completedCount} />
            ),
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.completed,
            refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.REPAIR_REQUEST_LIST_CANCELED_REQUEST}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel1 focused={focused} title={'Đã huỷ'} badge={canceledCount} />,
          }}
          initialParams={{
            bookingStatuses: bookingStatusMapping.canceled,
            refetchBadge,
          }}
          component={RepairRequestTabScreen}
        />
      </Tab.Navigator>
    </View>
  );
});
