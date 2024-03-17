import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { OrderEntity, OrderProductEntity, OrderStatusEnum } from '../../../graphql/type.interface';
import { ECommerceMyOrderNavigationProp } from '../../../screens/e-commerce/my-order/type';
import { ArrowRight, ReceiptIcon } from '../../../svg';
import { thousandSeparator } from '../../../utils';
import { Space } from '../../spacer';
import { tw } from '../../tw';

import { ECommerceButtonOrder } from './button-order';
import { ECommerceProductOrder } from './product-order';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (id: string) => void;
  item?: OrderEntity;
};

export const ECommerceMyOrderItem = ({ containerStyle, onPress, item }: Props) => {
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();
  const { id, product, partner, code, total, partnerId, status, statusDetail } = item || {};

  const quatity = useMemo(() => product?.reduce?.((acc, cur) => acc + cur?.quantity, 0), [product]);

  const { textStatus, bg, textTime } = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return {
          textStatus: 'Đơn hàng đang chờ xác nhận',
          bg: 'primary-lighter',
          textTime: 'Thời gian đặt',
        };

      case OrderStatusEnum.SHIPPING:
        return {
          textStatus: 'Đơn hàng đang giao đến bạn',
          bg: 'white',
          textTime: 'Thời gian đặt',
        };

      case OrderStatusEnum.DELIVERED:
        return {
          textStatus: 'Đơn hàng đã giao đến bạn',
          bg: '[#E5F7ED]',
          textTime: 'Thời gian đã giao',
        };

      case OrderStatusEnum.COMPLETE:
        return {
          textStatus: 'Đơn hàng đã hoàn thành',
          bg: '[#E5F7ED]',
          textTime: 'Thời gian giao đến',
        };

      case OrderStatusEnum.CANCEL:
        return {
          textStatus: 'Đơn hàng đã bị hủy',
          bg: 'grayscale-bg',
          textTime: 'Thời gian hủy',
        };

      default:
        return {
          textStatus: '',
          bg: 'white',
        };
    }
  }, [status]);

  const handlePress = useCallback(() => onPress?.(id as string), [onPress, id]);

  const onDetailStore = useCallback(
    () => navigation.push('e-commerce/store-detail', { storeId: partnerId as string }),
    [navigation, partnerId],
  );

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={onDetailStore}>
        <Image
          source={{
            uri: partner?.avatar?.fullThumbUrl as string,
          }}
          style={tw`w-6 h-6 rounded-1`}
        />
        <Text style={tw`font-semibold`}>{partner?.fullname}</Text>
        <ArrowRight width={12} height={12} />
      </TouchableOpacity>
      <Text style={tw`mt-3 text-3 text-grayscale-gray`}>Mã đơn hàng: {code}</Text>
      {product?.map((e: OrderProductEntity) => (
        <ECommerceProductOrder key={e?.id} containerStyle={tw`mt-4`} product={e} />
      ))}
      <Space size={1} backgroundColor={'#EEE'} style={tw`mt-3`} />
      <View style={tw`flex-row mt-3 items-center justify-between`}>
        <Text style={tw`text-13px text-grayscale-gray`}>{quatity} sản phẩm</Text>
        <Text style={tw`text-systemblue font-semibold`}>{`${thousandSeparator(total as number)} đ`}</Text>
      </View>

      <View style={tw`flex-row items-center bg-${bg} px-3 py-2 mt-3 rounded-3px`}>
        <ReceiptIcon fill={'#202C38'} width={16} height={16} />
        <View style={tw`flex-1 ml-2 mr-4`}>
          <Text style={tw`text-12px text-grayscale-black`}>{textStatus}</Text>
        </View>
        <ArrowRight />
      </View>

      <View style={tw`flex-row justify-between mt-4 items-center`}>
        <View>
          <Text style={tw`text-11px text-grayscale-gray`}>{textTime}</Text>
          <Text style={tw`text-3 text-grayscale-black mt-1`}>
            {dayjs(statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
        <ECommerceButtonOrder item={item} />
      </View>
    </TouchableOpacity>
  );
};
