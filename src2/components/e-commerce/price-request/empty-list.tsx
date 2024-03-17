import { Button } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { EmptyOrder } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  type: ProductQuotationStatusEnum;
  onPress?: () => void;
};

export const ECommercePriceRequestEmptyList = ({ type, onPress }: Props) => {
  const text = useMemo(() => {
    switch (type) {
      case ProductQuotationStatusEnum.SENT:
        return 'Chưa có Yêu cầu báo giá nào';
      case ProductQuotationStatusEnum.RESPONDED:
        return 'Chưa có Yêu cầu báo giá đang chờ\nphản hồi';
    }
  }, [type]);

  return (
    <View style={tw`items-center`}>
      <EmptyOrder />
      <Text style={tw`mt-2 text-grayscale-gray text-center`}>{text}</Text>
      <Button title={'Dạo mua sắm'} containerStyle={tw`mt-4`} onPress={onPress} />
    </View>
  );
};
