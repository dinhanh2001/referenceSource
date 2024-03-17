import { View, Text, LayoutAnimation, ScrollView, FlatList } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppRoutes } from '../../navigator-params';
import { RevenueFilterData, RevenueNavigationProp } from '../../screens/revenue/type';
import { tw } from '../tw';
import { MoneySVG } from '../../svg';
import { thousandSeparator } from '../../helpers';
import { ReportHistoryResDto } from '../../graphql/type.interface';

import { ChipFilterRevenue } from './chip-filter';
import { ChartRevenue } from './chart-revenue';

type Props<T> = {
  currentFilter: RevenueFilterData;
  setCurrentFilter: (filter: RevenueFilterData) => void;
  total: number;
  refreshControl: React.ReactElement;
  dailyReport: ReportHistoryResDto[];
  list: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
};

export function ContentRevenue<T>({
  currentFilter,
  setCurrentFilter,
  total,
  refreshControl,
  dailyReport,
  list,
  renderItem,
}: Props<T>) {
  const navigation = useNavigation<RevenueNavigationProp>();

  const { bottom } = useSafeAreaInsets();

  const [isChart, setIsChart] = useState(false);

  const onToggleChart = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsChart((prev) => !prev);
  }, []);

  const onFilter = useCallback(() => {
    navigation.navigate(AppRoutes.REVENUE_FILTER_SCREEN, { currentFilter, onChange: setCurrentFilter });
  }, [navigation, currentFilter, setCurrentFilter]);

  const renderHeader = useMemo(() => {
    return (
      <View>
        <View style={tw`flex-row gap-2`}>
          <ChipFilterRevenue title={isChart ? 'Biểu đồ' : 'Bảng'} onPress={onToggleChart} />
          <ChipFilterRevenue value={currentFilter} hasArrow onPress={onFilter} />
        </View>

        <View style={tw`flex-row border border-[#EEE] px-5 py-11px mt-8 rounded-1 gap-4 items-center`}>
          <MoneySVG />
          <Text style={tw`text-19px font-bold`}>{`${thousandSeparator(total || 0)} đ`}</Text>
        </View>
      </View>
    );
  }, [currentFilter, isChart, onFilter, onToggleChart, total]);

  if (isChart) {
    return (
      <ScrollView contentContainerStyle={tw`m-4`} scrollIndicatorInsets={{ right: 1 }} refreshControl={refreshControl}>
        {renderHeader}

        <ChartRevenue dailyOrderReport={dailyReport} />
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      initialNumToRender={15}
      refreshControl={refreshControl}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={tw`p-4 pb-${bottom + 20}px`}
    />
  );
}
