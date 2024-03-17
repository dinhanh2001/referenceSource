import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { client } from '../../apollo/apollo';
import { useAuth, useOverlay } from '../../contexts';
import { useTechnicianArrivedBookingMutation } from '../../graphql/mutations/technicianArrivedBooking.generated';
import { useTechnicianArrivingBookingMutation } from '../../graphql/mutations/technicianArrivingBooking.generated';
import { PartnerBookingDocument } from '../../graphql/queries/partnerBooking.generated';
import { PartnerBookingsDocument } from '../../graphql/queries/partnerBookings.generated';
import { PartnerCountItemForEachStatusDocument } from '../../graphql/queries/partnerCountItemForEachStatus.generated';
import { BookingEntity, BookingStatusEnum, PartnerTypeEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { tw } from '../tw';

type Props = {
  booking: BookingEntity;
  screen?: 'LIST' | 'DETAIL';
  onReceipt?: () => void;
};

export const ButtonSection: React.FC<Props> = memo(({ booking, screen = 'LIST', onReceipt }: Props) => {
  const { partner } = useAuth();

  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const { showDialog } = useOverlay();

  const [arrivingAsync, { loading: arrivingLoading }] = useTechnicianArrivingBookingMutation({
    onError: (err) => showFlashMessageError(err),
    onCompleted: () => {
      client.refetchQueries({
        include: [PartnerBookingsDocument, PartnerCountItemForEachStatusDocument, PartnerBookingDocument],
      });
    },
  });

  const handleConfirmRequest = useCallback(async () => {
    if (partner?.type === PartnerTypeEnum.AGENCY) {
      navigation.navigate(AppRoutes.REPAIR_REQUEST_AGENCY_ASSIGN_TECHNICIAN, {
        bookingId: booking.id,
        onCompleted: () =>
          client.refetchQueries({
            include: [PartnerBookingsDocument, PartnerCountItemForEachStatusDocument, PartnerBookingDocument],
          }),
      });
    } else {
      const res = await showDialog({
        title: 'Xác nhận yêu cầu sửa chữa',
        message: 'Bạn có muốn nhận yêu cầu sửa chữa này?',
        type: 'CONFIRM',
        cancelText: 'Hẹn ngày đến',
        confirmText: 'Nhận yêu cầu và đến ngay',
        columnAction: true,
        closeButtonIconShown: true,
      });

      if (res == null) {
        // USer close modal, do nothing
        return;
      }

      if (res) {
        await arrivingAsync({
          variables: {
            input: {
              bookingId: booking.id,
            },
          },
        });
      } else {
        navigation.navigate(AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST, {
          bookingId: booking.id,
          onCompleted: () =>
            client.refetchQueries({
              include: [PartnerBookingsDocument, PartnerCountItemForEachStatusDocument, PartnerBookingDocument],
            }),
        });
      }
    }
  }, [arrivingAsync, booking.id, navigation, partner?.type, showDialog]);

  const handleArrivingRequest = useCallback(async () => {
    await arrivingAsync({
      variables: {
        input: {
          bookingId: booking.id,
        },
      },
    });
  }, [arrivingAsync, booking.id]);

  const handleViewDetail = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN, {
      bookingId: booking.id,
    });
  }, [booking.id, navigation]);

  const [confirmArrivedAsync, { loading: confirmingArrived }] = useTechnicianArrivedBookingMutation({
    onError: (err) => showFlashMessageError(err),
    onCompleted: () => {
      client.refetchQueries({
        include: [PartnerBookingsDocument, PartnerCountItemForEachStatusDocument, PartnerBookingDocument],
      });
    },
  });

  const handleConfirmArrived = useCallback(async () => {
    await confirmArrivedAsync({
      variables: {
        input: {
          bookingId: booking.id,
        },
      },
    });
  }, [booking.id, confirmArrivedAsync]);

  const handleCancelRequest = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_CANCEL_REQUEST, {
      bookingId: booking.id,
    });
  }, [booking.id, navigation]);

  const handleGoToCreateQuota = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN, { bookingId: booking.id });
  }, [booking.id, navigation]);

  const handleGoToCreateSettlement = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_CREATE_SETTLEMENT, { bookingId: booking.id, user: booking.user });
  }, [booking.id, booking.user, navigation]);

  const handleReviewCustomer = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_REVIEW_CUSTOMER, {
      bookingId: booking.id,
      user: booking.user,
    });
  }, [booking.id, booking.user, navigation]);

  const isDetail = useMemo(() => screen === 'DETAIL', [screen]);
  const isTechnician = useMemo(() => partner?.type !== PartnerTypeEnum.AGENCY, [partner?.type]);

  switch (booking.status) {
    case BookingStatusEnum.ASSIGNED_TECHNICIAN:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <Button
              containerStyle={isDetail && tw`flex-1`}
              type="outline"
              title="Từ chối yêu cầu"
              onPress={handleCancelRequest}
              buttonStyle={tw`border-grayscale-disabled`}
            />
          ) : (
            <TouchableOpacity onPress={handleCancelRequest}>
              <Text style={tw`font-semibold underline text-13px leading-18px`}>Từ chối yêu cầu</Text>
            </TouchableOpacity>
          )}
          {isTechnician && (
            <Button
              containerStyle={isDetail && tw`flex-1`}
              title="Nhận yêu cầu"
              onPress={handleConfirmRequest}
              loading={arrivingLoading}
              disabled={arrivingLoading}
            />
          )}
        </View>
      );

    case BookingStatusEnum.WAIT_FOR_CONFIRM:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <Button
              containerStyle={isDetail && tw`flex-1`}
              type="outline"
              title="Từ chối yêu cầu"
              onPress={handleCancelRequest}
              buttonStyle={tw`border-grayscale-disabled`}
            />
          ) : (
            <TouchableOpacity onPress={handleCancelRequest}>
              <Text style={tw`font-semibold underline text-13px leading-18px`}>Từ chối yêu cầu</Text>
            </TouchableOpacity>
          )}
          <Button
            containerStyle={isDetail && tw`flex-1`}
            title="Nhận yêu cầu"
            onPress={handleConfirmRequest}
            loading={arrivingLoading}
            disabled={arrivingLoading}
          />
        </View>
      );

    case BookingStatusEnum.RESCHEDULED:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <>
              <Button
                containerStyle={isDetail && tw`flex-1`}
                type="outline"
                title="Từ chối yêu cầu"
                onPress={handleCancelRequest}
                buttonStyle={tw`border-grayscale-disabled`}
              />
              {isTechnician && (
                <Button
                  containerStyle={isDetail && tw`flex-1`}
                  title="Xác nhận di chuyển"
                  onPress={handleArrivingRequest}
                  loading={arrivingLoading}
                  disabled={arrivingLoading}
                />
              )}
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handleCancelRequest}>
                <Text style={tw`font-semibold underline text-13px leading-18px`}>Từ chối yêu cầu</Text>
              </TouchableOpacity>

              <Button containerStyle={isDetail && tw`flex-1`} title="Xem chi tiết" onPress={handleViewDetail} />
            </>
          )}
        </View>
      );

    case BookingStatusEnum.TECHNICIAN_ARRIVING:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <>
              <Button
                containerStyle={isDetail && tw`flex-1`}
                type="outline"
                title="Huỷ yêu cầu"
                onPress={handleCancelRequest}
                buttonStyle={tw`border-grayscale-disabled`}
              />
              {isTechnician && (
                <Button
                  containerStyle={isDetail && tw`flex-1`}
                  title="Xác nhận đã đến nơi"
                  onPress={handleConfirmArrived}
                  loading={confirmingArrived}
                  disabled={confirmingArrived}
                />
              )}
            </>
          ) : (
            <>
              <View>
                <Text style={tw`text-grayscale-gray`}>Chi phí dự kiến</Text>
                <Text style={tw`font-semibold text-16px text-black`}>1.000.000 đ</Text>
              </View>
              <Button containerStyle={isDetail && tw`flex-1`} title="Xem chi tiết" onPress={handleViewDetail} />
            </>
          )}
        </View>
      );
    case BookingStatusEnum.TECHNICIAN_ARRIVED:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <>
              <Button
                containerStyle={isDetail && tw`flex-1`}
                type="outline"
                title="Huỷ yêu cầu"
                onPress={handleCancelRequest}
                buttonStyle={tw`border-grayscale-disabled`}
              />
              {isTechnician && (
                <Button
                  containerStyle={isDetail && tw`flex-1`}
                  title="Chẩn đoán & báo giá"
                  onPress={handleGoToCreateQuota}
                />
              )}
            </>
          ) : (
            <>
              <View>
                <Text style={tw`text-grayscale-gray`}>Chi phí dự kiến</Text>
                <Text style={tw`font-semibold text-16px text-black`}>1.000.000 đ</Text>
              </View>
              <Button containerStyle={isDetail && tw`flex-1`} title="Xem chi tiết" onPress={handleViewDetail} />
            </>
          )}
        </View>
      );
    case BookingStatusEnum.QUOTATION_ACCEPTED:
      return (
        <View style={tw`flex-row items-center justify-between gap-16px`}>
          {isDetail ? (
            <>
              {isTechnician && (
                <Button
                  containerStyle={isDetail && tw`flex-1`}
                  title="Tạo quyết toán"
                  onPress={handleGoToCreateSettlement}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      );

    case BookingStatusEnum.COMPLETE:
      return (
        <View style={tw`flex-row items-center justify-end gap-16px`}>
          {isDetail ? (
            booking.technicianCanReviewUser ? (
              <Button
                containerStyle={isDetail && tw`flex-1`}
                type="outline"
                title="Đánh giá khách hàng"
                onPress={handleReviewCustomer}
                buttonStyle={tw`border-grayscale-disabled`}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <>
            <Button
              containerStyle={isDetail && tw`flex-1`}
              title={screen === 'DETAIL' ? 'Xem hoá đơn' : 'Xem chi tiết'}
              onPress={screen === 'DETAIL' ? onReceipt : handleViewDetail}
            />
          </>
        </View>
      );
    case BookingStatusEnum.CANCEL:
      return <></>;
    default:
      return <></>;
  }
});
