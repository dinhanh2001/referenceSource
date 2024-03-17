import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { StyleProp, View, ViewStyle, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { OrderEntity, OrderStatusEnum } from '../../graphql/type.interface';
import { Space } from '../spacer';
import { tw } from '../tw';
import { usePartnerUpdateOrderStatusMutation } from '../../graphql/mutations/partnerUpdateOrderStatus.generated';
import { showFlashMessageError } from '../../helpers';
import { client } from '../../apollo/apollo';
import { PartnerOrdersDocument } from '../../graphql/queries/partnerOrders.generated';
import { PartnerCountOrderItemForEachStatusDocument } from '../../graphql/queries/partnerCountOrderItemForEachStatus.generated';
import { AppRoutes } from '../../navigator-params';
import { MyOrderDetailNavigationProp } from '../../screens/my-order/my-order-detail-screen/type';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  order: OrderEntity;
  refetch: () => void;
};

export const MyOrderButtonActions = ({ containerStyle, order, refetch }: Props) => {
  const navigation = useNavigation<MyOrderDetailNavigationProp>();
  const { id, status, user } = order || {};

  const onCompleted = useCallback(() => {
    refetch();
    client.refetchQueries({
      include: [PartnerOrdersDocument, PartnerCountOrderItemForEachStatusDocument],
    });
  }, [refetch]);

  const [updateStatus, { loading: loadingUpdate }] = usePartnerUpdateOrderStatusMutation({
    onError: showFlashMessageError,
    onCompleted,
  });

  const onContact = useCallback(() => {
    try {
      const url = `tel:${user?.phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  }, [user?.phone]);

  const onDelivered = useCallback(() => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: OrderStatusEnum.DELIVERED,
        },
      },
    });
  }, [id, updateStatus]);

  const onConfirm = useCallback(() => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: OrderStatusEnum.SHIPPING,
        },
      },
    });
  }, [id, updateStatus]);

  const onCancel = useCallback(() => {
    navigation.navigate(AppRoutes.MY_ORDER_CANCEL_REASON_SCREEN, { orderId: id });
  }, [navigation, id]);

  const renderButtonLeft = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return (
          <Button
            title={'Huỷ'}
            containerStyle={tw`flex-1`}
            type="outline"
            buttonStyle={tw`border-grayscale-disabled`}
            onPress={onCancel}
          />
        );

      // case OrderStatusEnum.SHIPPING:
      // case OrderStatusEnum.DELIVERED:
      // return (
      //   <Button
      //     title={'Liên hệ người mua'}
      //     containerStyle={tw`flex-1`}
      //     type="outline"
      //     buttonStyle={tw`border-grayscale-disabled`}
      //     onPress={onContact}
      //   />
      // );

      default:
        return null;
    }
  }, [status, onCancel]);

  const renderButtonRight = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return <Button title={'Xác nhận'} containerStyle={tw`flex-1`} onPress={onConfirm} loading={loadingUpdate} />;

      case OrderStatusEnum.SHIPPING:
      case OrderStatusEnum.DELIVERED:
        return (
          <Button
            title={'Đã giao hàng'}
            containerStyle={tw`flex-1`}
            disabled={status === OrderStatusEnum.DELIVERED}
            onPress={onDelivered}
            loading={loadingUpdate}
          />
        );

      case OrderStatusEnum.COMPLETE:
      case OrderStatusEnum.CANCEL:
        return <Button title={'Liên hệ người mua'} containerStyle={tw`flex-1`} onPress={onContact} />;

      default:
        return null;
    }
  }, [status, onDelivered, onContact, onConfirm, loadingUpdate]);

  return (
    <View style={[tw`flex-row pt-8px pb-4 px-4`, containerStyle]}>
      {renderButtonLeft}
      {!!renderButtonLeft && !!renderButtonRight && <Space size={16} horizontal />}
      {renderButtonRight}
    </View>
  );
};
