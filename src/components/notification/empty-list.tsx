import { View, Text } from 'react-native';
import React, { useMemo } from 'react';

import { NotificationTypeEnum } from '../../graphql/type.interface';
import { EmptyBooking, EmptyMaintain, EmptyOrder, EmptyOther } from '../../svg';
import { tw } from '../tw';

type Props = {
  type: NotificationTypeEnum;
};

export const EmptyListNotificaiton = ({ type }: Props) => {
  const { EmptyIcon, empty } = useMemo(() => {
    switch (type) {
      case NotificationTypeEnum.ORDER:
        return {
          empty: 'Chưa có thông báo đơn hàng nào',
          EmptyIcon: EmptyOrder,
        };
      case NotificationTypeEnum.MAINTENANCE:
        return {
          empty: 'Chưa có thông báo bảo dưỡng nào',
          EmptyIcon: EmptyMaintain,
        };
      case NotificationTypeEnum.BOOKING:
        return {
          empty: 'Chưa có thông báo sửa chữa nào',
          EmptyIcon: EmptyBooking,
        };
      case NotificationTypeEnum.OTHER:
        return {
          empty: 'Chưa có thông báo khác nào',
          EmptyIcon: EmptyOther,
        };
      default:
        return {
          empty: '',
          EmptyIcon: EmptyOther,
        };
    }
  }, [type]);

  return (
    <View style={tw`items-center mt-3`}>
      <EmptyIcon />
      <Text style={tw`mt-2 text-grayscale-gray`}>{empty}</Text>
    </View>
  );
};
