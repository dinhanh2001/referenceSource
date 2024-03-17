import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

import { MaintenanceEntity, MaintenanceStatusEnum } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  maintenance: MaintenanceEntity;
};

export const MaintenanceInfo = ({ containerStyle, maintenance }: Props) => {
  const { status, code, createdAt, statusDetail } = maintenance || {};
  const { note, reasons } = statusDetail || {};

  const isCancel = [MaintenanceStatusEnum.DENY, MaintenanceStatusEnum.CANCEL]?.includes?.(status);

  return (
    <View style={containerStyle}>
      {isCancel && (
        <View style={tw`mb-6`}>
          <Text style={tw`uppercase font-semibold`}>Lý do từ chối</Text>
          <View style={tw`border border-[#EEE] px-4 py-10px mt-4 rounded-1`}>
            {reasons?.map((reason) => (
              <Text key={reason?.id} style={tw`text-grayscale-gray mb-1`}>
                {reason?.name}
              </Text>
            ))}
            <Text style={tw`text-grayscale-gray`}>{note}</Text>
          </View>
        </View>
      )}

      <View style={tw`flex-row justify-between items-center `}>
        <Text style={tw`text-13px text-grayscale-gray`}>Mã yêu cầu</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-13px mr-8px`}>{code}</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-13px text-grayscale-gray`}>Thời gian đặt</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-13px mr-8px`}>{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
      </View>
    </View>
  );
};
