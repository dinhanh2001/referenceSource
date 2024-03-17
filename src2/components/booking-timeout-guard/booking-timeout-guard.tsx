import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useOnBookingTimeoutSubscription } from '../../graphql/subscriptions/onBookingTimeout.generated';
import { useAppState } from '../../hooks';
import { useBookingLazyQuery } from '../../graphql/queries/booking.generated';
import { PartnerTypeEnum } from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { useOverlay } from '../../contexts/overlay-content';
import { useAuth } from '../../contexts/auth-context';

export const BookingTimeOutGuard = memo(() => {
  const { isLoggedIn } = useAuth();

  const appState = useAppState();

  const [getBooking] = useBookingLazyQuery();

  const { showDialog } = useOverlay();

  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  useOnBookingTimeoutSubscription({
    skip: !isLoggedIn,
    onError: (err) => {
      console.log('err: ', err);
    },
    onData: async (data) => {
      if (data.data.data?.onBookingTimeout.id != null) {
        const booking = (
          await getBooking({
            variables: {
              id: data.data.data.onBookingTimeout.id,
            },
          })
        ).data?.booking;

        if (booking != null) {
          const res = await showDialog({
            title: 'Yêu cầu sửa chữa quá hạn',
            message: `Yêu cầu sửa chữa của bạn cho thiết bị ${booking?.vehicle.name} đã quá hạn chờ xác nhận từ ${
              booking?.partner.type === PartnerTypeEnum.AGENCY ? 'Đại lý' : 'Kỹ thuật viên'
            }.`,
            confirmText: 'Tiếp tục chờ xác nhận',
            cancelText: 'Tìm đơn vị sửa chữa khác',
            type: 'CONFIRM',
            columnAction: true,
          });

          if (!res) {
            navigation.navigate('repair-request/select-partner', {
              bookingId: booking.id,
              address: {
                lat: booking.latitude,
                lng: booking.longitude,
                mapAddress: booking.mapAddress ?? '',
              },
              addressDetail: booking.addressMoreInfo ?? '',
              description: booking.description ?? '',
              media: [],
              problem: { ids: [] },
              vehicleId: booking.vehicleId,
            });
          }
        }
      }
    },
    shouldResubscribe: appState === 'active',
  });

  return <></>;
});
