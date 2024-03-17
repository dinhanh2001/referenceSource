import React, { useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { OrderStatusEnum } from '../../graphql/type.interface';
import { ArrowRightSVG, ReceiptCustomSVG } from '../../svg';
import { tw } from '../tw';

type Props = {
  status: OrderStatusEnum;
  containerStyle?: StyleProp<ViewStyle>;
  isList?: boolean;
};

export const MyOrderBannerStatus = ({ status, containerStyle, isList }: Props) => {
  const { bg, bgList, text, textColor } = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return {
          bg: 'blue',
          bgList: '',
          textColor: 'white',
          text: 'Đơn hàng đang chờ xác nhận',
        };
      case OrderStatusEnum.SHIPPING:
        return {
          bg: 'primary',
          bgList: 'primary-light',
          textColor: 'grayscale-black',
          text: 'Đơn hàng đang được giao',
        };
      case OrderStatusEnum.DELIVERED:
        return {
          bg: 'status-success',
          bgList: '[#E5F7ED]',
          textColor: 'white',
          text: 'Đơn hàng đã được giao',
        };
      case OrderStatusEnum.COMPLETE:
        return {
          bg: 'status-success',
          bgList: '[#E5F7ED]',
          textColor: 'white',
          text: 'Đơn hàng đã hoàn thành',
        };
      case OrderStatusEnum.CANCEL:
        return {
          bg: 'grayscale-disabled',
          bgList: '[#F9F9F9]',
          textColor: 'white',
          text: 'Đơn hàng đã bị hủy',
        };
      default:
        return {
          bg: '',
          bgList: '',
          textColor: '',
          text: '',
        };
    }
  }, [status]);

  const color = useMemo(() => (isList ? 'grayscale-black' : textColor), [isList, textColor]);

  return (
    <View style={[tw`flex-row bg-${isList ? bgList : bg} py-8px px-16px items-center`, containerStyle]}>
      <ReceiptCustomSVG fill={tw.color(color)} />
      <View style={tw`flex-1`}>
        <Text style={tw`text-${color} ml-8px text-13px`}>{text}</Text>
      </View>
      {isList && <ArrowRightSVG />}
    </View>
  );
};
