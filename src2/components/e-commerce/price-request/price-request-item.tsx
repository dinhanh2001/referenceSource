import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ProductQuotationEntity } from '../../../graphql/type.interface';
import { ArrowRight } from '../../../svg';
import { Space } from '../../spacer';
import { tw } from '../../tw';

import { ECommercePriceRequestProductItem } from './product-item';
import { ECommercePriceRequestStatusItem } from './status-item';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (id: string) => void;
  item: ProductQuotationEntity;
};

export const ECommercePriceRequestItem = ({ containerStyle, onPress, item }: Props) => {
  const { id, product, status } = item || {};

  const handlePress = useCallback(() => {
    onPress?.(id);
  }, [onPress, id]);

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          style={tw`h-6 w-6 rounded-1`}
          source={{
            uri: product?.partner?.avatar?.fullThumbUrl as string,
          }}
        />
        <Text style={tw`text-grayscale-black font-semibold`}>{product?.partner?.fullname}</Text>
        <ArrowRight />
      </View>
      <Space size={1} backgroundColor={'#EEE'} style={tw`my-4`} />
      <ECommercePriceRequestProductItem item={item} />
      <ECommercePriceRequestStatusItem type={status} />
    </TouchableOpacity>
  );
};
