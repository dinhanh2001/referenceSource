import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../../components';
import { ECommerceSeachResultTabbarLabel } from '../../../components/e-commerce/search/tabbar-label';
import { FilterSVG } from '../../../svg';

import { ECommerceSearchResultListResult } from './list-result';
import {
  ECommerceSearchNavigationProp,
  ECommerceSearchResultRouteProp,
  ECommerceSearchResultTabEnum,
  ECommerceSearchResultTabParamList,
} from './type';
import { ECommerceSearchResultListDepartment } from './list-department';
import { FormSearchCommerce } from './filter';
import { FilterContext } from './context';

const Tab = createMaterialTopTabNavigator<ECommerceSearchResultTabParamList>();

export const ECommerceSearchResult = () => {
  const navigation = useNavigation<ECommerceSearchNavigationProp>();
  const {
    params: { search },
  } = useRoute<ECommerceSearchResultRouteProp>();

  const [filter, setFilter] = useState<FormSearchCommerce>({
    display: undefined,
    sort: undefined,
  });

  const onFilter = useCallback(() => {
    navigation.navigate('e-commerce/search-filter', {
      value: filter,
      onChange: (val?: FormSearchCommerce) => {
        setFilter(val as FormSearchCommerce);
      },
    });
  }, [filter, navigation]);

  const renderCenterHeader = useMemo(
    () => (
      <View style={tw`px-4 py-10px bg-grayscale-bg flex-1 mr-3 rounded-4px`}>
        <Text numberOfLines={1}>{search}</Text>
      </View>
    ),
    [search],
  );

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader
        centerView={renderCenterHeader}
        rightView={
          <TouchableOpacity onPress={onFilter}>
            <FilterSVG width={24} height={24} />
          </TouchableOpacity>
        }
      />
      <FilterContext.Provider
        value={{
          filter,
          setFilter,
        }}
      >
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
              tabBarLabel: ({ focused }) => <ECommerceSeachResultTabbarLabel focused={focused} title={'Tất cả'} />,
            }}
            name={'e-commerce/search-result/all'}
            component={ECommerceSearchResultListResult}
            initialParams={{
              search,
              type: ECommerceSearchResultTabEnum.ALL,
            }}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => <ECommerceSeachResultTabbarLabel focused={focused} title={'Gian hàng'} />,
            }}
            name={'e-commerce/search-result/department'}
            component={ECommerceSearchResultListDepartment}
            initialParams={{
              search,
              type: ECommerceSearchResultTabEnum.DEPARTMENT,
            }}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => <ECommerceSeachResultTabbarLabel focused={focused} title={'Máy mới'} />,
            }}
            name={'e-commerce/search-result/new'}
            component={ECommerceSearchResultListResult}
            initialParams={{
              search,
              type: ECommerceSearchResultTabEnum.NEW,
            }}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => (
                <ECommerceSeachResultTabbarLabel focused={focused} title={'Đã qua sử dụng'} />
              ),
            }}
            name={'e-commerce/search-result/old'}
            component={ECommerceSearchResultListResult}
            initialParams={{
              search,
              type: ECommerceSearchResultTabEnum.OLD,
            }}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused }) => <ECommerceSeachResultTabbarLabel focused={focused} title={'Phụ tùng'} />,
            }}
            name={'e-commerce/search-result/accessory'}
            component={ECommerceSearchResultListResult}
            initialParams={{
              search,
              type: ECommerceSearchResultTabEnum.ACCESSORY,
            }}
          />
        </Tab.Navigator>
      </FilterContext.Provider>
    </SafeAreaView>
  );
};
