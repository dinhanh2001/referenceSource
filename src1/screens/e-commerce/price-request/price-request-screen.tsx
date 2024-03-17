import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo } from 'react';

import { TabbarLabel, tw } from '../../../components';
import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { useUserCountProductQuotationForEachStatusQuery } from '../../../graphql/queries/userCountProductQuotationForEachStatus.generated';

import { ECommercePriceRequestList } from './price-request-list';
import { ECommercePriceRequestTabParamList } from './type';

const Tab = createMaterialTopTabNavigator<ECommercePriceRequestTabParamList>();

export const ECommercePriceRequestScreen = () => {
  const { data, refetch } = useUserCountProductQuotationForEachStatusQuery();

  const badges = useMemo(
    () =>
      data?.userCountProductQuotationForEachStatus?.reduce((acc, cur) => {
        return { ...acc, [cur?.status]: cur?.totalItem || 0 };
      }, {}),
    [data?.userCountProductQuotationForEachStatus],
  );

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
            <TabbarLabel
              focused={focused}
              title={'Chờ phản hồi'}
              badge={badges?.[ProductQuotationStatusEnum.SENT as keyof typeof badges] || 0}
            />
          ),
        }}
        name={'e-commerce/my-order/wait-for-confirm'}
        component={ECommercePriceRequestList}
        initialParams={{
          type: ProductQuotationStatusEnum.SENT,
          refetchBadge: refetch,
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <TabbarLabel
              focused={focused}
              title={'Đã nhận báo giá'}
              badge={badges?.[ProductQuotationStatusEnum.RESPONDED as keyof typeof badges] || 0}
            />
          ),
        }}
        name={'e-commerce/my-order/complete'}
        component={ECommercePriceRequestList}
        initialParams={{
          type: ProductQuotationStatusEnum.RESPONDED,
          refetchBadge: refetch,
        }}
      />
    </Tab.Navigator>
  );
};
