import { Button, Image } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProductQuotationEntity, ProductQuotationStatusEnum } from '../../graphql/type.interface';
import { ArrowRightSVG } from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';
import { ProductQuotationTabNavigationProps } from '../../screens/product-quotation/list-product-quotations/type';
import { AppRoutes } from '../../navigator-params';

import { ProductQuotationProductItem } from './product-item';

type Props = {
  item: ProductQuotationEntity;
};

export const ProductQuotationItem = ({ item }: Props) => {
  const { id, createdAt, product, quantity, status, user } = item || {};
  const navigation = useNavigation<ProductQuotationTabNavigationProps>();

  const isSent = useMemo(() => status === ProductQuotationStatusEnum.SENT, [status]);

  const handlePress = useCallback(() => {
    navigation.navigate(AppRoutes.PRODUCT_QUOTATION_DETAIL_SCREEN, { id });
  }, [id, navigation]);

  return (
    <View>
      <View style={tw`m-4`}>
        <View style={tw`flex-row items-center mb-4`}>
          <Image source={{ uri: user?.avatar?.fullThumbUrl as string }} style={tw`w-9 h-9 rounded-full`} />
          <View style={tw`flex-1 mx-3`}>
            <Text style={tw`font-semibold`}>{user?.fullname}</Text>
            <Text style={tw`mt-2px text-3 text-grayscale-gray`}>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
          <ArrowRightSVG />
        </View>

        <Space size={1} backgroundColor={'#EEE'} />

        <ProductQuotationProductItem product={product} quantity={quantity} />

        <Button
          containerStyle={tw`self-end`}
          title={isSent ? 'Gửi báo giá' : 'Xem chi tiết'}
          buttonStyle={tw`px-8`}
          onPress={handlePress}
        />
      </View>
      <Space size={6} backgroundColor={'#EEE'} />
    </View>
  );
};
