import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, TabbarLabel, tw } from '../../../components';
import { MaintenanceStatusEnum } from '../../../graphql/type.interface';
import { useCountMaintenanceItemForEachStatusQuery } from '../../../graphql/queries/countMaintenanceItemForEachStatus.generated';

import { MaintenanceNavigationProp, MaintenanceTabParamEnum, MaintenanceTabParamList } from './type';
import { MaintenanceList } from './list';

const Tab = createMaterialTopTabNavigator<MaintenanceTabParamList>();

export const MAINTENANCE_TABS_STATUS = {
  [MaintenanceTabParamEnum.waiting]: [MaintenanceStatusEnum.NEW],
  [MaintenanceTabParamEnum.approved]: [MaintenanceStatusEnum.ACCEPTED],
  [MaintenanceTabParamEnum.reject]: [MaintenanceStatusEnum.DENY, MaintenanceStatusEnum.CANCEL],
};

export const Maintenance = () => {
  const navigation = useNavigation<MaintenanceNavigationProp>();

  const { data, refetch: refetchBadge } = useCountMaintenanceItemForEachStatusQuery();

  const badges = useMemo(() => {
    const mapping = data?.countMaintenanceItemForEachStatus?.reduce((acc, cur) => {
      return { ...acc, [cur?.status]: cur?.totalItem || 0 };
    }, {});

    return Object.keys(MAINTENANCE_TABS_STATUS).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: MAINTENANCE_TABS_STATUS?.[cur as keyof typeof MAINTENANCE_TABS_STATUS]?.reduce(
          (p, v) => p + (mapping?.[v as keyof typeof mapping] || 0),
          0,
        ),
      };
    }, {});
  }, [data?.countMaintenanceItemForEachStatus]);

  const renderRightHeader = useMemo(
    () => (
      <TouchableOpacity onPress={() => navigation.navigate('maintenance/create')}>
        <Text style={tw`font-semibold text-primary-dark`}>+ Tạo mới</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title="Danh sách yêu cầu" rightView={renderRightHeader} />
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
              <TabbarLabel
                focused={focused}
                title={'Chờ xác nhận'}
                badge={badges?.[MaintenanceTabParamEnum.waiting as keyof typeof badges] || 0}
              />
            ),
          }}
          name={MaintenanceTabParamEnum.waiting}
          component={MaintenanceList}
          initialParams={{
            status: MAINTENANCE_TABS_STATUS[MaintenanceTabParamEnum.waiting],
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <TabbarLabel
                focused={focused}
                title={'Phê duyệt'}
                badge={badges?.[MaintenanceTabParamEnum.approved as keyof typeof badges] || 0}
              />
            ),
          }}
          name={MaintenanceTabParamEnum.approved}
          component={MaintenanceList}
          initialParams={{
            status: MAINTENANCE_TABS_STATUS[MaintenanceTabParamEnum.approved],
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <TabbarLabel
                focused={focused}
                title={'Từ chối'}
                badge={badges?.[MaintenanceTabParamEnum.reject as keyof typeof badges] || 0}
              />
            ),
          }}
          name={MaintenanceTabParamEnum.reject}
          component={MaintenanceList}
          initialParams={{
            status: MAINTENANCE_TABS_STATUS[MaintenanceTabParamEnum.reject],
            refetchBadge,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
