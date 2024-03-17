import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Image, Text } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { Space, TabBarLabel2, tw } from '../../../components';
import { usePartnerGetStoreQuery } from '../../../graphql/queries/partnerGetStore.generated';
import { StoreEntity } from '../../../graphql/type.interface';
import { AppRoutes } from '../../../navigator-params';
import { WarehouseImportExportTab } from '../warehouse-import-export-tab';
import { WarehouseWarehouseTab } from '../warehouse-warehouse-tab';

import {
  PropsType,
  WarehouseDetailScreenNavigationProps,
  WarehouseDetailScreenRouteProps,
  WarehouseDetailTabParamList,
} from './type';

const Tab = createMaterialTopTabNavigator<WarehouseDetailTabParamList>();

export const WarehouseDetailScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<WarehouseDetailScreenNavigationProps>();
  const { params } = useRoute<WarehouseDetailScreenRouteProps>();

  const { data, refetch } = usePartnerGetStoreQuery({
    variables: { id: params.id },
  });
  const navigateEditWarehouse = useCallback(
    (item: StoreEntity) => {
      navigation.navigate(AppRoutes.WAREHOUSE_ADD_SCREEN, { data: item, isEdit: true });
    },
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  return (
    <View style={tw`flex-1`}>
      <View style={tw` p-16px flex-row items-center`}>
        <Image source={{ uri: data?.partnerGetStore.avatar?.fullOriginalUrl ?? '' }} style={tw`w-60px h-60px`} />
        <Space horizontal />
        <View style={tw`justify-between flex-1`}>
          <Text style={tw`font-semibold`}>{data?.partnerGetStore.name}</Text>
          <Space size={14} />
          <View>
            <Text style={tw`text-13px text-grayscale-gray`}>{data?.partnerGetStore.phoneNumber}</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>{data?.partnerGetStore.address}</Text>
          </View>
        </View>
        <Space horizontal />
        <Text
          onPress={() => navigateEditWarehouse(data?.partnerGetStore as StoreEntity)}
          style={tw`font-semibold text-primary`}
        >
          Sửa
        </Text>
      </View>
      <Space backgroundColor={tw.color('grayscale-bg')} size={6} />
      <Tab.Navigator>
        <Tab.Screen
          name={AppRoutes.WAREHOUSE_IMPORT_TAB}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Nhập'} />,
          }}
          component={WarehouseImportExportTab}
          initialParams={{ isImport: true, storeId: params.id }}
        />
        <Tab.Screen
          name={AppRoutes.WAREHOUSE_EXPORT_TAB}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Xuất'} />,
          }}
          component={WarehouseImportExportTab}
          initialParams={{ isImport: false, storeId: params.id }}
        />
        <Tab.Screen
          name={AppRoutes.WAREHOUSE_WAREHOUSE_TAB}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Kho hàng'} />,
          }}
          component={WarehouseWarehouseTab}
          initialParams={{ storeId: params.id }}
        />
      </Tab.Navigator>
    </View>
  );
});
