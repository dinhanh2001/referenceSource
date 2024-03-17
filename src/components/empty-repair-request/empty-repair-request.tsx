import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { tw } from '../tw';
import { Empty1 } from '../../svg';
import { Space } from '../spacer';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { useBookingStatus } from '../../screens/repair-request-list-screen/use-booking-status';

type Props = {
  bookingStatuses: BookingStatusEnum[];
};

export const EmptyRepairRequest: React.FC<Props> = memo(({ bookingStatuses }: Props) => {
  const { bookingStatusMapping, isAgency } = useBookingStatus();

  const description = useMemo(() => {
    if (bookingStatusMapping.waitToConfirm.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào chờ nhận';
    else if (bookingStatusMapping.onGoing.some((it) => bookingStatuses.includes(it)))
      return isAgency ? 'Chưa có Yêu cầu sửa chữa nào KTV nhận' : 'Chưa có Yêu cầu sửa chữa nào đang đến';
    else if (bookingStatusMapping.completed.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đã hoàn thành';
    else if (bookingStatusMapping.handOver.some((it) => bookingStatuses.includes(it)))
      return isAgency ? 'Chưa có Yêu cầu sửa chữa nào đang kiểm tra' : 'Chưa có Yêu cầu sửa chữa nào đang bàn giao';
    else if (bookingStatusMapping.checking.some((it) => bookingStatuses.includes(it)))
      return isAgency ? 'Chưa có Yêu cầu sửa chữa nào đang đến' : 'Chưa có Yêu cầu sửa chữa nào đang kiểm tra';
    else if (bookingStatusMapping.canceled.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đã huỷ';

    return null;
  }, [
    bookingStatusMapping.canceled,
    bookingStatusMapping.checking,
    bookingStatusMapping.completed,
    bookingStatusMapping.handOver,
    bookingStatusMapping.onGoing,
    bookingStatusMapping.waitToConfirm,
    bookingStatuses,
    isAgency,
  ]);

  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex-1 items-center mt-35px`}>
        <Empty1 />
        <Space size={8} />
        <Text style={tw`text-grayscale-gray text-center`}>{description}</Text>
      </View>
    </View>
  );
});
