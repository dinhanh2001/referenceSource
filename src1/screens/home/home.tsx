import { CompositeNavigationProp, NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, VehicleMaintenance, tw } from '../../components';
import { ECommerceProductOrder } from '../../components/e-commerce/my-order/product-order';
import { Space } from '../../components/spacer';
import { useMeUserQuery } from '../../graphql/queries/meUser.generated';
import { useMyOrdersQuery } from '../../graphql/queries/myOrders.generated';
import { useUserMaintenancesQuery } from '../../graphql/queries/userMaintenances.generated';
import { useUserSummaryQuery } from '../../graphql/queries/userSummary.generated';
import {
  MaintenanceLevelEnum,
  MaintenanceStatusEnum,
  OrderProductEntity,
  OrderStatusEnum,
  VehicleEntity,
} from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { BottomTabScreensParams } from '../../navigator-params/bottom-tab-navigator';
import {
  AlertIcon,
  ArrowRight,
  CalendarSVG,
  DefaultAvatar,
  GearIcon,
  Purchasing,
  RepairBox,
  SearchCustomSvg,
  TowTruck,
  UserGuide,
  WrenchIcon,
} from '../../svg';
import { DEVICE_WIDTH } from '../../utils';

import { News } from './components';

export const Home = () => {
  const { data, refetch } = useMeUserQuery();
  const navigator =
    useNavigation<
      CompositeNavigationProp<
        CompositeNavigationProp<NavigationProp<RootNavigatorParamList>, NavigationProp<AppStackNavigatorParamList>>,
        NavigationProp<BottomTabScreensParams>
      >
    >();

  const isFocused = useIsFocused();

  const { data: dataSummary, loading: loadingSummary } = useUserSummaryQuery({
    variables: {
      input: {},
    },
    pollInterval: 1000 * 30, // 30s
    skip: !isFocused,
  });
  const { data: maintenance } = useUserMaintenancesQuery({
    variables: {
      statuses: [MaintenanceStatusEnum.NEW],
      limit: 6,
      page: 1,
      startDate: dayjs().day(1).format('YYYY-MM-DD'),
      endDate: dayjs().day(8).format('YYYY-MM-DD'),
    },
    pollInterval: 1000 * 30, // 30s
    skip: !isFocused,
  });
  const { data: orders } = useMyOrdersQuery({
    variables: {
      statuses: [OrderStatusEnum.WAIT_FOR_CONFIRM],
      page: 1,
      limit: 6,
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 30, // 30s
    skip: !isFocused,
  });
  // const {
  //   data: dataSummaryThisWeek,
  //   refetch: refetchSummaryThisWeek,
  //   loading: loadingSummaryThisWeek,
  // } = useUserSummaryQuery({
  //   variables: {
  //     input: {
  //       startDate: dayjs().day(1).format('YYYY-MM-DD'),
  //       endDate: dayjs().day(8).format('YYYY-MM-DD'),
  //     },
  //   },
  // });
  // const {
  //   data: dataSummaryNextWeek,
  //   refetch: refetchSummaryNextWeek,
  //   loading: loadingSummaryNextWeek,
  // } = useUserSummaryQuery({
  //   variables: {
  //     input: {
  //       startDate: dayjs().day(8).format('YYYY-MM-DD'),
  //       endDate: dayjs().day(15).format('YYYY-MM-DD'),
  //     },
  //   },
  // });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    await refetch();
    // await refetchSummary();
    // await refetchSummaryThisWeek();
    // await refetchSummaryNextWeek();
  });

  const { width } = useWindowDimensions();

  const mainFeatures = useMemo(
    () => [
      { onPress: () => navigator.navigate('repair-request'), icon: <TowTruck />, title: 'Yêu cầu\nsửa chữa' },
      {
        onPress: () => navigator.navigate('maintenance/create'),
        icon: <RepairBox />,
        title: 'Đặt lịch\nbảo dưỡng',
      },
      {
        onPress: () => {
          navigator.navigate('e-commerce/home');
        },
        icon: <Purchasing />,
        title: 'Mua sắm',
      },
      {
        onPress: () => {
          navigator.navigate('guide/list');
        },
        icon: <UserGuide />,
        title: 'Sổ tay',
      },
      {
        onPress: () => {
          navigator.navigate('feedback');
        },
        icon: <AlertIcon />,
        title: 'Phản ánh',
      },
    ],
    [navigator],
  );

  return (
    <ScrollView
      style={tw`bg-white `}
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      <SafeAreaView edges={['top']} style={tw`flex-row items-center pb-40px bg-primary px-16px pt-16px`}>
        {data?.meUser?.avatar?.fullThumbUrl ? (
          <Image style={tw`w-36px h-36px rounded-full`} source={{ uri: data?.meUser?.avatar?.fullThumbUrl }} />
        ) : (
          <DefaultAvatar height={36} width={36} />
        )}
        <View style={tw`ml-12px`}>
          <Text style={tw`text-12px`}>Xin chào!</Text>
          <Text style={tw`text-19px font-semibold text-grayscale-black leading-24px`}>
            {data?.meUser?.fullname || data?.meUser?.phone || 'Call Me User'}
          </Text>
        </View>
      </SafeAreaView>
      <View style={tw`flex-1 bg-white pt-7 px-16px`}>
        <Pressable
          onPress={() => navigator.navigate('home/search')}
          style={tw`absolute right-16px left-16px -top-24px flex-row bg-white px-4 py-3 shadow-md rounded-1 items-center gap-3`}
        >
          <SearchCustomSvg width={18} fill={tw.color('grayscale-light')} />
          <Text style={tw`text-grayscale-light`}>Tìm trên ứng dụng CALLME</Text>
        </Pressable>
        <View style={tw`flex-row flex-wrap items-start gap-y-4 mt-4`}>
          {mainFeatures.map((feat) => {
            return (
              <TouchableOpacity style={tw`w-1/4 justify-center items-center`} key={feat.title} onPress={feat.onPress}>
                <View style={tw`bg-primary rounded-full items-center justify-center h-44px w-44px`}>{feat.icon}</View>
                <View style={tw`w-auto`}>
                  <Text style={tw`text-center text-3 leading-4`}>{feat.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={tw`flex-row mt-4`}>
          <View style={tw`bg-[#FFFAEC] flex-1 p-16px rounded h-86px justify-between rounded-1`}>
            <Text style={tw`font-semibold text-25px`}>
              {loadingSummary ? <ActivityIndicator /> : dataSummary?.userSummary?.activeMaintenance || 0}
            </Text>
            <Text style={tw`text-13px`}>Xe đang bảo dưỡng</Text>
            <View style={tw`absolute right-8px top-8px`}>
              <GearIcon />
            </View>
          </View>
          <Space horizontal size={12} />
          <View style={tw`bg-[#FFFAEC] flex-1 p-16px rounded h-86px justify-between rounded-1`}>
            <Text style={tw`font-semibold text-25px`}>
              {loadingSummary ? <ActivityIndicator /> : dataSummary?.userSummary?.activeBooking || 0}
            </Text>
            <Text style={tw`text-13px`}>Xe đang sửa chữa</Text>
            <View style={tw`absolute right-8px top-8px`}>
              <WrenchIcon />
            </View>
          </View>
        </View>

        {!!maintenance?.userMaintenances?.items?.length && (
          <>
            <View style={tw`flex-row items-center mb-12px mt-28px`}>
              <Text style={tw`font-semibold text-17px mr-12px`}>Lịch bảo dưỡng</Text>
              <TouchableOpacity
                style={tw`bg-primary-light rounded-full w-20px h-20px justify-center items-center`}
                onPress={() => navigator.navigate('maintaince')}
              >
                <ArrowRight width={12} height={12} />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw`flex-row`}>
                {maintenance?.userMaintenances?.items?.map?.((item) => {
                  const { id, vehicle, maintenanceLevel, vehicleTypeCategory, startDate, endDate } = item || {};
                  return (
                    <TouchableOpacity
                      key={id}
                      style={tw`w-${width * 0.75}px border border-grayscale-border mr-3 p-3 rounded-1`}
                      onPress={() => navigator.navigate('maintenance/detail', { maintenanceId: id })}
                    >
                      <VehicleMaintenance vehicle={vehicle as VehicleEntity} />
                      <View style={tw`mt-3`}>
                        <Text style={tw`text-13px text-grayscale-gray`}>
                          {maintenanceLevel === MaintenanceLevelEnum.INCURRED
                            ? 'Bảo dưỡng phát sinh'
                            : `Định kỳ (giờ vận hành ${vehicleTypeCategory?.operatingNumber}h)`}
                        </Text>
                        <View style={tw`flex-row mt-3px rounded-1 items-center`}>
                          <CalendarSVG width={16} height={16} />
                          <Text style={tw`ml-2 text-13px font-medium`}>{`${dayjs(startDate).format(
                            'DD/MM/YYYY',
                          )} - ${dayjs(endDate).format('DD/MM/YYYY')}`}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}

        {orders?.myOrders?.items != null && orders?.myOrders?.items.length > 0 && (
          <View style={tw`-mx-4`}>
            <View style={tw`flex-row px-16px mt-32px`}>
              <Text style={tw`font-semibold text-17px`}>Đơn hàng chờ xác nhận</Text>
              <Space size={12} horizontal />
              <TouchableOpacity
                style={tw`bg-primary-light rounded-full p-4px`}
                onPress={() => navigator.navigate('e-commerce/my-order')}
              >
                <ArrowRight width={12} height={12} />
              </TouchableOpacity>
            </View>

            <Carousel
              width={DEVICE_WIDTH}
              height={170}
              loop={false}
              style={tw`w-screen mt-12px`}
              data={orders?.myOrders?.items ?? []}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={tw`w-screen px-16px flex-1 h-auto`}
                    onPress={() =>
                      navigator.navigate('e-commerce/my-order-detail', {
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
                      <ECommerceProductOrder
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
        {/* <View style={tw`flex-row justify-between`}>
          <View style={tw`bg-[#FFFAEC] w-44% p-16px rounded h-86px justify-between`}>
            <Text style={tw`text-13px`}>Tuần này</Text>
            <Text style={tw`font-semibold text-25px`}>
              {loadingSummaryThisWeek ? (
                <ActivityIndicator />
              ) : (
                dataSummaryThisWeek?.userSummary?.activeMaintenance || 0
              )}
              <Text style={tw`text-12px ml-16px`}>{`  Xe`}</Text>
            </Text>
          </View>
          <View style={tw`bg-[#FFFAEC] w-44% p-16px rounded h-86px justify-between`}>
            <Text style={tw`text-13px`}>Tuần tới</Text>
            <Text style={tw`font-semibold text-25px`}>
              {loadingSummaryNextWeek ? (
                <ActivityIndicator />
              ) : (
                dataSummaryNextWeek?.userSummary?.activeMaintenance || 0
              )}
              <Text style={tw`text-12px ml-16px`}>{`  Xe`}</Text>
            </Text>
          </View>
        </View> */}
        <News isRefetchingByUser={isRefetchingByUser} />
      </View>
    </ScrollView>
  );
};
