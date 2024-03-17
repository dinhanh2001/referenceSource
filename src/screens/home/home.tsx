import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Image, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import Constants from 'expo-constants';
import React, { memo, useCallback } from 'react';
import { Dimensions, FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { ActivityIndicator, Space, VehicleSection, tw } from '../../components';
import { MyOrderProductItem } from '../../components/my-order/product-item';
import { useAuth } from '../../contexts';
import { usePartnerBookingsQuery } from '../../graphql/queries/partnerBookings.generated';
import { usePartnerOrdersQuery } from '../../graphql/queries/partnerOrders.generated';
import { usePartnerSummaryQuery } from '../../graphql/queries/partnerSummary.generated';
import {
  BookingStatusEnum,
  OrderProductEntity,
  OrderStatusEnum,
  PartnerMenuEnum,
  PartnerTypeEnum,
} from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';
import {
  ArrowRightSVG,
  BookSVG,
  CraneSVG,
  DiscountCircleSVG,
  DocumentHomeSVG,
  HelmetSVG,
  Receipt2SVG,
  SupportSVG,
  WalletSVG,
} from '../../svg';
import { DEVICE_WIDTH } from '../../utils';

import { HomeScreenNavigationProps } from './type';
const { width } = Dimensions.get('window');

export const Home = memo(() => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const { partner } = useAuth();

  const isFocus = useIsFocused();

  const { data, loading, refetch } = usePartnerSummaryQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 60 * 5, // 5m
    skip: !isFocus,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const handleNavigation = useCallback(
    (screen: any) => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  const { data: bookingData } = usePartnerBookingsQuery({
    variables: {
      statuses: [
        BookingStatusEnum.WAIT_FOR_CONFIRM,
        BookingStatusEnum.ASSIGNED_TECHNICIAN,
        BookingStatusEnum.QUOTATION_ACCEPTED,
        BookingStatusEnum.QUOTATION_REJECTED,
        BookingStatusEnum.QUOTATION_REQUESTED,
        BookingStatusEnum.RESCHEDULED,
        BookingStatusEnum.TECHNICIAN_ARRIVED,
        BookingStatusEnum.TECHNICIAN_ARRIVING,
      ],
      limit: 4,
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 30, // 30s
    skip: !isFocus,
  });

  const { data: orders } = usePartnerOrdersQuery({
    variables: {
      statuses: [OrderStatusEnum.WAIT_FOR_CONFIRM],
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 30, // 30s
    skip: !isFocus,
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      <View style={tw`pt-${Constants.statusBarHeight}px px-16px bg-grayscale-gray pb-56px`}>
        <Space size={9} />
        <View>
          <View style={tw`flex-row items-center`}>
            <Image source={{ uri: partner?.avatar?.fullThumbUrl ?? '' }} style={tw`w-56px h-56px rounded-full`} />
            <Space horizontal />
            <View style={tw`flex-1`}>
              <Text style={tw`font-semibold text-16px text-white leading-20px`} numberOfLines={2}>
                {partner?.fullname}
              </Text>
            </View>
          </View>
        </View>

        {partner?.type === PartnerTypeEnum.AGENCY && (
          <>
            <Space size={25} />
            <View style={tw`flex-row`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-white`}>
                  {loading ? <ActivityIndicator /> : data?.partnerSummary?.totalTechnician || 0}
                </Text>

                <Text style={tw`text-11px text-white`}>Kĩ thuật viên</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-white`}>
                  {loading ? <ActivityIndicator /> : data?.partnerSummary?.totalProduct || 0}
                </Text>
                <Text style={tw`text-11px text-white`}>Sản phẩm</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-white`}>
                  {loading ? <ActivityIndicator /> : data?.partnerSummary?.totalReview || 0}
                </Text>
                <Text style={tw`text-11px text-white`}>Đánh giá</Text>
              </View>
              <Space horizontal />
              {/* <View style={tw`items-end`}>
                <View style={tw`border  px-16px py-6px rounded-full border-white`}>
                  <Setting2SVG width={16} height={16} fill={tw.color('white')} />
                </View>
              </View> */}
            </View>
          </>
        )}
      </View>
      <View style={tw`-mt-30px px-16px`}>
        <View style={tw`shadow-xl bg-white flex-row items-center rounded-4px`}>
          <WalletSVG style={tw`m-20px`} />
          <View>
            <Text style={tw`text-12px`}>Doanh thu tuần này</Text>
            <Text style={tw`text-19px font-bold`}>{`${thousandSeparator(
              data?.partnerSummary?.totalRevenue || 0,
            )} đ`}</Text>
          </View>
        </View>
        <Space size={20} />
        <View style={tw`flex-row justify-center`}>
          <Text>
            <Text style={tw`font-semibold text-13px`}>{data?.partnerSummary?.totalOrder}</Text> đơn hàng
          </Text>
          <Space size={8} horizontal />
          <Text>|</Text>
          <Space size={8} horizontal />
          <Text>
            <Text style={tw`font-semibold text-13px`}>{data?.partnerSummary?.totalBooking || 0}</Text> lượt sửa chữa,
            bảo dưỡng
          </Text>
        </View>
      </View>
      <Space size={20} />
      <View style={tw`flex-row flex-wrap -mr-16px px-16px`}>
        {MENUS.map((e, index) => {
          if (e?.authorization != null && partner && !e.authorization.includes(partner.type)) return null;
          if (((partner && partner?.menus) ?? []).includes(e?.value)) {
            return (
              <TouchableOpacity key={index} style={tw`mt-12px `} onPress={() => handleNavigation(e.routeName)}>
                <View style={tw`w-${(width - 32) / 4}px items-center justify-center`}>
                  {e.icon}
                  <Space size={8} />
                  <Text>{e.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>

      {bookingData?.partnerBookings.items != null && bookingData?.partnerBookings.items.length > 0 && (
        <View>
          <View style={tw`flex-row px-16px mt-32px`}>
            <Text style={tw`font-semibold text-17px`}>Sửa chữa đang nhận</Text>
            <Space size={12} horizontal />
            <TouchableOpacity
              style={tw`bg-primary-light rounded-full p-4px`}
              onPress={() => navigation.navigate(AppRoutes.REPAIR_REQUEST_LIST_SCREEN)}
            >
              <ArrowRightSVG width={12} height={12} />
            </TouchableOpacity>
          </View>
          <Carousel
            width={DEVICE_WIDTH}
            height={160}
            loop={false}
            style={tw`w-screen mt-12px`}
            data={bookingData?.partnerBookings.items ?? []}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={tw`w-screen px-16px flex-1`}
                  onPress={() =>
                    navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN, {
                      bookingId: item.id,
                    })
                  }
                >
                  <View style={tw`border rounded-4px p-12px border-grayscale-border flex-1`}>
                    <View style={tw`flex-row`}>
                      <View style={tw`flex-1 justify-center`}>
                        <Text style={tw`font-bold`}>{item.code}</Text>
                      </View>
                    </View>
                    <Text style={tw`font-normal text-grayscale-gray`}>
                      {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
                    </Text>
                    <Space style={tw`my-12px bg-grayscale-border h-1px`} />
                    <VehicleSection data={item.vehicle} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {orders?.partnerOrders?.items != null && orders?.partnerOrders?.items.length > 0 && (
        <View>
          <View style={tw`flex-row px-16px mt-32px`}>
            <Text style={tw`font-semibold text-17px`}>Đơn hàng mới</Text>
            <Space size={12} horizontal />
            <TouchableOpacity
              style={tw`bg-primary-light rounded-full p-4px`}
              onPress={() =>
                navigation.navigate(AppRoutes.MY_ORDER_LIST_SCREEN, {
                  initialRouteName: AppRoutes.MY_ORDER_WAITING_SCREEN,
                })
              }
            >
              <ArrowRightSVG width={12} height={12} />
            </TouchableOpacity>
          </View>

          <Carousel
            width={DEVICE_WIDTH}
            height={170}
            loop={false}
            style={tw`w-screen mt-12px`}
            data={orders?.partnerOrders?.items ?? []}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={tw`w-screen px-16px flex-1 h-auto`}
                  onPress={() =>
                    navigation.navigate(AppRoutes.MY_ORDER_DETAIL_SCREEN, {
                      orderId: item.id,
                    })
                  }
                >
                  <View style={tw`border rounded-4px p-12px border-grayscale-border flex-1`}>
                    <View style={tw`flex-row`}>
                      <View style={tw`flex-1 justify-center`}>
                        <Text style={tw`font-bold`}>{item.code}</Text>
                      </View>
                    </View>
                    <Text style={tw`font-normal text-grayscale-gray`}>
                      {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')} {item?.product?.length}
                    </Text>
                    <Space style={tw`my-2 bg-grayscale-border`} size={1} />
                    <MyOrderProductItem
                      linesName={2}
                      key={item?.product?.[0]?.id}
                      product={item?.product?.[0] as OrderProductEntity}
                      containerStyle={tw`mt-2`}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      <Space size={32} />
      <View>
        <View style={tw`flex-row px-16px`}>
          <Text style={tw`font-semibold text-17px`}>Có gì mới?</Text>
          <Space size={12} horizontal />
          <TouchableOpacity style={tw`bg-primary-light rounded-full p-4px`}>
            <ArrowRightSVG width={12} height={12} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={tw`pl-16px mt-12px`}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]}
          horizontal
          renderItem={() => {
            return (
              <View style={tw`rounded-4px mr-12px w-220px`}>
                <Image source={{ uri: 'https://picsum.photos/200' }} style={tw`rounded-4px h-120px`} />
                <Text style={tw`font-medium text-black`}>
                  Bàn giao máy xúc lật xcmg lw500fn gầu 3,5 m3 cho trạm trộn bê tông
                </Text>
                <Text style={tw`text-grayscale-gray`}>4 tháng 3, 2023</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.toString()}
        />
      </View>
      <Space size={32} />
    </ScrollView>
  );
});

const MENUS = [
  {
    icon: <Receipt2SVG width={28} height={28} />,
    label: 'Đơn hàng',
    routeName: AppRoutes.MY_ORDER_LIST_SCREEN,
    value: PartnerMenuEnum.ORDER,
  },
  {
    icon: <SupportSVG width={28} height={28} />,
    label: 'Sửa chữa',
    routeName: AppRoutes.REPAIR_REQUEST_LIST_SCREEN,
    value: PartnerMenuEnum.REPAIR,
  },
  {
    icon: <CraneSVG width={28} height={28} />,
    label: 'Sản phẩm',
    routeName: AppRoutes.PRODUCT_LIST_SCREEN,
    value: PartnerMenuEnum.PRODUCT,
  },
  {
    icon: <HelmetSVG width={28} height={28} />,
    label: 'Kĩ thuật viên',
    routeName: AppRoutes.TECHNICIAN_LIST_SCREEN,
    value: PartnerMenuEnum.TECHNICIAN,
    authorization: [PartnerTypeEnum.AGENCY],
  },
  {
    icon: <BookSVG width={28} height={28} />,
    label: 'Khoá học',
    routeName: AppRoutes.COURSE,
    value: PartnerMenuEnum.COURSE,
    authorization: [PartnerTypeEnum.TECHNICIAN, PartnerTypeEnum.FREELANCER_TECHNICIAN],
  },
  {
    icon: <DocumentHomeSVG width={28} height={28} />,
    label: 'Tài liệu',
    routeName: AppRoutes.DOCUMENT_SCREEN,
    value: PartnerMenuEnum.DOCUMENT,
    authorization: [PartnerTypeEnum.TECHNICIAN, PartnerTypeEnum.FREELANCER_TECHNICIAN],
  },
  {
    icon: <DiscountCircleSVG width={28} height={28} />,
    label: 'Khuyến mãi',
    routeName: AppRoutes.VOUCHER_SCREEN,
    value: PartnerMenuEnum.DISCOUNT,
  },
];
