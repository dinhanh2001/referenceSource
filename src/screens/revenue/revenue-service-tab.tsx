import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';

import { ActivityIndicator, ContentRevenue, Table, tw } from '../../components';
import { useAuth } from '../../contexts';
import { usePartnerGetReportDetailBookingQuery } from '../../graphql/queries/partnerGetReportDetailBooking.generated';
import { PeriodTypeEnum, ReportHistoryResDto, SettlementEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';

import { RevenueFilterData } from './type';

export const RevenueServiceTab = () => {
  const { partner } = useAuth();

  const [currentFilter, setCurrentFilter] = useState<RevenueFilterData>({
    periodType: PeriodTypeEnum.WEEKLY,
  });

  const { data, loading, refetch } = usePartnerGetReportDetailBookingQuery({
    variables: {
      partnerId: partner?.id as string,
      periodType: currentFilter?.periodType as PeriodTypeEnum,
      startDate:
        currentFilter?.periodType === PeriodTypeEnum.RANGE
          ? dayjs(currentFilter?.startDate, 'DD/MMYYYY').format('YYYY-MM-DD')
          : undefined,
      endDate:
        currentFilter?.periodType === PeriodTypeEnum.RANGE
          ? dayjs(currentFilter?.endDate, 'DD/MMYYYY').format('YYYY-MM-DD')
          : undefined,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { settlementTotal, dailySettlementReport, settlementDetails } = data?.partnerGetReportDetailBooking || {};

  const renderItem = useCallback(({ item }: { item: SettlementEntity }) => {
    const { booking, createdAt, total, user } = item || {};
    return (
      <Table
        key={item?.id}
        containerStyle={tw`mt-4`}
        data={[
          { 'Mã yêu cầu': booking?.code, bg: '#EEE' },
          { 'Khách hàng': user?.fullname },
          { 'Trạng thái': 'Hoàn thành', textColorRight: '#1BB045' },
          { 'Thời gian': dayjs(createdAt).format('DD/MM/YYYY') },
          { 'Doanh thu': `${thousandSeparator(total || 0)} đ`, bold: true },
        ]}
      />
    );
  }, []);

  if (loading && !data?.partnerGetReportDetailBooking) {
    return <ActivityIndicator />;
  }

  return (
    <ContentRevenue<SettlementEntity>
      currentFilter={currentFilter}
      setCurrentFilter={setCurrentFilter}
      total={settlementTotal || 0}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      dailyReport={dailySettlementReport as ReportHistoryResDto[]}
      list={settlementDetails as SettlementEntity[]}
      renderItem={renderItem}
    />
  );
};
