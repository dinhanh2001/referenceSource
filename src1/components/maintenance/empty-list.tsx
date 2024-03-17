import { View, Text } from 'react-native';
import React, { useMemo } from 'react';

import { MaintenanceStatusEnum } from '../../graphql/type.interface';
import { EmptyMaintenanceSvg } from '../../svg';
import { tw } from '../tw';

type Props = {
  status: MaintenanceStatusEnum[];
};

export const MaintenanceEmptyList = ({ status }: Props) => {
  const { text } = useMemo(() => {
    if (status?.includes(MaintenanceStatusEnum.NEW)) {
      return {
        text: 'Chưa có yêu cầu bảo dưỡng nào đang chờ xác nhận',
      };
    } else if (status?.includes(MaintenanceStatusEnum.ACCEPTED)) {
      return {
        text: 'Chưa có yêu cầu được phê duyệt',
      };
    } else if (status?.includes(MaintenanceStatusEnum.DENY)) {
      return {
        text: 'Chưa có yêu cầu bị từ chối',
      };
    } else {
      return {
        text: 'Chưa có yêu cầu bảo dưỡng nào',
      };
    }
  }, [status]);

  return (
    <View style={tw`items-center mt-6`}>
      <EmptyMaintenanceSvg />
      <Text style={tw`mt-2 text-grayscale-gray`}>{text}</Text>
    </View>
  );
};
