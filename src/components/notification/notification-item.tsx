import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { NotificationEntity, NotificationTypeEnum } from '../../graphql/type.interface';
import { ReceiptCustomSVG, RepairSVG } from '../../svg';
import { tw } from '../tw';
import { Space } from '../spacer';

type Props = {
  item: NotificationEntity;
  type: NotificationTypeEnum;
  onPress: (item: NotificationEntity) => void;
};

export const NotificationItem = ({ item, type, onPress }: Props) => {
  const { title, body, createdAt, seen } = item || {};
  const colorTitle = seen ? 'light' : 'black';
  const colorBody = seen ? 'light' : 'gray';

  const renderIcon = useMemo(() => {
    switch (type) {
      case NotificationTypeEnum.ORDER:
        return <ReceiptCustomSVG fill={tw.color(`grayscale-${colorTitle}`)} />;

      case NotificationTypeEnum.BOOKING:
        return <RepairSVG stroke={tw.color(`grayscale-${colorTitle}`)} />;
      default:
        return null;
    }
  }, [colorTitle, type]);

  return (
    <TouchableOpacity style={tw`flex-row mt-4`} onPress={() => onPress(item)}>
      {!!renderIcon && <View style={tw`mr-4`}>{renderIcon}</View>}
      <View style={tw`flex-1 `}>
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 `}>
            <Text style={tw`text-grayscale-${colorTitle} font-medium`}>{title}</Text>
          </View>
          <Text style={tw`text-10px text-grayscale-light`}>{dayjs(createdAt).locale('vi').fromNow()}</Text>
        </View>
        <Text style={tw`mt-6px text-3 text-grayscale-${colorBody}`}>{body}</Text>
        <Space size={1} backgroundColor={'#EEE'} style={tw`mt-4`} />
      </View>
    </TouchableOpacity>
  );
};
