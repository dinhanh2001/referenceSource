import { Button } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { OrderStatusEnum } from '../../../graphql/type.interface';
import { EmptyOrder } from '../../../svg';
import { tw } from '../../tw';
import { ECommerceMyOrderNavigationProp } from '../../../screens/e-commerce/my-order/type';

type Props = {
  statuses: OrderStatusEnum[];
};

export const ECommerceMyOrderEmptyList = ({ statuses }: Props) => {
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();

  const text = useMemo(() => {
    if (statuses?.includes(OrderStatusEnum.WAIT_FOR_CONFIRM)) {
      return 'đang chờ xác nhận';
    } else if (statuses?.includes(OrderStatusEnum.SHIPPING) || statuses?.includes(OrderStatusEnum.DELIVERED)) {
      return 'đang giao';
    } else if (statuses?.includes(OrderStatusEnum.COMPLETE)) {
      return 'đã hoàn thành';
    } else if (statuses?.includes(OrderStatusEnum.CANCEL)) {
      return 'đã hủy';
    } else {
      return '';
    }
  }, [statuses]);

  return (
    <View style={tw`items-center mt-4`}>
      <EmptyOrder />
      <Text style={tw`mt-2 text-grayscale-gray`}>{`Chưa có Đơn hàng nào ${text}`}</Text>
      <Button
        title={'Mua sắm ngay'}
        containerStyle={tw`mt-4`}
        buttonStyle={tw`px-10`}
        onPress={() => navigation.navigate('e-commerce/home')}
      />
    </View>
  );
};
