import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { ReportHistoryResDto } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  dailyOrderReport: ReportHistoryResDto[];
};

export const ChartRevenue = ({ dailyOrderReport }: Props) => {
  const { width } = useWindowDimensions();

  const data = useMemo(() => {
    const labels = dailyOrderReport?.map?.((e: ReportHistoryResDto) => dayjs(e?.date, 'YYYY-MM').format('MM/YY')) || [];
    const value = dailyOrderReport?.map?.((e: ReportHistoryResDto) => e?.revenue / 1000000) || [];

    return {
      labels,
      datasets: [
        {
          data: value,
          colors: dailyOrderReport?.map?.(() => () => '#F5B102') || [],
        },
      ],
    };
  }, [dailyOrderReport]);

  return (
    <View style={tw`mt-5`}>
      <Text style={tw`text-11px `}>
        <Text style={tw`text-grayscale-gray`}>Đơn vị tính:</Text> triệu đồng
      </Text>
      <View style={tw`mt-4`}>
        <BarChart
          flatColor={true}
          fromZero={true}
          yAxisLabel=""
          yAxisSuffix=""
          data={data}
          width={width - 16 * 2}
          height={200}
          withCustomBarColorFromData
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(96, 245, 2, ${opacity})`,
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
            labelColor: () => `#202C38`,
          }}
        />
      </View>
    </View>
  );
};
