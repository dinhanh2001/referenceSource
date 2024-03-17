import { Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { AppStackNavigatorScreenProps } from '../../navigator-params';
import { useUserGetLatestQuotationOfBookingQuery } from '../../graphql/queries/userGetLatestQuotationOfBooking.generated';

export const MyRepairRequestsRequoteDetail = () => {
  const {
    params: { bookingId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-requests/requote-detail'>['route']>();

  const { data, loading } = useUserGetLatestQuotationOfBookingQuery({
    variables: { bookingId },
  });
  const { rejectReasons, createdAt, updatedAt, reasons } = data?.userGetLatestQuotationOfBooking || {};

  const renderContent = useMemo(() => {
    const reasonText = reasons?.map((reason) => reason?.name).join(', ');

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-14px text-grayscale-gray`}>Ngày gửi báo giá</Text>
          <Text style={tw`text-14px`}>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <Text style={tw`text-14px text-grayscale-gray`}>Ngày từ chối</Text>
          <Text style={tw`text-14px`}>{dayjs(updatedAt).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        <View style={tw`flex-row  justify-between mt-3`}>
          <Text style={tw`text-14px text-grayscale-gray`}>Lý do từ chối</Text>
          <View style={tw`flex-1 ml-20px items-end`}>
            {!!reasonText && <Text style={tw`text-14px mb-4px`}>{reasonText}</Text>}
            {!!rejectReasons && <Text style={tw`text-14px `}>{rejectReasons}</Text>}
          </View>
        </View>
      </View>
    );
  }, [createdAt, loading, reasons, rejectReasons, updatedAt]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Chi tiết yêu cầu báo giá lại" />
      {renderContent}
    </SafeAreaView>
  );
};
