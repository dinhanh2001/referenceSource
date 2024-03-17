import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import dayjs from 'dayjs';

import { ChipFilterRevenue, RowRevenue, Space, tw } from '../../components';
import { AppRoutes } from '../../navigator-params';
import { ShopSVG, SupportSVG, WalletSVG } from '../../svg';
import { usePartnerGetReportSummaryQuery } from '../../graphql/queries/partnerGetReportSummary.generated';
import { useAuth } from '../../contexts';
import { PeriodTypeEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';

import { RevenueFilterData, RevenueNavigationProp } from './type';

export const RevenueAllTab = () => {
  const navigation = useNavigation<RevenueNavigationProp>();
  const { partner } = useAuth();

  const [currentFilter, setCurrentFilter] = useState<RevenueFilterData>({
    periodType: PeriodTypeEnum.WEEKLY,
  });

  const { data, loading, refetch } = usePartnerGetReportSummaryQuery({
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

  const { totalRevenue, totalRevenueOrder, totalRevenueSettlement } = data?.partnerGetReportSummary || {};

  const onFilter = useCallback(() => {
    navigation.navigate(AppRoutes.REVENUE_FILTER_SCREEN, { currentFilter, onChange: setCurrentFilter });
  }, [navigation, currentFilter]);

  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      <ChipFilterRevenue value={currentFilter} hasArrow containerStyle={tw`m-4`} onPress={onFilter} />

      <View style={tw`border m-4 px-5 rounded-1 border-[#EEE]`}>
        <RowRevenue icon={<WalletSVG />} title="Tổng doanh thu" value={totalRevenue || 0} loading={loading} />
        <Space size={1} backgroundColor={'#EEE'} />
        <RowRevenue
          icon={<ShopSVG />}
          title="Doanh thu từ gian hàng"
          value={totalRevenueOrder || 0}
          loading={loading}
        />
        <Space size={1} backgroundColor={'#EEE'} />
        <RowRevenue
          icon={<SupportSVG />}
          title="Doanh thu từ sửa chữa, bảo dưỡng"
          value={totalRevenueSettlement || 0}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};
