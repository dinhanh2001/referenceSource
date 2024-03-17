import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { ArrowRight, ReceiptIcon } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  type: ProductQuotationStatusEnum;
};

export const ECommercePriceRequestStatusItem = ({ type }: Props) => {
  const { bg, text } = useMemo(() => {
    switch (type) {
      case ProductQuotationStatusEnum.SENT:
        return {
          text: 'Đang chờ phản hồi từ gian hàng',
          bg: 'primary-lighter',
        };
      case ProductQuotationStatusEnum.RESPONDED:
        return {
          text: 'Gian hàng đã gửi báo giá',
          bg: `[#E5F7ED]`,
        };
    }
  }, [type]);

  return (
    <View style={tw`bg-${bg} py-2 pl-3 pr-2 rounded-3px flex-row items-center mt-4`}>
      <ReceiptIcon fill={'#202C38'} width={16} height={16} />
      <View style={tw`flex-1 ml-2`}>
        <Text>{text}</Text>
      </View>
      <ArrowRight width={16} height={16} />
    </View>
  );
};
