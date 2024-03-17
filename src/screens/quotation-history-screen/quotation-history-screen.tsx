import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, ScrollableTab, Table, tw } from '../../components';
import { OPERATING_UNIT } from '../../constants';
import { usePartnerBookingQuotationsQuery } from '../../graphql/queries/partnerBookingQuotations.generated';
import { QuotationAccessoryEntity, QuotationEntity, QuotationStatusEnum } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { ReceiptEdit, TickCircle } from '../../svg';
import { AppRoutes } from '../../navigator-params';

import { QuotationHistoryScreenNavigationProps, QuotationHistoryScreenRouteProps } from './type';

export const QuotationHistoryScreen: React.FC = memo(() => {
  const {
    params: { bookingId },
  } = useRoute<QuotationHistoryScreenRouteProps>();
  const navigation = useNavigation<QuotationHistoryScreenNavigationProps>();

  const { data, loading, refetch } = usePartnerBookingQuotationsQuery({ variables: { bookingId } });
  const { partnerBookingQuotations } = data || {};

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [currentTab, setCurrentTab] = useState<QuotationEntity | undefined>(undefined);
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
    status,
  } = currentTab || {};

  useEffect(() => {
    if (!loading && data?.partnerBookingQuotations?.length) {
      setCurrentTab(data?.partnerBookingQuotations[0] as QuotationEntity);
    }
  }, [data?.partnerBookingQuotations, loading]);

  const onChangeTab = useCallback(
    (tab: QuotationEntity) => {
      setCurrentTab(tab);
    },
    [setCurrentTab],
  );

  const statusView = useMemo(() => {
    if (status === QuotationStatusEnum.REJECTED) {
      return (
        <View style={tw`bg-primary px-4 py-3 flex-row justify-between items-center`}>
          <View style={tw`flex-1 mr-16px`}>
            {/* <Text style={tw`text-14px font-bold`}>Đã từ chối</Text> */}
            <Text style={tw`text-13px`}>
              Khách hàng đã từ chối và yêu cầu báo giá lại.{' '}
              <Text
                style={tw`underline font-semibold`}
                onPress={() => {
                  navigation.replace(AppRoutes.REPAIR_REQUEST_QUOTATION_REJECT_DETAIL, { bookingId });
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
    if (status === QuotationStatusEnum.ACCEPTED) {
      return (
        <View style={tw`bg-status-success flex-row items-center px-4 py-3`}>
          <TickCircle fill={tw.color('white')} />
          <Text style={tw`text-14px text-white ml-3`}>Khách hàng đã chấp thuận báo giá này</Text>
        </View>
      );
    }
  }, [bookingId, navigation, status]);

  if (loading || !currentTab) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 bg-white`}>
      <ScrollableTab<QuotationEntity>
        keyId={'id'}
        formatLabel={(item: QuotationEntity) => dayjs(item?.createdAt).format('DD/MM/YYYY HH:mm')}
        tabData={partnerBookingQuotations as QuotationEntity[]}
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
    </SafeAreaView>
  );
});
