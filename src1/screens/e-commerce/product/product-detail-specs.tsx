import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from '@rneui/themed';

import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { AppHeader, tw } from '../../../components';
import { ShopSVG } from '../../../svg';

import {
  ECommerceProductDetailSpecsTabParamList,
  ECommerceProductNavigationProp,
  ECommerceProductSpecsRouteProp,
} from './type';
import { ECommerceProductDetailSpecsDetail } from './product-detail-spect-detail';
import { ECommerceProductDetailSpecsRelated } from './product-detail-specs-related';

const Tab = createMaterialTopTabNavigator<ECommerceProductDetailSpecsTabParamList>();

export const ECommerceProductDetailSpecs = () => {
  const navigation = useNavigation<ECommerceProductNavigationProp>();
  const {
    params: { productId, initialRouteName },
  } = useRoute<ECommerceProductSpecsRouteProp>();

  const { data } = useUserProductQuery({
    variables: {
      id: productId,
    },
  });
  const { name, isFixedCost, partnerId, partner } = data?.userProduct || {};

  const onContact = useCallback(() => {
    try {
      const url = `tel:${partner?.phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  }, [partner]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader
        centerView={
          <View style={tw`flex-1`}>
            <Text style={tw`text-17px font-semibold`} numberOfLines={1}>
              {name}
            </Text>
          </View>
        }
      />
      <Tab.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          tabBarItemStyle: tw`w-auto pl-0 pr-0 mx-2`,
          tabBarIndicatorStyle: tw`bg-primary-dark `,
          tabBarStyle: tw`border-b-[#EEE] border-b mx-2`,
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Chi tiết'} />,
          }}
          name={'e-commerce/product-detail-specs/detail'}
          component={ECommerceProductDetailSpecsDetail}
          initialParams={{
            productId,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Sản phẩm tương tự'} />,
          }}
          name={'e-commerce/product-detail-specs/related'}
          component={ECommerceProductDetailSpecsRelated}
          initialParams={{
            productId,
          }}
        />
      </Tab.Navigator>
      <View style={tw`flex-row py-2 px-4 gap-3 items-center`}>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => navigation.push('e-commerce/store-detail', { storeId: partnerId as string })}
        >
          <ShopSVG />
          <Text style={tw`mt-1 text-11px`}>Gian hàng</Text>
        </TouchableOpacity>
        <Button
          title={'Liên hệ'}
          containerStyle={tw`flex-1`}
          type="outline"
          buttonStyle={tw`border-grayscale-disabled`}
          onPress={onContact}
        />
        <Button title={isFixedCost ? 'Đặt mua' : 'Gửi yêu cầu'} containerStyle={tw`flex-1`} />
      </View>
    </SafeAreaView>
  );
};

type TabbarLabelProps = {
  focused: boolean;
  title: string;
};

const TabbarLabel = ({ focused, title }: TabbarLabelProps) => {
  return (
    <View style={tw`items-center`}>
      <Text style={focused ? tw`text-primary-dark font-semibold ` : tw`text-grayscale-gray px-2px`}>{title}</Text>
    </View>
  );
};
