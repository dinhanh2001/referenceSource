import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { DiscountCodeEntity, DiscountCodeUnitEnum } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { DollarSVG, PercentSVG } from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';

import { ButtonEndVoucher } from './button-end-voucher';
import { VoucherStatus } from './voucher-status';

type Props = {
  item: DiscountCodeEntity;
  discountStatus: boolean;
  onPress: (id: string) => void;
};

export const VoucherItem = ({ item, discountStatus, onPress }: Props) => {
  const { unit, id, startDate, endDate, minOrderValue, limit, usedCount, name } = item || {};
  const isVND = unit === DiscountCodeUnitEnum.VND;

  const onDetail = useCallback(() => onPress?.(id), [id, onPress]);

  return (
    <TouchableOpacity
      style={discountStatus ? tw`bg-white py-20px px-16px` : tw`bg-grayscale-bg py-20px px-16px`}
      disabled={!discountStatus}
      onPress={onDetail}
    >
      <View style={tw`flex-row`}>
        <View style={tw`bg-primary w-64px h-64px justify-center items-center rounded-4px`}>
          {isVND ? <DollarSVG /> : <PercentSVG />}
        </View>
        <Space horizontal />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between `}>
            <Text style={tw`text-grayscale-black text-13px`}>
              {dayjs(startDate).format('DD/MM/YYYY')} {endDate ? `- ${dayjs(endDate).format('DD/MM/YYYY')}` : ''}
            </Text>
            <VoucherStatus discountStatus={discountStatus} item={item} />
          </View>
          <Text style={tw`text-grayscale-black text-14px font-semibold mt-1`}>{name}</Text>
          <Text style={tw`text-grayscale-gray text-12px mt-1`}>{`Đơn tối thiểu ${thousandSeparator(
            minOrderValue,
          )} đ`}</Text>
        </View>
      </View>
      <Space size={1} style={tw`bg-grayscale-border my-16px`} />
      <Text>
        Đã dùng{' '}
        <Text style={tw`text-black text-13px font-semibold`}>{`${usedCount || 0}${limit ? `/${limit}` : ''}`}</Text>
      </Text>
      <Space size={1} style={tw`bg-grayscale-border my-16px`} />
      {discountStatus && (
        <View style={tw`flex-row`}>
          <ButtonEndVoucher item={item} />
          <Space horizontal />
          <Button containerStyle={tw`flex-1`} onPress={onDetail}>
            Chi tiết
          </Button>
        </View>
      )}
    </TouchableOpacity>
  );
};
