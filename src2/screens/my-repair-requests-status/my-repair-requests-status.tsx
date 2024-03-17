import { useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { useBookingQuery } from '../../graphql/queries/booking.generated';
import { useBookingStatusHistoryQuery } from '../../graphql/queries/bookingStatusHistory.generated';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorScreenProps } from '../../navigator-params';
import { BookingStatusEntity, BookingStatusEnum } from '../../graphql/type.interface';

const STATUS_TEXT: any = {
  [BookingStatusEnum.WAIT_FOR_CONFIRM]: 'Bạn đã tạo yêu cầu sửa chữa.',
  [BookingStatusEnum.ASSIGNED_TECHNICIAN]: 'Đại lý đã phân bổ kỹ thuật viên.',
  [BookingStatusEnum.RESCHEDULED]: 'Kỹ thuật viên đã hẹn lại lịch kiểm tra.',
  [BookingStatusEnum.TECHNICIAN_ARRIVED]: 'Kỹ thuật viên đã đến.',
  [BookingStatusEnum.TECHNICIAN_ARRIVING]: 'Kỹ thuật viên đang đến.',
  [BookingStatusEnum.CANCEL]: 'Bạn đã huỷ yêu cầu sửa chữa.',
  [BookingStatusEnum.COMPLETE]: 'Yêu cầu sửa chữa đã hoàn thành.',
  [BookingStatusEnum.QUOTATION_ACCEPTED]: 'Bạn đã chấp nhận báo giá.',
  [BookingStatusEnum.QUOTATION_REJECTED]: 'Bạn đã yêu cầu tạo lại báo giá.',
  [BookingStatusEnum.QUOTATION_REQUESTED]: 'Kỹ thuật viên đã tạo báo giá.',
  [BookingStatusEnum.SETTLEMENT_ACCEPTED]: 'Bạn đã chấp nhận quyết toán.',
  [BookingStatusEnum.SETTLEMENT_REJECTED]: 'Bạn đã từ chối quyết toán.',
  [BookingStatusEnum.SETTLEMENT_REQUESTED]: 'Kỹ thuật viên đã gửi quyết toán.',
};

export const MyRepairRequestsStatus = () => {
  const {
    params: { bookingId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-requests/request-status'>['route']>();

  const { data: booking } = useBookingQuery({ variables: { id: bookingId } });
  const { data, loading, refetch } = useBookingStatusHistoryQuery({ variables: { bookingId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { code, createdAt: bookingCreated } = booking?.booking || {};

  const renderStatus = useCallback(({ status, createdAt, id }: BookingStatusEntity, index: number) => {
    const isActive = index === 0;

    return (
      <View key={id} style={tw`flex-row items-center `}>
        <View style={tw`h-4 w-4 rounded-full bg-grayscale-border justify-center items-center`}>
          <View style={tw`h-2 w-2 ${isActive ? 'bg-blue' : 'bg-[#A6ABAD]'} rounded-full`} />
        </View>
        <View style={tw`z-20 bg-white h-[72px] flex-1`}>
          <View style={tw`border-grayscale-border border h-full ml-3 justify-center pl-4 rounded `}>
            <Text style={[tw`text-13px font-bold`, isActive && tw`text-blue`]}>{STATUS_TEXT?.[status]}</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>
              Thời gian:
              <Text style={tw`text-grayscale-black`}>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <View>
          <View style={tw`p-4 justify-center items-center bg-white`}>
            <Text style={tw`font-bold text-14px`}>{code}</Text>
            <Text style={tw`text-12px text-grayscale-gray`}>
              Đặt lúc: {dayjs(bookingCreated).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
          <View style={tw`w-full h-6px bg-grayscale-border`} />
        </View>
        <View style={tw`m-4 flex-col gap-3`}>
          <View style={[{ ...StyleSheet.absoluteFillObject, ...styles.dash }, tw`border-[#EEEEEE] z-0`]} />
          {data?.bookingStatusHistory?.map?.(renderStatus)}
        </View>
      </ScrollView>
    );
  }, [bookingCreated, code, data?.bookingStatusHistory, isRefetchingByUser, loading, refetchByUser, renderStatus]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Trạng thái yêu cầu sửa chữa" />
      {renderContent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dash: {
    borderStyle: 'dashed',
    borderWidth: 1,
    bottom: 36,
    left: 8,
    top: 36,
  },
});
