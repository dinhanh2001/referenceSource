import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import * as Clipboard from 'expo-clipboard';
import { showMessage } from 'react-native-flash-message';

import { OrderEntity, OrderStatusEnum } from '../../../graphql/type.interface';
import { tw } from '../../tw';
import { useAuth } from '../../../contexts';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  order: OrderEntity;
};

export const ECommerceMyOrderInfo = ({ containerStyle, order }: Props) => {
  const { user } = useAuth();
  const { code, createdAt, status, statusDetail, partner } = order || {};
  const isCancel = status === OrderStatusEnum.CANCEL;

  const onCopy = async () => {
    await Clipboard.setStringAsync(code);
    showMessage({
      type: 'default',
      message: 'Đã sao chép mã đơn hàng',
    });
  };

  return (
    <View style={containerStyle}>
      <Text style={tw`font-semibold`}>{isCancel ? 'Thông tin đơn hủy' : 'Thông tin đơn hàng'}</Text>
      <View style={tw`flex-row justify-between items-center bg-grayscale-bg mt-12px p-12px`}>
        <Text style={tw`text-13px text-grayscale-gray`}>Mã đơn hàng</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-13px mr-8px`}>{code}</Text>
          <Text style={tw`text-13px text-primary-dark underline`} onPress={onCopy}>
            Sao chép
          </Text>
        </View>
      </View>

      <RowInfo title="Thời gian đặt" value={dayjs(createdAt).format('DD/MM/YYYY HH:mm')} />

      {isCancel && (
        <>
          <RowInfo
            title="Thời gian hủy"
            value={dayjs(statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')}
            containerStyle={tw`bg-grayscale-bg`}
          />

          <RowInfo
            title="Người hủy"
            value={statusDetail?.partnerId ? (partner?.fullname as string) : (user?.fullname as string)}
          />

          <RowInfo
            title="Lý do hủy"
            value={statusDetail?.reasons?.map?.((e) => e?.name)?.join?.() as string}
            moreValue={statusDetail?.note as string}
            containerStyle={tw`bg-grayscale-bg`}
          />
        </>
      )}
    </View>
  );
};

type RowInfoProps = {
  title: string;
  value: string;
  moreValue?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const RowInfo = ({ title, value, moreValue, containerStyle }: RowInfoProps) => {
  return (
    <View style={[tw`flex-row p-3`, containerStyle]}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-13px text-grayscale-gray leading-5`}>{title}</Text>
      </View>
      <View style={tw`flex-2 ml-8px items-end`}>
        <Text style={tw`text-13px text-right`}>{value}</Text>
        {!!moreValue && <Text style={tw`text-13px text-right`}>{moreValue}</Text>}
      </View>
    </View>
  );
};
