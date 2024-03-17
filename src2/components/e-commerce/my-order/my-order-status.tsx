import React, { useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { OrderStatusEnum } from '../../../graphql/type.interface';
import { ReceiptIcon } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  type: OrderStatusEnum;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ECommerceMyOrderStatus = ({ type, containerStyle }: Props) => {
  const { text, color, bg } = useMemo(() => {
    switch (type) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return {
          color: 'white',
          text: 'Đơn hàng đang chờ xác nhận từ người bán',
          bg: 'blue',
        };

      case OrderStatusEnum.SHIPPING:
        return {
          text: 'Đơn hàng đang giao đến bạn',
          color: 'grayscale-black',
          bg: 'primary',
        };

      case OrderStatusEnum.COMPLETE:
        return {
          text: 'Đơn hàng đã giao đến bạn',
          color: 'white',
          bg: 'status-success',
        };

      case OrderStatusEnum.CANCEL:
        return {
          text: 'Đơn hàng đã bị hủy',
          color: 'white',
          bg: 'grayscale-disabled',
        };

      default:
        return {
          text: '',
          color: '',
          bg: '',
        };
    }
  }, [type]);

  return (
    <View style={[tw`bg-${bg} px-4 py-2.5 flex-row items-center`, containerStyle]}>
      <ReceiptIcon fill={tw.color(color)} width={20} height={20} />
      <Text style={tw`text-${color} ml-2 text-13px`}>{text}</Text>
    </View>
  );
};
