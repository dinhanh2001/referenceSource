import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../../components';
import { ECommerceSeachResultTabbarLabel } from '../../../components/e-commerce/search/tabbar-label';

import { EcommerceStoreHome } from './home';
import { ECommerceStoreProductList } from './product-list';
import { ECommerceStoreRateRevew } from './rate-review';
import { ECommerceStoreDetailRouteProp, ECommerceStoreTabEnum, ECommerceStoreTabParamList } from './type';

const Tab = createMaterialTopTabNavigator<ECommerceStoreTabParamList>();

export const ECommerceStoreDetail = () => {
  const {
    params: { storeId, initialRouteName },
  } = useRoute<ECommerceStoreDetailRouteProp>();

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Chi tiết cửa hàng" />
      <Tab.Navigator
        initialRouteName={initialRouteName}
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
              <ECommerceSeachResultTabbarLabel focused={focused} title={'Trang chủ'} colorFocused={'grayscale-black'} />
            ),
          }}
          name={'e-commerce/store/home'}
          component={EcommerceStoreHome}
          initialParams={{
            storeId,
            type: ECommerceStoreTabEnum.HOME,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <ECommerceSeachResultTabbarLabel focused={focused} title={'Sản phẩm'} colorFocused={'grayscale-black'} />
            ),
          }}
          name={'e-commerce/store/products'}
          component={ECommerceStoreProductList}
          initialParams={{
            storeId,
            type: ECommerceStoreTabEnum.PRODUCTS,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => (
              <ECommerceSeachResultTabbarLabel
                focused={focused}
                title={'Nhận xét & đánh giá'}
                colorFocused={'grayscale-black'}
              />
            ),
          }}
          name={'e-commerce/store/review'}
          component={ECommerceStoreRateRevew}
          initialParams={{
            storeId,
            type: ECommerceStoreTabEnum.REVIEW,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
