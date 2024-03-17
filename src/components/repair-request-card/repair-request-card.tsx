import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BookingEntity, BookingStatusEnum } from '../../graphql/type.interface';
import { renderPrice } from '../../helpers';
import { AppRoutes } from '../../navigator-params';
import { RepairRequestListScreenNavigationProps } from '../../screens/repair-request-list-screen/type';
import { ButtonSection } from '../button-section';
import { CallingSection } from '../calling-section';
import { LocationSection } from '../location-section';
import { VehicleSection } from '../vehicle-section';
import { MalfunctionSection } from '../malfunction-section';
import { Space } from '../spacer';
import { tw } from '../tw';
import { BookingCountDown } from '../booking-count-down';

type Props = {
  data: BookingEntity;
};

export const RepairRequestCard = memo(({ data }: Props) => {
  const navigation = useNavigation<RepairRequestListScreenNavigationProps>();

  const navigateToMalfunctionScreen = useCallback(() => {
    navigation.navigate(AppRoutes.MALFUNCTION_SCREEN, { bookingId: data.id });
  }, [data.id, navigation]);

  const navigateToDetail = useCallback(
    (bookingId: string) => {
      navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN, { bookingId: bookingId });
    },
    [navigation],
  );

  const shownCountdown = useMemo(
    () => [BookingStatusEnum.WAIT_FOR_CONFIRM, BookingStatusEnum.ASSIGNED_TECHNICIAN].includes(data.status),
    [data.status],
  );

  return (
    <View>
      <Space size={10} />
      <TouchableOpacity onPress={() => navigateToDetail(data.id)} style={tw`bg-white flex-1 p-4`}>
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 justify-center`}>
            <Text style={tw`font-bold`}>{data.code}</Text>
          </View>
          {shownCountdown && <BookingCountDown startFrom={data.updatedAt} />}
        </View>
        <Text style={tw`font-normal text-grayscale-gray`}>
          Đặt lúc: {dayjs(data.createdAt).format('DD/MM/YYYY HH:mm')}
        </Text>
        <Space size={16} />
        <VehicleSection data={data.vehicle} />
        <Space size={16} />
        {data?.mapAddress && <LocationSection location={data.mapAddress} />}
        <MalfunctionSection
          data={data}
          hideDescription
          navigateToMalfunctionScreen={navigateToMalfunctionScreen}
          containerStyle={tw`mt-8px`}
        />
        <Space size={8} />
        <Space backgroundColor={tw.color('grayscale-border')} size={1} />
        <CallingSection user={data.user} />
        <Space backgroundColor={tw.color('grayscale-border')} size={1} />
        {/* <CallingSection />
        <Space backgroundColor={tw.color('grayscale-border')} size={1} /> */}
        <Space size={16} />
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-grayscale-gray`}>Phí di chuyển - {data.transportDistance} KM</Text>
          <Text style={tw`text-17px font-semibold`}>{renderPrice(data.transportFee)} đ</Text>
        </View>
        <Space size={16} />
        <ButtonSection booking={data} />
      </TouchableOpacity>
    </View>
  );
});
