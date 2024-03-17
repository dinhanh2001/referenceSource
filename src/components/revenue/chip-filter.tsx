import React, { useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { ArrowDownSVG } from '../../svg';
import { tw } from '../tw';
import { RevenueFilterData } from '../../screens/revenue/type';
import { PeriodTypeEnum } from '../../graphql/type.interface';

type Props = {
  title?: string;
  value?: RevenueFilterData;
  hasArrow?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ChipFilterRevenue = ({ value, title, hasArrow, onPress, containerStyle }: Props) => {
  const label = useMemo(() => {
    const { periodType, endDate, startDate } = value || {};
    if (title) return title;

    switch (periodType) {
      case PeriodTypeEnum.WEEKLY:
        return 'Tuần này';
      case PeriodTypeEnum.MONTHLY:
        return 'Tháng này';
      case PeriodTypeEnum.RANGE:
        return `${startDate} - ${endDate}`;
      case PeriodTypeEnum.YEARLY:
        return 'Năm nay';
      default:
        return '';
    }
  }, [title, value]);

  return (
    <TouchableOpacity
      style={[tw`flex-row py-6px px-3 items-center border self-start rounded-full bg-grayscale-bg`, containerStyle]}
      onPress={onPress}
    >
      <Text style={tw`text-13px font-semibold`}>{label}</Text>
      {hasArrow && <ArrowDownSVG style={tw`ml-2`} />}
    </TouchableOpacity>
  );
};
