import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BookingCountDown, VehicleCard, tw } from '../../../components';
import { BookingEntity, BookingStatusEnum } from '../../../graphql/type.interface';
import { UseAppStackNavigatorScreenProps } from '../../../navigator-params';
import { LocationPrimary } from '../../../svg';
import { thousandSeparator } from '../../../utils';
import { noop } from '../../../helpers';

import { PartnerContactView } from './contact-view';
import { IssueDescription } from './issue-description';

type Props = {
  item: BookingEntity;
  refetchQuery?(): void;
};

export const RequestedItem = React.memo(({ item, refetchQuery }: Props) => {
  const {
    status,
    code,
    createdAt,
    vehicle,
    mapAddress,
    addressMoreInfo,
    partner,
    technician,
    transportFee,
    transportDistance = 0,
  } = item || {};

  const hasCancel = status === BookingStatusEnum.WAIT_FOR_CONFIRM;

  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'repair-request'>>();
  const onDetail = useCallback(() => {
    navigation.navigate('my-repair-request/detail', { bookingId: item?.id });
  }, [item, navigation]);

  const onCancel = useCallback(() => {
    navigation.navigate('my-repair-request/cancel-reason', { booking: item, refetch: refetchQuery ?? noop });
  }, [item, navigation, refetchQuery]);

  return (
    <View style={tw`mt-2 bg-white px-4 py-5`}>
      <View style={tw`flex-row justify-between items-start`}>
        <View>
          <Text style={tw`font-semibold text-[14px] leading-20px`}>{code}</Text>
          <Text style={tw`text-12px leading-16px text-grayscale-gray`}>
            Đặt lúc: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
        {hasCancel && <BookingCountDown startFrom={item.updatedAt} />}
      </View>
      <VehicleCard item={vehicle} />
      <View style={tw`flex-row px-3 py-2 bg-grayscale-bg mb-4 items-center`}>
        <LocationPrimary />
        <Text style={tw`text-[13px] mx-3`} numberOfLines={1}>{`${addressMoreInfo}, ${mapAddress}`}</Text>
      </View>
      <IssueDescription booking={item} />
      <PartnerContactView partner={technician ? technician : partner} />
      {hasCancel && (
        <View style={tw`flex-row justify-between my-4 items-center`}>
          <Text style={tw`text-14px text-grayscale-gray`}>Phí di chuyển - {transportDistance || 0}KM</Text>
          <Text style={tw`font-semibold text-17px`}>{thousandSeparator(transportFee || 0)} đ</Text>
        </View>
      )}
      <View style={tw`flex-row items-center justify-between ${hasCancel ? '' : 'mt-18px'}`}>
        {hasCancel ? (
          <TouchableOpacity onPress={onCancel}>
            <Text style={[tw`text-13px font-semibold leading-18px`, styles.text]}>Hủy yêu cầu</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={tw`text-13px text-grayscale-gray`}>Tổng chi phí</Text>
            <Text style={tw`text-17px font-semibold mt-4px text-grayscale-black`}>
              {thousandSeparator(transportFee || 0)} đ
            </Text>
          </View>
        )}
        <Button containerStyle={tw`w-[40%]`} onPress={onDetail}>
          <Text style={tw`text-13px font-semibold`}>{'Xem chi tiết'}</Text>
        </Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
});
