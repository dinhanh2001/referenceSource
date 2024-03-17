import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, ScrollableTab, tw } from '../../components';
import { Table } from '../../components/table';
import { useUserBookingQuotationsQuery } from '../../graphql/queries/userBookingQuotations.generated';
import { QuotationAccessoryEntity, QuotationEntity, QuotationStatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../navigator-params';
import { ReceiptEdit, TickCircle } from '../../svg';
import { OPERATING_UNIT, thousandSeparator } from '../../utils';

export const MyRepairRequestsQuotationHistory = () => {
  const {
    params: { bookingId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-requests/quotation-history'>['route']>();
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'my-repair-requests/quotation-history'>>();

  const { data, loading, refetch } = useUserBookingQuotationsQuery({ variables: { bookingId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const { userBookingQuotations } = data || {};

  const [currentTab, setCurrentTab] = useState<QuotationEntity | undefined>(undefined);

  useEffect(() => {
    if (!loading && data?.userBookingQuotations?.length) {
      setCurrentTab(data?.userBookingQuotations[0] as QuotationEntity);
    }
  }, [data?.userBookingQuotations, loading]);

  const onChangeTab = useCallback(
    (tab: QuotationEntity) => {
      setCurrentTab(tab);
    },
    [setCurrentTab],
  );

  const statusView = useMemo(() => {
    if (currentTab?.status === QuotationStatusEnum.REJECTED) {
      return (
        <View style={tw`bg-primary px-4 py-3 flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-14px font-bold`}>Đã từ chối</Text>
            <Text style={tw`text-13px`}>
              Bạn đã yêu cầu báo giá lại.{' '}
              <Text
                style={styles.text}
                onPress={() => {
                  navigation.navigate('my-repair-requests/requote-detail', { bookingId });
                }}
              >
                Xem chi tiết
              </Text>
            </Text>
          </View>
          <ReceiptEdit />
        </View>
      );
    }
    if (currentTab?.status === QuotationStatusEnum.ACCEPTED) {
      return (
        <View style={tw`bg-status-success flex-row items-center px-4 py-3`}>
          <TickCircle fill={tw.color('white')} />
          <Text style={tw`text-14px text-white ml-3`}>Đã chấp thuận báo giá này</Text>
        </View>
      );
    }
  }, [bookingId, currentTab?.status, navigation]);

  const renderContent = useMemo(() => {
    const {
      operatingNumber,
      operatingUnit,
      diagnostics,
      diagnosisNote,
      estimatedCompleteAt,
      accessories,
      repairFee,
      transportFee,
      diagnosisFee,
      additionalFees,
      total,
    } = currentTab || {};

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <ScrollableTab<QuotationEntity>
          keyId={'id'}
          formatLabel={(item: QuotationEntity) => dayjs(item?.createdAt).format('DD/MM/YYYY HH:mm')}
          tabData={userBookingQuotations as QuotationEntity[]}
          onChangeTab={onChangeTab}
        />
        {statusView}
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
              data={accessories?.map?.((item: QuotationAccessoryEntity) => ({
                [item?.name]: `${thousandSeparator(item?.unitPrice)} đ`,
                moreInfo: `x${item?.quantity} ${item?.unit}`,
              }))}
            />

            <Text style={tw`text-14px font-bold my-3`}>{'2. Chi phí công dịch vụ'}</Text>
            <Table
              right
              data={[
                { 'Phí di chuyển': `${thousandSeparator(transportFee || 0)} đ` },
                { 'Phí chẩn đoán': `${thousandSeparator(diagnosisFee || 0)} đ` },
                { 'Phí sửa chữa, thay thế': `${thousandSeparator(repairFee || 0)} đ` },
              ]}
            />

            {!!additionalFees?.length && (
              <>
                <Text style={tw`text-14px font-bold my-3`}>{'3. Chi phí phát sinh'}</Text>
                <Table
                  right
                  data={additionalFees?.map?.((item) => ({
                    [item?.name]: `${thousandSeparator(item?.amount)} đ`,
                  }))}
                />
              </>
            )}
          </View>
        </ScrollView>
        <View style={tw`p-4 border-t border-grayscale-border`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-13px`}>Tổng chi phí</Text>
            <Text style={tw`text-17px font-bold`}>{thousandSeparator(total || 0)}</Text>
          </View>
        </View>
      </>
    );
  }, [currentTab, isRefetchingByUser, loading, onChangeTab, refetchByUser, statusView, userBookingQuotations]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Lịch sử báo giá sửa chữa" />

      {renderContent}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
});
