import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { OrderStatusEnum } from '../../graphql/type.interface';
import { Empty5 } from '../../svg';
import { tw } from '../tw';

type Props = {
  statuses: OrderStatusEnum[];
};

export const MyOrderEmptyList = ({ statuses }: Props) => {
  const text = useMemo(() => {
    if (statuses?.includes(OrderStatusEnum.WAIT_FOR_CONFIRM)) {
      return 'Chưa có Đơn hàng nào đang chờ \nxác nhận';
    } else if (statuses?.includes(OrderStatusEnum.SHIPPING)) {
      return 'Chưa có Đơn hàng nào đang giao';
    } else if (statuses?.includes(OrderStatusEnum.COMPLETE) || statuses?.includes(OrderStatusEnum.DELIVERED)) {
      return 'Chưa có Đơn hàng nào đã giao';
    } else if (statuses?.includes(OrderStatusEnum.CANCEL)) {
      return 'Chưa có Đơn hàng nào đã hủy';
    } else {
      return '';
    }
  }, [statuses]);

  return (
    <View style={tw`items-center justify-center mt-16px`}>
      <Empty5 />
      <Text style={tw`mt-8px text-grayscale-gray text-center`}>{text}</Text>
    </View>
  );
};
