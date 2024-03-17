import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Text } from '@rneui/themed';
import Constants from 'expo-constants';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';

import { ActivityIndicator, Space, tw } from '../../components';
import { useAuth } from '../../contexts';
import { usePartnerCountOrderItemForEachStatusQuery } from '../../graphql/queries/partnerCountOrderItemForEachStatus.generated';
import { usePartnerCountProductQuotationForEachStatusQuery } from '../../graphql/queries/partnerCountProductQuotationForEachStatus.generated';
import { usePartnerSummaryQuery } from '../../graphql/queries/partnerSummary.generated';
import { OrderStatusEnum, ProductQuotationStatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { Camera, MagicStar, Tractor, WarehouseIcon } from '../../svg';
import { RowItem } from '../account';
import { MyOrderTabParamList } from '../my-order/my-order-list-screen/type';
const { width } = Dimensions.get('window');

const formatLeadingZero = (num: number, lead?: number) =>
  Number(num)
    .toString()
    .padStart(lead ?? 2, '0');

export const Store = React.memo(() => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const { partner } = useAuth();

  const {
    data: dataOrder,
    loading: loadingOrder,
    refetch: refetchOrder,
  } = usePartnerCountOrderItemForEachStatusQuery();
  const {
    data: dataProductQuotation,
    loading: loadingProductQuotation,
    refetch: refetchProductQuotation,
  } = usePartnerCountProductQuotationForEachStatusQuery();
  const { data: dataSummary, refetch: refetchSummary } = usePartnerSummaryQuery();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    await refetchOrder();
    await refetchProductQuotation();
    await refetchSummary();
  });

  const orderCountByStatus = useCallback(
    (statuses: OrderStatusEnum[]) => {
      if (loadingOrder) return <ActivityIndicator />;
      const orderCount = (dataOrder?.partnerCountOrderItemForEachStatus ?? []).reduce(
        (acc, cur) => acc + (statuses?.includes?.(cur?.status) ? cur?.totalItem : 0),
        0,
      );
      if (orderCount) {
        return formatLeadingZero(orderCount);
      }
      return 0;
    },
    [dataOrder, loadingOrder],
  );

  const productQuotationCountByStatus = useCallback(
    (status: ProductQuotationStatusEnum) => {
      if (loadingProductQuotation) return <ActivityIndicator />;
      const orderCount = (dataProductQuotation?.partnerCountProductQuotationForEachStatus ?? []).reduce(
        (acc, cur) => acc + (status === cur?.status ? cur?.totalItem : 0),
        0,
      );
      if (orderCount) {
        return formatLeadingZero(orderCount);
      }
      return 0;
    },
    [dataProductQuotation?.partnerCountProductQuotationForEachStatus, loadingProductQuotation],
  );

  const orderListItems = useMemo(
    () => [
      {
        amount: orderCountByStatus([OrderStatusEnum?.WAIT_FOR_CONFIRM]),
        label: 'Chờ xác nhận',
        initialRouteName: AppRoutes.MY_ORDER_WAITING_SCREEN,
      },
      {
        amount: orderCountByStatus([OrderStatusEnum?.CANCEL]),
        label: 'Đơn hủy',
        initialRouteName: AppRoutes.MY_ORDER_CANCELED_SCREEN,
      },
      {
        amount: orderCountByStatus([OrderStatusEnum?.SHIPPING]),
        label: 'Đang giao',
        initialRouteName: AppRoutes.MY_ORDER_INPROGRESS_SCREEN,
      },
      {
        amount: orderCountByStatus([OrderStatusEnum?.COMPLETE, OrderStatusEnum.DELIVERED]),
        label: 'Đã giao',
        initialRouteName: AppRoutes.MY_ORDER_COMPLETED_SCREEN,
      },
    ],
    [orderCountByStatus],
  );

  const priceListItems = useMemo(
    () => [
      {
        amount: productQuotationCountByStatus(ProductQuotationStatusEnum.RESPONDED),
        label: 'Đã gửi báo giá',
        initialRouteName: ProductQuotationStatusEnum.RESPONDED,
      },
      {
        amount: productQuotationCountByStatus(ProductQuotationStatusEnum.SENT),
        label: 'Chưa gửi báo giá',
        initialRouteName: ProductQuotationStatusEnum.SENT,
      },
    ],
    [productQuotationCountByStatus],
  );

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      <View style={tw`pt-${Constants.statusBarHeight}px px-16px bg-grayscale-gray pb-56px`}>
        <Space size={9} />
        <View>
          <View style={tw`flex-row`}>
            <View style={tw`relative`}>
              <Image source={{ uri: partner?.avatar?.fullThumbUrl ?? '' }} style={tw`w-56px h-56px rounded-full`} />
              {partner?.parentInfo != null && (
                <View style={tw`w-24px h-24px rounded-full overflow-hidden`}>
                  <Image source={{ uri: partner.parentInfo.avatar?.fullThumbUrl ?? '' }} />
                </View>
              )}
            </View>
            <Space horizontal />
            <View style={tw`justify-center`}>
              <Text style={tw`font-semibold text-16px text-white leading-20px`}>{partner?.fullname}</Text>
              <Text style={tw`text-11px text-white`}>ID: {partner?.id.split('-')[0].toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
      <Space size={20} />
      <View style={tw`mb-28px mr-16px`}>
        <RowItem
          title="Đơn hàng"
          onPress={() => {
            navigation.navigate(AppRoutes.MY_ORDER_LIST_SCREEN, {
              initialRouteName: AppRoutes.MY_ORDER_WAITING_SCREEN,
            });
          }}
        />
      </View>
      <View style={tw`flex-row flex-wrap -mr-16px px-16px`}>
        {orderListItems.map((e, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(AppRoutes.MY_ORDER_LIST_SCREEN, {
                  initialRouteName: e?.initialRouteName as keyof MyOrderTabParamList,
                })
              }
            >
              <View style={tw`w-${(width - 32) / 4}px items-center justify-center`} key={index}>
                <Text h4 style={tw`pt-16px`}>
                  {e.amount}
                </Text>
                <Space size={8} />
                <Text>{e.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Space size={20} />
      <View style={tw`mb-28px mr-16px`}>
        <RowItem
          title="Yêu cầu báo giá"
          onPress={() => {
            navigation.navigate(AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN, {
              initialRouteName: ProductQuotationStatusEnum.SENT,
            });
          }}
        />
      </View>
      <View style={tw`flex-row flex-wrap -mr-16px px-16px`}>
        {priceListItems.map((e, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN, { initialRouteName: e?.initialRouteName })
              }
            >
              <View style={tw`w-${(width - 32) / 2}px items-center justify-center`} key={index}>
                <Text h4 style={tw`pt-16px`}>
                  {e.amount}
                </Text>
                <Space size={8} />
                <Text>{e.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Space size={20} />
      <View style={tw`mb-28px mx-16px`}>
        <RowItem
          icon={<Tractor width={24} />}
          title="Sản phẩm"
          amount={<Text style={tw`mr-16px`}>{dataSummary?.partnerSummary?.totalProduct || 0}</Text>}
          onPress={() => {
            navigation.navigate(AppRoutes.PRODUCT_LIST_SCREEN);
          }}
        />
        <Space size={8} />
        <RowItem
          icon={<MagicStar width={24} />}
          title="Đánh giá gian hàng"
          amount={<Text style={tw`mr-16px`}>{dataSummary?.partnerSummary?.totalReview || 0}</Text>}
          onPress={() => {
            navigation.navigate(AppRoutes.REVIEW_STORE_SCREEN);
          }}
        />
        <Space size={8} />
        <RowItem
          icon={<Camera width={24} />}
          title="Doanh thu gian hàng"
          onPress={() => {
            navigation.navigate(AppRoutes.REVENUE_SCREEN);
          }}
        />
        <Space size={8} />
        <RowItem
          icon={<WarehouseIcon width={24} />}
          title="Kho hàng"
          onPress={() => {
            navigation.navigate(AppRoutes.WAREHOUSE_LIST_SCREEN);
          }}
        />
      </View>
    </ScrollView>
  );
});
