import { Text } from '@rneui/themed';
import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

import { tw } from '../tw';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { Megaphone, TickCircleGreen } from '../../svg';
import { AppRoutes } from '../../navigator-params';
import { RepairRequestDetailScreenNavigationProps } from '../../screens/repair-request-detail-screen/type';
type Props = {
  status: BookingStatusEnum;
  scheduleAt?: string;
  bookingId: string;
};

export const RepairRequestStatusBar: React.FC<Props> = memo(({ status, scheduleAt, bookingId }: Props) => {
  const navigation = useNavigation<RepairRequestDetailScreenNavigationProps>();

  const config = useMemo(() => {
    switch (status) {
      case BookingStatusEnum.RESCHEDULED:
        return {
          title: `Kỹ thuật viên hẹn ngày đến: ${dayjs(scheduleAt).format('DD/MM/YYYY')}.`,
          containerStyle: tw`bg-primary`,
          titleStyle: tw`text-grayscale-black`,
          leftIcon: <Megaphone color={tw.color('grayscale-black')} />,
        };

      case BookingStatusEnum.TECHNICIAN_ARRIVING:
        return {
          title: 'Đang trên đường đến',
          containerStyle: tw`bg-blue`,
          titleStyle: tw`text-white`,
          leftIcon: <Megaphone color="white" />,
        };

      case BookingStatusEnum.TECHNICIAN_ARRIVED:
        return {
          title: 'Đang sửa chữa',
          containerStyle: tw`bg-primary`,
          titleStyle: tw`text-grayscale-black`,
          leftIcon: <Megaphone color={tw.color('grayscale-black')} />,
        };

      case BookingStatusEnum.QUOTATION_REQUESTED:
        return {
          title: (
            <Text>
              Kỹ thuật viên đã gửi 1 báo giá.{' '}
              <Text
                onPress={() => {
                  // TODO: navigate to quota detail
                }}
              >
                Xem chi tiết
              </Text>
            </Text>
          ),
          containerStyle: tw`bg-primary`,
          titleStyle: tw`text-grayscale-black`,
          leftIcon: <Megaphone color={tw.color('grayscale-black')} />,
        };

      case BookingStatusEnum.QUOTATION_REJECTED:
        return {
          title: (
            <Text>
              Khách hàng đã yêu cầu báo giá lại.{' '}
              <Text
                onPress={() => navigation.navigate(AppRoutes.REPAIR_REQUEST_QUOTATION_REJECT_DETAIL, { bookingId })}
              >
                Xem chi tiết
              </Text>
            </Text>
          ),
          containerStyle: tw`bg-primary`,
          titleStyle: tw`text-grayscale-black`,
          leftIcon: <Megaphone color={tw.color('grayscale-black')} />,
        };

      case BookingStatusEnum.QUOTATION_ACCEPTED:
        return {
          title: 'Khách hàng đã chấp thuận báo giá này',
          containerStyle: tw`bg-status-success`,
          titleStyle: tw`text-white`,
          leftIcon: <TickCircleGreen />,
        };

      case BookingStatusEnum.CANCEL:
        return {
          title: (
            <Text style={tw`text-white`}>
              Yêu cầu đã bị hủy.{' '}
              <Text
                style={tw`text-white underline`}
                onPress={() => {
                  navigation.navigate(AppRoutes.REPAIR_REQUEST_STATUS_HISTORY, { bookingId });
                }}
              >
                Lịch sử trạng thái
              </Text>
            </Text>
          ),
          containerStyle: tw`bg-grayscale-disabled`,
          titleStyle: tw`text-white`,
          leftIcon: <Megaphone color={tw.color('white')} />,
        };

      default:
        return null;
    }
  }, [bookingId, navigation, scheduleAt, status]);

  if (config == null) return null;

  return (
    <Pressable style={tw.style('flex-row items-center', config.containerStyle, 'px-16px', 'py-10px')}>
      <View style={tw`flex-1 flex-row items-center`}>
        {config.leftIcon != null && <View style={tw`mr-10px`}>{config.leftIcon}</View>}
        <Text style={[tw`text-12px leading-16px`, config.titleStyle]}>{config.title}</Text>
      </View>
    </Pressable>
  );
});
