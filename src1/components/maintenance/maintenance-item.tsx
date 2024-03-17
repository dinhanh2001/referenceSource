import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import {
  MaintenanceEntity,
  MaintenanceLevelEnum,
  MaintenanceStatusEnum,
  VehicleEntity,
} from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { ArrowRight, CalendarSVG } from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';

import { VehicleMaintenance } from './vehicle-maintenance';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: MaintenanceEntity;
};

export const MaintenanceItem = ({ item, containerStyle }: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const {
    id,
    status,
    code,
    vehicle,
    createdAt,
    maintenanceLevel,
    startDate,
    endDate,
    mapAddress,
    addressMoreInfo,
    vehicleTypeCategory,
  } = item || {};

  const showCancel = status === MaintenanceStatusEnum.NEW;
  const isIncurred = maintenanceLevel === MaintenanceLevelEnum.INCURRED;

  const onSuppliesDetail = useCallback(() => {
    navigation.navigate('maintenance/supplies', { maintenanceId: id });
  }, [id, navigation]);

  const onDetail = useCallback(() => {
    navigation.navigate('maintenance/detail', { maintenanceId: id });
  }, [navigation, id]);

  const onCancel = useCallback(() => {
    navigation.navigate('maintenance/cancel', { maintenanceId: id });
  }, [navigation, id]);

  const textMaintenance = useMemo(
    () => (isIncurred ? 'Bảo dưỡng phát sinh' : `Định kỳ (giờ vận hành ${vehicleTypeCategory?.operatingNumber}h)`),
    [isIncurred, vehicleTypeCategory?.operatingNumber],
  );

  return (
    <View style={[tw`bg-white mt-2 px-4 py-5`, containerStyle]}>
      <Text style={tw`font-semibold`}>{code}</Text>
      <Text style={tw`mt-1 text-grayscale-gray text-3`}>Đặt lúc: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
      <VehicleMaintenance
        containerStyle={tw`mt-4`}
        vehicle={vehicle as VehicleEntity}
        address={`${addressMoreInfo} ${mapAddress}`}
      />
      <TouchableOpacity style={tw`flex-row items-center mt-2 mb-4`} disabled={isIncurred} onPress={onSuppliesDetail}>
        <View style={tw`flex-1`}>
          <Text style={tw`font-medium`}>{textMaintenance}</Text>
          <Text style={tw`text-3 text-grayscale-gray mt-2px`}>Hạng mục & vật tư bảo dưỡng</Text>
        </View>
        {!isIncurred && <ArrowRight />}
      </TouchableOpacity>
      <Space size={1} backgroundColor={'#EEE'} />
      <View style={tw`my-4`}>
        <Text style={tw`font-medium`}>Thời gian đặt lịch</Text>
        <View style={tw`flex-row py-10px px-2 border border-[#EEE] mt-2 rounded-1 items-center`}>
          <CalendarSVG />
          <Text style={tw`ml-2`}>{`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(endDate).format(
            'DD/MM/YYYY',
          )}`}</Text>
        </View>
      </View>
      <Space size={1} backgroundColor={'#EEE'} />
      <View style={tw`flex-row ${showCancel ? 'justify-between' : 'justify-end'} items-center mt-4`}>
        {showCancel && (
          <TouchableOpacity onPress={onCancel}>
            <Text style={tw`text-13px font-semibold underline`}>Hủy yêu cầu</Text>
          </TouchableOpacity>
        )}
        <Button title={'Xem chi tiết'} onPress={onDetail} buttonStyle={tw`px-6`} />
      </View>
    </View>
  );
};
