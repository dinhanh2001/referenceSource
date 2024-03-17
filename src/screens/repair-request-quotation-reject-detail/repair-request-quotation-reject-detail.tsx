import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';

import { ActivityIndicator, tw } from '../../components';
import { usePartnerGetLatestQuotationOfBookingQuery } from '../../graphql/queries/partnerGetLatestQuotationOfBooking.generated';
import { AppRoutes } from '../../navigator-params';

import { PropsType, RepairRequestRejectDetailScreenNavigationProps } from './type';

type RowProps = {
  label: string;
  content: string;
  subContent?: string;
};

const Row = ({ label, content = '', subContent }: RowProps) => (
  <View style={tw`flex-row mx-16px mt-16px justify-between`}>
    <Text style={tw`text-grayscale-gray`}>{label}</Text>
    <View style={tw`flex-1 ml-20px items-end`}>
      {!!content && <Text style={tw`text-grayscale-black mb-4px`}>{content}</Text>}
      {!!subContent && <Text style={tw`text-grayscale-black `}>{subContent}</Text>}
    </View>
  </View>
);

export const RepairRequestQuotationRejectDetail = ({ route }: PropsType) => {
  const navigation = useNavigation<RepairRequestRejectDetailScreenNavigationProps>();
  const { bookingId } = route?.params || {};
  const { data, loading } = usePartnerGetLatestQuotationOfBookingQuery({ variables: { bookingId } });
  const { rejectReasons, booking, createdAt, reasons } = data?.partnerGetLatestQuotationOfBooking || {};
  const reasonText = reasons?.map?.((reason) => reason?.name)?.join?.(', ');

  const onReQuotation = () => navigation.replace(AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN, { bookingId });

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Row label="Nguời gửi báo giá" content={booking?.technician?.fullname || ''} />
      <Row label="Ngày gửi báo giá" content={dayjs(createdAt).format('DD/MM/YYYY HH:mm')} />
      <Row label="Ngày từ chối" content={dayjs(booking?.statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')} />
      <Row label="Lý do từ chối" content={reasonText as string} subContent={rejectReasons || ''} />
      <Button containerStyle={tw`mx-16px mt-28px`} title={'Lên báo giá lại'} onPress={onReQuotation} />
    </View>
  );
};
