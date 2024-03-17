import { View, Text, TouchableOpacity, ScrollView, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { Clock, CloseSvg } from '../../svg';
import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../navigator-params';
import { useOverlay } from '../../contexts';
import { useUserGetLatestQuotationOfBookingQuery } from '../../graphql/queries/userGetLatestQuotationOfBooking.generated';
import { useRefreshByUser } from '../../hooks';
import { Table } from '../../components/table';
import { OPERATING_UNIT, thousandSeparator } from '../../utils';
import { useUserAcceptQuotationMutation } from '../../graphql/mutations/userAcceptQuotation.generated';
import { showFlashMessageError } from '../../helpers';
import { MyBookingsDocument } from '../../graphql/queries/myBookings.generated';
import { client } from '../../apollo/apollo';
import { BookingDocument } from '../../graphql/queries/booking.generated';

export const RowItem = React.memo(
  ({
    label,
    value,
    containerStyle,
    unit,
  }: {
    label?: string;
    value?: string | number | null;
    unit?: string;
    containerStyle?: StyleProp<ViewStyle>;
  }) => {
    const renderValue = value === undefined || value === null ? '' : value;
    return (
      <View style={[tw`flex-row items-center border border-grayscale-border bg-[#f9f9f9]`, containerStyle]}>
        <View style={tw`flex-1 px-16px py-10px `}>
          <Text style={tw`text-12px text-grayscale-black`}>{label}</Text>
        </View>
        <View style={tw`flex-1 px-16px py-10px bg-white`}>
          <Text style={tw`text-12px text-grayscale-black`}>{renderValue}</Text>
          {!!unit && <Text style={tw`text-12px text-grayscale-gray`}>{renderValue}</Text>}
        </View>
      </View>
    );
  },
);

export const MyRepairRequestsPushQuotation = () => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'my-repair-request/push-quotation'>>();
  const {
    params: { bookingId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-request/push-quotation'>['route']>();
  const { showDialog } = useOverlay();

  const [acceptQuotation, { loading: loadingAccept }] = useUserAcceptQuotationMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      client.refetchQueries({
        include: [BookingDocument, MyBookingsDocument],
      });
      navigation.goBack();
    },
  });

  const { data, loading, refetch } = useUserGetLatestQuotationOfBookingQuery({
    variables: { bookingId },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const {
    createdAt,
    operatingNumber,
    operatingUnit,
    diagnostics,
    diagnosisNote,
    estimatedCompleteAt,
    accessories,
    transportFee,
    diagnosisFee,
    repairFee,
    additionalFees,
    total,
    id,
  } = data?.userGetLatestQuotationOfBooking || {};

  const centerView = useMemo(
    () => (
      <View style={tw`flex-1`}>
        <Text style={tw`text-17px font-semibold`}>Bảng báo giá sửa chữa</Text>
        <Text style={tw`text-12px text-grayscale-gray`}>Cập nhật: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
      </View>
    ),
    [createdAt],
  );
  const rightView = useMemo(
    () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('my-repair-requests/quotation-history', {
            bookingId,
          });
        }}
      >
        <Clock fill={'black'} />
      </TouchableOpacity>
    ),
    [bookingId, navigation],
  );

  const onReQuote = useCallback(() => {
    navigation.navigate('my-repair-requests/requote-reason', { quotationId: id || '' });
  }, [id, navigation]);

  const onSubmit = useCallback(async () => {
    const res = await showDialog({
      title: 'Đồng ý với yêu cầu báo giá này?',
      message: 'Đồng ý báo giá thì sẽ không thể hủy yêu cầu sửa chữa',
      confirmText: 'Đồng ý',
      type: 'CONFIRM',
    });
    if (res) {
      acceptQuotation({
        variables: {
          quotationId: id || '',
        },
      });
    }
  }, [acceptQuotation, id, showDialog]);

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
          <View style={tw`p-4`}>
            <Text style={tw`text-14px font-bold mb-4`}>{'I. ChẨn đoán'.toLocaleUpperCase()}</Text>
            <Table
              data={[
                { 'Đã vận hành': `${operatingNumber} ${OPERATING_UNIT?.[operatingUnit || '']}` },
                diagnostics?.map?.((item) => ({ [item?.diagnosticCode]: `${thousandSeparator(item?.expense)} đ` })),
                { 'Ghi chú': diagnosisNote },
                { 'Dự kiến thời gian hoàn thành': dayjs(estimatedCompleteAt).format('DD/MM/YYYY') },
              ].flat()}
            />
          </View>
          <View style={tw`w-full h-6px bg-grayscale-border`} />
          <View style={tw`p-4`}>
            <Text style={tw`text-14px font-bold`}>{'II. Báo giá sửa chữa'.toLocaleUpperCase()}</Text>
            <Text style={tw`text-14px font-bold my-3`}>{'1. Vật tư phụ tùng'}</Text>
            <Table
              right
              data={accessories?.map?.((item: any) => ({
                [item?.name]: `${thousandSeparator(item?.unitPrice)} đ`,
                moreInfo: `x${item?.quantity} ${item?.unit}`,
              }))}
            />
          </View>
          <View style={tw`p-4`}>
            <Text style={tw`text-14px font-bold my-3`}>{'2. Chi phí công dịch vụ'}</Text>
            <Table
              right
              data={[
                { 'Phí di chuyển': `${thousandSeparator(transportFee || 0)} đ` },
                { 'Phí chẩn đoán': `${thousandSeparator(diagnosisFee || 0)} đ` },
                { 'Phí sửa chữa, thay thế': `${thousandSeparator(repairFee || 0)} đ` },
              ]}
            />
          </View>
          {!!additionalFees?.length && (
            <View style={tw`p-4`}>
              <Text style={tw`text-14px font-bold my-3`}>{'3. Chi phí phát sinh'}</Text>
              <Table
                right
                data={additionalFees?.map?.((item) => ({
                  [item?.name]: `${thousandSeparator(item?.amount)} đ`,
                }))}
              />
            </View>
          )}
        </ScrollView>
        <View style={tw`p-4 border-t border-grayscale-border`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-13px`}>Tổng chi phí</Text>
            <Text style={tw`text-17px font-bold`}>{thousandSeparator(total || 0)} đ</Text>
          </View>
          <View style={tw`mt-3 flex-row items-center justify-between w-full gap-5`}>
            <Button
              disabled={loadingAccept}
              type="outline"
              title={'Yêu cầu báo giá lại'}
              onPress={onReQuote}
              buttonStyle={tw`border-grayscale-black`}
              containerStyle={tw`flex-1 `}
            />
            <Button title={'Đồng ý'} onPress={onSubmit} containerStyle={tw`flex-1`} loading={loadingAccept} />
          </View>
        </View>
      </>
    );
  }, [
    accessories,
    additionalFees,
    diagnosisFee,
    diagnosisNote,
    diagnostics,
    estimatedCompleteAt,
    isRefetchingByUser,
    loading,
    loadingAccept,
    onReQuote,
    onSubmit,
    operatingNumber,
    operatingUnit,
    refetchByUser,
    repairFee,
    total,
    transportFee,
  ]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader centerView={centerView} leftIcon={<CloseSvg width={24} height={24} />} rightView={rightView} />
      {renderContent}
    </SafeAreaView>
  );
};
