import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { OrderEntity, OrderProductEntity, OrderStatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';
import { tw } from '../../tw';
import { useUserUpdateOrderStatusMutation } from '../../../graphql/mutations/userUpdateOrderStatus.generated';
import { client } from '../../../apollo/apollo';
import { MyOrdersDocument } from '../../../graphql/queries/myOrders.generated';
import { CountOrderItemForEachStatusDocument } from '../../../graphql/queries/countOrderItemForEachStatus.generated';
import { useAddCartItemsMutation } from '../../../graphql/mutations/addCartItems.generated';
import { showFlashMessageError } from '../../../helpers';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item?: OrderEntity;
};

export const ECommerceButtonOrder = ({ containerStyle, item }: Props) => {
  const { id, status, product, userCanReview } = item || {};
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const [updateStatus, { loading: loadingUpdateStatus }] = useUserUpdateOrderStatusMutation({
    onError: showFlashMessageError,
  });

  const [addCart, { loading: loadingAddCart }] = useAddCartItemsMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      navigation.navigate('e-commerce/cart');
    },
  });

  const onRate = useCallback(() => {
    navigation.navigate('e-commerce/my-order-review', { orderId: id as string });
  }, [id, navigation]);

  const onCancel = useCallback(() => {
    navigation.navigate('e-commerce/my-order-cancel', { orderId: id as string });
  }, [id, navigation]);

  const onComplete = useCallback(() => {
    updateStatus({
      variables: {
        input: {
          orderId: id as string,
          status: OrderStatusEnum.COMPLETE,
        },
      },
      onCompleted: () => {
        client.refetchQueries({
          include: [MyOrdersDocument, CountOrderItemForEachStatusDocument],
        });
      },
    });
  }, [id, updateStatus]);

  const onReBuy = useCallback(() => {
    addCart({
      variables: {
        input: {
          cartItems:
            product?.map?.((it: OrderProductEntity) => ({
              productId: it?.productId,
              quantity: it?.quantity,
            })) || [],
        },
      },
    });
  }, [addCart, product]);

  const { title, onPress, disabled } = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return {
          title: 'Hủy đơn hàng',
          onPress: onCancel,
        };

      case OrderStatusEnum.SHIPPING:
      case OrderStatusEnum.DELIVERED:
        return {
          title: 'Đã nhận hàng',
          onPress: onComplete,
        };

      case OrderStatusEnum.COMPLETE:
        return {
          title: userCanReview ? 'Đánh giá' : 'Đã đánh giá',
          onPress: onRate,
          disabled: !userCanReview,
        };

      case OrderStatusEnum.CANCEL:
        return {
          title: 'Mua lại',
          onPress: onReBuy,
        };
      default:
        return {
          title: '',
        };
    }
  }, [onCancel, onComplete, onRate, onReBuy, status, userCanReview]);

  return (
    <Button
      title={title}
      buttonStyle={tw`px-5`}
      loading={loadingUpdateStatus || loadingAddCart}
      containerStyle={containerStyle}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
