import { View, Text } from 'react-native';
import React, { useMemo } from 'react';

import { MaintenanceStatusEnum } from '../../graphql/type.interface';
import { MegaphoneSvg } from '../../svg';
import { tw } from '../tw';

type Props = {
  status: MaintenanceStatusEnum;
};

export const BannerMaintenance = ({ status }: Props) => {
  const { bg, color, text } = useMemo(() => {
    switch (status) {
      case MaintenanceStatusEnum.NEW:
        return {
          text: 'Đang chờ Call Me xác nhận.',
          color: tw.color('grayscale-black'),
          bg: 'primary-light',
        };

      case MaintenanceStatusEnum.ACCEPTED:
        return {
          text: 'Yêu cầu đã được phê duyệt.',
          color: tw.color('grayscale-black'),
          bg: '[#C5FFC4]',
        };

      case MaintenanceStatusEnum.DENY:
      case MaintenanceStatusEnum.CANCEL:
        return {
          text: 'Yêu cầu đã bị từ chối.',
          color: tw.color('white'),
          bg: 'grayscale-disabled',
        };

      default:
        return {
          text: '',
          color: '',
          bg: '',
        };
    }
  }, [status]);

  return (
    <View style={tw`flex-row items-center bg-${bg} py-3 px-4 gap-10px`}>
      <MegaphoneSvg fill={color} />
      <Text style={tw`text-[${color as string}] text-3`}>{text}</Text>
    </View>
  );
};
