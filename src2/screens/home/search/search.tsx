import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../../components';
import { ECommerceSeachResultTabbarLabel } from '../../../components/e-commerce/search/tabbar-label';
import { useDebounce } from '../../../hooks';

import { SearchContext } from './context';
import { PartnerTab } from './partner-tab';
import { ProductTab } from './product-tab';
import { StoreTab } from './store-tab';
import { SearchHomeTabParamList } from './type';

const Tab = createMaterialTopTabNavigator<SearchHomeTabParamList>();

export const SearchHome = () => {
  const [_search, setSearch] = useState('');

  const search = useDebounce(_search?.trim?.());

  const renderCenterHeader = useMemo(
    () => (
      <View style={tw`px-4 py-10px bg-grayscale-bg flex-1 mr-3 rounded-4px`}>
        <TextInput
          autoFocus
          placeholder={'Tìm trên ứng dụng CALLME'}
          value={_search}
          onChangeText={setSearch}
          placeholderTextColor={tw.color('grayscale-disabled')}
        />
      </View>
    ),
    [_search],
  );

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader centerView={renderCenterHeader} />
      <SearchContext.Provider value={{ search }}>
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
                <ECommerceSeachResultTabbarLabel
                  focused={focused}
                  title={'Đơn vị sửa chữa'}
                  containerStyle={tw`mx-1`}
                />
              ),
            }}
            name={'home/search/partner'}
            component={PartnerTab}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => (
                <ECommerceSeachResultTabbarLabel focused={focused} title={'Gian hàng'} containerStyle={tw`mx-1`} />
              ),
            }}
            name={'home/search/store'}
            component={StoreTab}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => (
                <ECommerceSeachResultTabbarLabel focused={focused} title={'Sản phẩm'} containerStyle={tw`mx-1`} />
              ),
            }}
            name={'home/search/product'}
            component={ProductTab}
          />
        </Tab.Navigator>
      </SearchContext.Provider>
    </SafeAreaView>
  );
};
