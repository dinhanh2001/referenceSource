import { Button } from '@rneui/themed';
import React, { useMemo } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { EmptyView, bookingStatusMapping, tw } from '../../../components';
import { BookingStatusEnum } from '../../../graphql/type.interface';
import { MyRepairEmpty } from '../../../svg';
import { AppStackNavigatorParamList } from '../../../navigator-params';

type Props = {
  bookingStatuses: BookingStatusEnum[];
};

type ScreenNavigationProps = NavigationProp<AppStackNavigatorParamList>;

export const MyRepairRequestsEmpty = ({ bookingStatuses }: Props) => {
  const navigation = useNavigation<ScreenNavigationProps>();

  const description = useMemo(() => {
    if (bookingStatusMapping.waitToConfirm.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào chờ nhận';
    else if (bookingStatusMapping.onGoing.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đang đến';
    else if (bookingStatusMapping.completed.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đã hoàn thành';
    else if (bookingStatusMapping.checking.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đang kiểm tra';
    else if (bookingStatusMapping.canceled.some((it) => bookingStatuses.includes(it)))
      return 'Chưa có Yêu cầu sửa chữa nào đã huỷ';

    return '';
  }, [bookingStatuses]);

  return (
    <EmptyView
      icon={<MyRepairEmpty />}
      text={description}
      action={
        bookingStatusMapping.waitToConfirm.some((it) => bookingStatuses.includes(it)) && (
          <Button
            containerStyle={tw`mt-4`}
            style={tw`px-5 bg-primary`}
            onPress={() => navigation.navigate('repair-request')}
            title={'Tạo yêu cầu sửa chữa'}
          />
        )
      }
    />
  );
};
