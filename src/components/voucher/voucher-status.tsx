import { View, Text } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

import { tw } from '../tw';
import { DiscountCodeEntity } from '../../graphql/type.interface';

type Props = {
  discountStatus: boolean;
  item: DiscountCodeEntity;
};

export const VoucherStatus = ({ discountStatus, item }: Props) => {
  const { isActive, startDate } = item || {};

  if (!discountStatus) {
    return (
      <View style={tw`bg-grayscale-disabled rounded-full px-8px py-2px`}>
        <Text style={tw`text-white text-11px`}>Đã kết thúc</Text>
      </View>
    );
  }

  if (!isActive) {
    return (
      <View style={tw`bg-blue rounded-full px-8px py-2px`}>
        <Text style={tw`text-white text-11px`}>Không hoạt động</Text>
      </View>
    );
  }

  if (dayjs().isBefore(dayjs(startDate), 'day')) {
    return (
      <View style={tw`bg-blue rounded-full px-8px py-2px`}>
        <Text style={tw`text-white text-11px`}>Sắp diễn ra</Text>
      </View>
    );
  }

  return (
    <View style={tw`bg-status-success rounded-full px-8px py-2px`}>
      <Text style={tw`text-white text-11px`}>Đang diễn ra</Text>
    </View>
  );
};
