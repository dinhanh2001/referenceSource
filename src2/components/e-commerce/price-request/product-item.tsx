import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { Protection } from '../../../svg';
import { Space } from '../../spacer';
import { tw } from '../../tw';
import { ECommerceStatusProduct } from '../product';
import { ProductQuotationEntity } from '../../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: ProductQuotationEntity;
};

export const ECommercePriceRequestProductItem = ({ containerStyle, item }: Props) => {
  const { product, quantity } = item || {};

  return (
    <View style={[tw`flex-row`, containerStyle]}>
      <Image source={{ uri: product?.avatar?.fullThumbUrl as string }} style={tw`h-20 w-20 rounded-1`} />
      <View style={tw`absolute`}>
        <ECommerceStatusProduct isNew={product?.isNew} />
      </View>
      <View style={tw`flex-1 ml-3 gap-2`}>
        <Text style={tw`text-13px text-grayscale-black`} numberOfLines={2}>
          {product?.name}
        </Text>
        <Text style={tw`font-semibold`}>Thương lượng</Text>
        <View style={tw`flex-row items-center`}>
          <Protection />
          <Text style={tw`text-[11px]/[14px] text-grayscale-gray`}> Call me kiểm định</Text>
        </View>
        <Text style={tw`text-grayscale-gray text-right text-3 mb-2`}> x{quantity}</Text>
        <Space size={1} backgroundColor={'#EEE'} />
      </View>
    </View>
  );
};
