import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';

import { ActivityIndicator, ContentRevenue, Table, tw } from '../../components';
import { useAuth } from '../../contexts';
import { usePartnerGetReportDetailOrderQuery } from '../../graphql/queries/partnerGetReportDetailOrder.generated';
import { OrderEntity, PeriodTypeEnum, ReportHistoryResDto } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';

import { RevenueFilterData } from './type';

export const RevenueStoreTab = () => {
  const { partner } = useAuth();

  const [currentFilter, setCurrentFilter] = useState<RevenueFilterData>({
    periodType: PeriodTypeEnum.WEEKLY,
  });

  const { data, loading, refetch } = usePartnerGetReportDetailOrderQuery({
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

  const { orderTotal, dailyOrderReport, orderDetails } = data?.partnerGetReportDetailOrder || {};

  const renderItem = useCallback(({ item }: { item: OrderEntity }) => {
    const { code, createdAt, total } = item || {};
    return (
      <Table
        key={item?.id}
        containerStyle={tw`mt-4`}
        data={[
          { 'Sản phẩm': code, bg: '#EEE' },
          { 'Trạng thái': 'Hoàn thành', textColorRight: '#1BB045' },
          { 'Thời gian': dayjs(createdAt).format('DD/MM/YYYY') },
          { 'Doanh thu': `${thousandSeparator(total || 0)} đ`, bold: true },
        ]}
      />
    );
  }, []);

  if (loading && !data?.partnerGetReportDetailOrder) {
    return <ActivityIndicator />;
  }

  return (
    <ContentRevenue<OrderEntity>
      currentFilter={currentFilter}
      setCurrentFilter={setCurrentFilter}
      total={orderTotal || 0}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      dailyReport={dailyOrderReport as ReportHistoryResDto[]}
      list={orderDetails as OrderEntity[]}
      renderItem={renderItem}
    />
  );
};
