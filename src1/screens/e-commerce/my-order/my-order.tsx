import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, TabbarLabel, tw } from '../../../components';
import { OrderStatusEnum } from '../../../graphql/type.interface';
import { useCountOrderItemForEachStatusQuery } from '../../../graphql/queries/countOrderItemForEachStatus.generated';

import { ECommerceMyOrderTab } from './my-order-tab';
import { ECommerceMyOrderTabParamList, mappingOrder } from './type';

const Tab = createMaterialTopTabNavigator<ECommerceMyOrderTabParamList>();

export const ECommerceMyOrder = () => {
  const { data, refetch: refetchBadge } = useCountOrderItemForEachStatusQuery();

  const { waiting, shipping, complete, cancel } = useMemo(() => {
    const list = data?.countOrderItemForEachStatus ?? [];

    const calc = (statuses: OrderStatusEnum[]) =>
      list.filter((it) => statuses.includes(it.status)).reduce((p, v) => p + v.totalItem, 0);

    return {
      waiting: calc(mappingOrder.waiting),
      shipping: calc(mappingOrder.shipping),
      complete: calc(mappingOrder.complete),
      cancel: calc(mappingOrder.cancel),
    };
  }, [data]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Đơn hàng của tôi" />
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
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Chờ xác nhận'} badge={waiting || 0} />,
          }}
          name={'e-commerce/my-order/wait-for-confirm'}
          component={ECommerceMyOrderTab}
          initialParams={{
            statuses: mappingOrder.waiting,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đang giao'} badge={shipping || 0} />,
          }}
          name={'e-commerce/my-order/shipping'}
          component={ECommerceMyOrderTab}
          initialParams={{
            statuses: mappingOrder.shipping,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đã giao'} badge={complete || 0} />,
          }}
          name={'e-commerce/my-order/complete'}
          component={ECommerceMyOrderTab}
          initialParams={{
            statuses: mappingOrder.complete,
            refetchBadge,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đã hủy'} badge={cancel || 0} />,
          }}
          name={'e-commerce/my-order/cancel'}
          component={ECommerceMyOrderTab}
          initialParams={{
            statuses: mappingOrder.cancel,
            refetchBadge,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
