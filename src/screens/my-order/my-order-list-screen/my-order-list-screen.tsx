import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ActivityIndicator, TabBarLabel1, tw } from '../../../components';
import { AppRoutes } from '../../../navigator-params';
import { usePartnerCountOrderItemForEachStatusQuery } from '../../../graphql/queries/partnerCountOrderItemForEachStatus.generated';
import { OrderStatusEnum } from '../../../graphql/type.interface';

import { MyOrderTabScreen } from './my-order-tab-screen';
import { MyOrderListRouteProp, MyOrderMapping, MyOrderTabParamList } from './type';

const Tab = createMaterialTopTabNavigator<MyOrderTabParamList>();

export const MyOrderListScreen = () => {
  const initialRouteName =
    useRoute<MyOrderListRouteProp>()?.params?.initialRouteName ?? AppRoutes.MY_ORDER_WAITING_SCREEN;

  const { data, loading, refetch: refetchBadges } = usePartnerCountOrderItemForEachStatusQuery();

  const { canceled, completed, inprogress, waiting } = useMemo(() => {
    const list = data?.partnerCountOrderItemForEachStatus ?? [];

    const calc = (statuses: OrderStatusEnum[]) =>
      list.filter((it) => statuses.includes(it.status)).reduce((p, v) => p + v.totalItem, 0);

    return {
      waiting: calc(MyOrderMapping.waiting),
      inprogress: calc(MyOrderMapping.inprogress),
      completed: calc(MyOrderMapping.completed),
      canceled: calc(MyOrderMapping.canceled),
    };
  }, [data]);

  if (loading && !data?.partnerCountOrderItemForEachStatus?.length) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <Tab.Navigator
        initialRouteName={initialRouteName}
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
          name={AppRoutes.MY_ORDER_WAITING_SCREEN}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel1 focused={focused} title={'Chờ xác nhận'} badge={waiting} />,
          }}
          initialParams={{
            statuses: MyOrderMapping.waiting,
            refetchBadges,
          }}
          component={MyOrderTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.MY_ORDER_INPROGRESS_SCREEN}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel1 focused={focused} title={'Đang giao'} badge={inprogress} />,
          }}
          initialParams={{
            statuses: MyOrderMapping.inprogress,
            refetchBadges,
          }}
          component={MyOrderTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.MY_ORDER_COMPLETED_SCREEN}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel1 focused={focused} title={'Đã giao'} badge={completed} />,
          }}
          initialParams={{
            statuses: MyOrderMapping.completed,
            refetchBadges,
          }}
          component={MyOrderTabScreen}
        />
        <Tab.Screen
          name={AppRoutes.MY_ORDER_CANCELED_SCREEN}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel1 focused={focused} title={'Đã hủy'} badge={canceled} />,
          }}
          initialParams={{
            statuses: MyOrderMapping.canceled,
            refetchBadges,
          }}
          component={MyOrderTabScreen}
        />
      </Tab.Navigator>
    </View>
  );
};
