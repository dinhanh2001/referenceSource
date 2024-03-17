import { View } from 'react-native';
import React, { useMemo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

import { ActivityIndicator, TabBarLabel1, tw } from '../../../components';
import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { usePartnerCountProductQuotationForEachStatusQuery } from '../../../graphql/queries/partnerCountProductQuotationForEachStatus.generated';

import { ProductQuotationListRouteProp, ProductQuotationTabParamList } from './type';
import { ProductQuotationTab } from './product-quotation-tab';

const Tab = createMaterialTopTabNavigator<ProductQuotationTabParamList>();

export const ListProductQuotations = () => {
  const {
    params: { initialRouteName },
  } = useRoute<ProductQuotationListRouteProp>();
  const {
    data: dataBadges,
    loading: loadingBadges,
    refetch: refetchBadges,
  } = usePartnerCountProductQuotationForEachStatusQuery();

  const badges = useMemo(
    () =>
      dataBadges?.partnerCountProductQuotationForEachStatus?.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.status]: cur.totalItem,
        }),
        {},
      ),
    [dataBadges],
  );

  if (loadingBadges) {
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
          name={ProductQuotationStatusEnum.SENT}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1
                focused={focused}
                title={'Chưa gửi báo giá'}
                badge={badges?.[ProductQuotationStatusEnum.SENT as keyof typeof badges] || 0}
              />
            ),
          }}
          initialParams={{
            status: ProductQuotationStatusEnum.SENT,
            refetchBadges,
          }}
          component={ProductQuotationTab}
        />
        <Tab.Screen
          name={ProductQuotationStatusEnum.RESPONDED}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel1
                focused={focused}
                title={'Đã gửi báo giá'}
                badge={badges?.[ProductQuotationStatusEnum.RESPONDED as keyof typeof badges] || 0}
              />
            ),
          }}
          initialParams={{
            status: ProductQuotationStatusEnum.RESPONDED,
            refetchBadges,
          }}
          component={ProductQuotationTab}
        />
      </Tab.Navigator>
    </View>
  );
};
