import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { ProductQuotationStatusEnum } from '../../graphql/type.interface';
import { ProductQuotationEmptySVG } from '../../svg';
import { tw } from '../tw';

type Props = {
  status: ProductQuotationStatusEnum;
};

export const ProductQuotationEmptyList = ({ status }: Props) => {
  const text = useMemo(() => {
    switch (status) {
      case ProductQuotationStatusEnum.SENT:
        return 'Chưa có Yêu cầu báo giá nào';
      case ProductQuotationStatusEnum.RESPONDED:
        return 'Chưa có Yêu cầu báo giá nào phản hồi';
      default:
        return '';
    }
  }, [status]);

  if (!text) return null;

  return (
    <View style={tw`items-center mx-5`}>
      <ProductQuotationEmptySVG />
      <Text style={tw`mt-2 text-grayscale-gray text-center`}>{text}</Text>
    </View>
  );
};
