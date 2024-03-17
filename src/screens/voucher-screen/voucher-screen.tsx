import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useMemo } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';

import { AppHeader, Space, TabBarLabel1, tw } from '../../components';
import { AppRoutes } from '../../navigator-params';
import { VoucherTabScreen } from '../voucher-tab-screen';
import { usePartnerCountDiscountCodeQuery } from '../../graphql/queries/partnerCountDiscountCode.generated';
import { Empty6 } from '../../svg';
import { useRefreshByUser } from '../../hooks';

import { PropsType, VoucherScreenNavigationProps } from './type';

type VoucherTabScreenParam = {
  discountStatus: boolean;
  refetchBadge?(): Promise<any>;
};

export type VoucherTabParamList = {
  [AppRoutes.VOUCHER_ACTIVE_TAB]: VoucherTabScreenParam;
  [AppRoutes.VOUCHER_INACTIVE_TAB]: VoucherTabScreenParam;
};

const Tab = createMaterialTopTabNavigator<VoucherTabParamList>();

export const VoucherScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<VoucherScreenNavigationProps>();

  const { data, refetch: refetchBadge } = usePartnerCountDiscountCodeQuery();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetchBadge);

  const hasPromotion = useMemo(() => {
    const count = data?.partnerCountDiscountCode?.reduce?.((acc, cur) => acc + cur.totalItem, 0) || 0;

    return count > 0;
  }, [data?.partnerCountDiscountCode]);

  const handleNavigateAddPromotion = useCallback(() => {
    navigation.navigate(AppRoutes.VOUCHER_ADD_SCREEN, {});
  }, [navigation]);

  const renderRightHeader = useMemo(() => {
    if (!hasPromotion) {
      return null;
    }
    return (
      <TouchableOpacity onPress={handleNavigateAddPromotion}>
        <Text style={tw`text-primary-dark font-semibold`}>+ Thêm mới</Text>
      </TouchableOpacity>
    );
  }, [handleNavigateAddPromotion, hasPromotion]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-white`}>
      <AppHeader title="Khuyến mãi" containerStyle={tw`bg-white`} rightView={renderRightHeader} />

      {hasPromotion ? (
        <Tab.Navigator
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
            name={AppRoutes.VOUCHER_ACTIVE_TAB}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabBarLabel1
                  focused={focused}
                  title={'Đang hoạt động'}
                  badge={data?.partnerCountDiscountCode.find((e) => e.isActivities)?.totalItem ?? 0}
                />
              ),
            }}
            initialParams={{
              discountStatus: true,
              refetchBadge,
            }}
            component={VoucherTabScreen}
          />
          <Tab.Screen
            name={AppRoutes.VOUCHER_INACTIVE_TAB}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabBarLabel1
                  focused={focused}
                  title={'Đã kết thúc'}
                  badge={data?.partnerCountDiscountCode.find((e) => !e.isActivities)?.totalItem ?? 0}
                />
              ),
            }}
            initialParams={{
              discountStatus: false,
              refetchBadge,
            }}
            component={VoucherTabScreen}
          />
        </Tab.Navigator>
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
          <View style={tw`items-center mt-35px`}>
            <Empty6 />
            <Space size={8} />
            <Text style={tw`text-grayscale-gray text-center`}>"Chưa có mã giảm giá nào"</Text>
            <Button
              style={tw`px-24px mt-16px`}
              titleStyle={tw`font-semibold text-13px leading-18px mx-40px`}
              onPress={handleNavigateAddPromotion}
            >
              Thêm mới
            </Button>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
});
