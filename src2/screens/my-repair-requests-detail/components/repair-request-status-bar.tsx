import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MegaphoneSvg } from '../../../svg';
import { tw } from '../../../components';
import { BookingEntity, BookingStatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';

type Props = {
  booking: BookingEntity;
};

type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const RepairRequestStatusBar = ({ booking }: Props) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const { status, scheduleTime, id: bookingId } = booking || {};

  const config = useMemo(() => {
    let text = '',
      textBtn = '',
      onPress,
      containerStyle,
      textStyle,
      colorIcon = '#202C38';

    switch (status) {
      case BookingStatusEnum.WAIT_FOR_CONFIRM:
        text = 'Đang chờ xác nhận từ Kỹ thuật viên.';
        break;

      case BookingStatusEnum.RESCHEDULED:
        text = `Kỹ thuật viên hẹn ngày đến: ${dayjs(scheduleTime).format('DD/MM/YYYY')}.`;
        textBtn = 'Chi tiết';
        onPress = () => navigation.navigate('my-repair-request/schedule-detail', { bookingId });
        break;

      case BookingStatusEnum.TECHNICIAN_ARRIVING:
        text = 'Kỹ thuật viên đang trên đường đến.';
        break;

      case BookingStatusEnum.TECHNICIAN_ARRIVED:
        text = 'Kỹ thuật viên đang chẩn đoán & lên báo giá.';
        break;

      case BookingStatusEnum.QUOTATION_REQUESTED:
        text = 'Kỹ thuật viên đã gửi báo giá.';
        textBtn = 'Xem báo giá';
        onPress = () => navigation.navigate('my-repair-request/push-quotation', { bookingId });
        break;

      case BookingStatusEnum.QUOTATION_REJECTED:
        text = 'Bạn đã yêu cầu báo giá lại';
        textBtn = 'Xem chi tiết';
        onPress = () => navigation.navigate('my-repair-requests/requote-detail', { bookingId });
        break;

      case BookingStatusEnum.QUOTATION_ACCEPTED:
        text = 'Đã chấp thuận báo giá.';
        textBtn = 'Xem lịch sử trạng thái';
        onPress = () => navigation.navigate('my-repair-requests/request-status', { bookingId });
        break;

      case BookingStatusEnum.SETTLEMENT_REQUESTED:
        text = 'Kỹ thuật viên đã gửi quyết toán.';
        textBtn = 'Xem chi tiết';
        onPress = () => navigation.navigate('my-repair-requests/settlement-detail', { bookingId });
        break;

      case BookingStatusEnum.COMPLETE:
        text = 'Hoàn thành sửa chữa.';
        textBtn = 'Lịch sử trạng thái';
        containerStyle = tw`bg-status-success`;
        textStyle = tw`text-white`;
        colorIcon = '#fff';
        onPress = () => navigation.navigate('my-repair-requests/request-status', { bookingId });
        break;

      case BookingStatusEnum.CANCEL:
        text = 'Yêu cầu đã bị hủy.';
        textBtn = 'Lịch sử trạng thái';
        containerStyle = tw`bg-grayscale-disabled`;
        textStyle = tw`text-white`;
        colorIcon = '#fff';
        onPress = () => navigation.navigate('my-repair-requests/request-status', { bookingId });
        break;

      case BookingStatusEnum.SETTLEMENT_REJECTED:
        text = 'Đã từ chối quyết toán';
        containerStyle = tw`bg-grayscale-disabled`;
        textStyle = tw`text-white`;
        colorIcon = '#fff';
        break;
      default:
        break;
    }

    return {
      text,
      textBtn,
      onPress,
      containerStyle,
      textStyle,
      colorIcon,
    };
  }, [bookingId, navigation, scheduleTime, status]);

  if (!config?.text) {
    return null;
  }

  return (
    <View style={[tw`px-4 py-3 bg-primary-light flex-row items-center`, config.containerStyle]}>
      <MegaphoneSvg fill={config.colorIcon} />
      <Pressable onPress={config?.onPress}>
        <Text style={[tw`text-3 ml-3`, config.textStyle]}>
          {config?.text} <Text style={[tw`font-bold`, styles.underline]}>{config?.textBtn}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
