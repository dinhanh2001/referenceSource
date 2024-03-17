import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { memo, useMemo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, LoadingScreen, Screen, TabbarLabel, bookingStatusMapping, tw } from '../../components';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { MyRepairRequestsTab } from '../my-repair-requests-tab';
import { useUserCountItemForEachStatusQuery } from '../../graphql/queries/userCountItemForEachStatus.generated';
import { RepairRequestTabParamList } from '../../navigator-params';

import { MyRepaiRequestNavigationProp } from './type';

const Tab = createMaterialTopTabNavigator<RepairRequestTabParamList>();

export const MyRepairRequestScreen = memo(() => {
  const { data, loading, refetch: refetchBadge } = useUserCountItemForEachStatusQuery();
  const navigation = useNavigation<MyRepaiRequestNavigationProp>();

  const { canceledCount, checkingCount, completedCount, onGoingCount, waitToConfirmCount } = useMemo(() => {
    const list = data?.userCountItemForEachStatus ?? [];

    const calc = (statuses: BookingStatusEnum[]) =>
      list.filter((it) => statuses.includes(it.status)).reduce((p, v) => p + v.totalitems, 0);

    return {
      waitToConfirmCount: calc(bookingStatusMapping.waitToConfirm),
      onGoingCount: calc(bookingStatusMapping.onGoing),
      checkingCount: calc(bookingStatusMapping.checking),
      completedCount: calc(bookingStatusMapping.completed),
      canceledCount: calc(bookingStatusMapping.canceled),
    };
  }, [data]);

  const renderRightHeader = useMemo(
    () => (
      <TouchableOpacity onPress={() => navigation.navigate('repair-request')}>
        <Text style={tw`font-semibold text-primary-dark`}>+ Tạo mới</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  const renderContent = useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: tw`items-center w-auto`,
          tabBarIndicatorStyle: {
            backgroundColor: tw.color('white'),
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <TabbarLabel focused={focused} title={'Chờ xác nhận'} badge={waitToConfirmCount} />
            ),
          }}
          name={'my-repair-request/waiting'}
          component={MyRepairRequestsTab}
          initialParams={{
            bookingStatuses: bookingStatusMapping.waitToConfirm,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đang đến'} badge={onGoingCount} />,
          }}
          name={'my-repair-request/ongoing'}
          component={MyRepairRequestsTab}
          initialParams={{
            bookingStatuses: bookingStatusMapping.onGoing,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <TabbarLabel focused={focused} title={'Chẩn đoán - Báo giá'} badge={checkingCount} />
            ),
          }}
          name={'my-repair-request/checking'}
          component={MyRepairRequestsTab}
          initialParams={{
            bookingStatuses: bookingStatusMapping.checking,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Hoàn thành'} badge={completedCount} />,
          }}
          name={'my-repair-request/sucess'}
          component={MyRepairRequestsTab}
          initialParams={{
            bookingStatuses: bookingStatusMapping.completed,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đã hủy'} badge={canceledCount} />,
          }}
          name={'my-repair-request/cancel'}
          component={MyRepairRequestsTab}
          initialParams={{
            bookingStatuses: bookingStatusMapping.canceled,
            refetchBadge,
          }}
        />
      </Tab.Navigator>
    );
  }, [canceledCount, checkingCount, completedCount, loading, onGoingCount, refetchBadge, waitToConfirmCount]);

  return (
    <Screen style={tw`flex-1`}>
      <AppHeader title="Danh sách sửa chữa" rightView={renderRightHeader} />
      {renderContent}
    </Screen>
  );
});
