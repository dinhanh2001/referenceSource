import { useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { usePartnerUpdateOrderStatusMutation } from '../../graphql/mutations/partnerUpdateOrderStatus.generated';
import { OrderEntity, OrderProductEntity, OrderStatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError, thousandSeparator } from '../../helpers';
import { AppRoutes } from '../../navigator-params';
import { MyOrderTabNavigationProps } from '../../screens/my-order/my-order-list-screen/type';
import { ArrowRightSVG } from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';
import { client } from '../../apollo/apollo';
import { PartnerOrdersDocument } from '../../graphql/queries/partnerOrders.generated';

import { MyOrderProductItem } from './product-item';
import { MyOrderBannerStatus } from './banner-status';

type Props = {
  item: OrderEntity;
  refechBadge?: () => void;
};

export const MyOrderItem = ({ item, refechBadge }: Props) => {
  const navigation = useNavigation<MyOrderTabNavigationProps>();

  const [updateStatus, { loading }] = usePartnerUpdateOrderStatusMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      refechBadge?.();
      client.refetchQueries({
        include: [PartnerOrdersDocument],
      });
    },
  });

  const { id: orderId, product, user, createdAt, total, status } = item || {};

  const quantity = useMemo(() => product?.reduce((acc, it) => acc + it?.quantity, 0), [product]);

  const isWaiting = status === OrderStatusEnum.WAIT_FOR_CONFIRM;

  const onDetail = useCallback(() => {
    navigation.navigate(AppRoutes.MY_ORDER_DETAIL_SCREEN, { orderId });
  }, [navigation, orderId]);

  const onCancel = useCallback(() => {
    navigation.navigate(AppRoutes.MY_ORDER_CANCEL_REASON_SCREEN, { orderId });
  }, [navigation, orderId]);

  const onConfirm = useCallback(() => {
    updateStatus({
      variables: {
        input: {
          orderId,
          status: OrderStatusEnum.SHIPPING,
        },
      },
    });
  }, [orderId, updateStatus]);

  return (
    <View style={tw`p-16px`}>
      <View style={tw`flex-row items-center mb-16px`}>
        <Image source={{ uri: user?.avatar?.fullThumbUrl as string }} style={tw`w-24px h-24px rounded-12`} />
        <Text style={tw`mx-8px`}>{user?.fullname}</Text>
        <ArrowRightSVG />
      </View>
      <Space backgroundColor={'#EEE'} size={1} />
      <TouchableOpacity onPress={onDetail}>
        {product?.map?.((it: OrderProductEntity) => (
          <MyOrderProductItem key={it?.id} product={it} />
        ))}
      </TouchableOpacity>
      <Space backgroundColor={'#EEE'} size={1} />
      <View style={tw`flex-row justify-between mt-12px`}>
        <Text style={tw`text-13px text-grayscale-gray`}>{`${quantity} sản phẩm`}</Text>
        <Text style={tw`font-semibold text-blue`}>{`${thousandSeparator(total)} đ`}</Text>
      </View>
      {!isWaiting && <MyOrderBannerStatus isList status={status} containerStyle={tw`mt-3`} />}
      <View style={tw`mt-16px flex-row`}>
        <View style={tw`flex-1 self-center`}>
          <Text style={tw`text-11px text-grayscale-gray`}>Thời gian đặt</Text>
          <Text style={tw`mt-4px text-12px text-grayscale-black`}>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        {isWaiting ? (
          <>
            <Button
              title={'Huỷ'}
              type="outline"
              containerStyle={tw`mx-12px`}
              buttonStyle={tw`px-20px border-grayscale-disabled`}
              onPress={onCancel}
            />
            <Button title={'Xác nhận'} onPress={onConfirm} loading={loading} />
          </>
        ) : (
          <Button title={'Xem chi tiết'} onPress={onDetail} />
        )}
      </View>
    </View>
  );
};
