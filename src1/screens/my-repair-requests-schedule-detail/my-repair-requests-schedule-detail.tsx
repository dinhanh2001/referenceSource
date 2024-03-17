import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { useBookingQuery } from '../../graphql/queries/booking.generated';
import { PartnerEntity } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorScreenProps } from '../../navigator-params';
import { ContactView } from '../my-repair-request-review/components';

export const MyRepairRequestsScheduleDetail = () => {
  const {
    params: { bookingId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-request/schedule-detail'>['route']>();

  const { data, loading, refetch } = useBookingQuery({ variables: { id: bookingId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { scheduleTime, scheduleReason, code, createdAt, technician, statusDetail } = data?.booking || {};

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        <View style={tw`justify-center items-center py-4`}>
          <Text style={tw`text-14px font-bold`}>{code}</Text>
          <Text style={tw`text-3 mt-1`}>Đặt lúc: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        <View style={tw`h-6px bg-grayscale-border w-full`} />
        <View style={tw`p-4`}>
          <Text style={tw`text-14px text-grayscale-gray`}>Thời gian hẹn đến sửa chữa</Text>
          <View style={tw`justify-center items-center mt-4 py-4 border border-grayscale-border`}>
            <Text style={tw`text-17px font-bold`}>{dayjs(scheduleTime).locale('vi').format('LLL')}</Text>
          </View>
          <Text style={tw`text-14px text-grayscale-gray mt-20px`}>Từ</Text>
          <ContactView partner={technician as PartnerEntity} />
          <Text style={tw`text-14px text-grayscale-gray mt-5`}>Lý do</Text>
          <View style={tw`justify-center items-center mt-4 py-4 bg-grayscale-bg`}>
            <Text style={tw`text-13px`}>{scheduleReason}</Text>
          </View>
          <Text style={tw`text-12px text-grayscale-gray text-center mt-5`}>
            Phản hồi lúc: {dayjs(statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      </ScrollView>
    );
  }, [
    code,
    createdAt,
    isRefetchingByUser,
    loading,
    refetchByUser,
    scheduleReason,
    scheduleTime,
    statusDetail?.createdAt,
    technician,
  ]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Chi tiết hẹn" />
      {renderContent}
    </SafeAreaView>
  );
};
