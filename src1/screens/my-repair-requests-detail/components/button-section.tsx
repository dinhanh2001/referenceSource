import { View } from 'react-native';
import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { BookingEntity, BookingStatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';
import { tw } from '../../../components';

type Props = {
  booking: BookingEntity;
  onComplete: () => void;
  onCancel: () => void;
  loadingComplete: boolean;
  onReceipt: () => void;
};

type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const ButtonSection = ({ booking, loadingComplete, onCancel, onComplete, onReceipt }: Props) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { status, id: bookingId } = booking || {};

  const onSettleDetail = useCallback(() => {
    if (bookingId) {
      navigation.navigate('my-repair-requests/settlement-detail', { bookingId });
    }
  }, [bookingId, navigation]);

  if ([BookingStatusEnum.CANCEL, BookingStatusEnum.SETTLEMENT_REJECTED].includes(status)) {
    return null;
  }

  if ([BookingStatusEnum.QUOTATION_ACCEPTED, BookingStatusEnum.SETTLEMENT_REQUESTED].includes(status)) {
    const isQuotationAccepted = status === BookingStatusEnum.QUOTATION_ACCEPTED;
    return (
      <Button
        disabled={isQuotationAccepted}
        title={isQuotationAccepted ? 'Đang chờ gửi quyết toán' : 'Xem quyết toán'}
        onPress={onSettleDetail}
      />
    );
  }

  if ([BookingStatusEnum.SETTLEMENT_ACCEPTED].includes(status)) {
    return (
      <View>
        <Button
          disabled={loadingComplete}
          title={'Xem quyết toán'}
          type={'outline'}
          buttonStyle={tw`border-grayscale-disabled`}
          onPress={onSettleDetail}
        />
        <Button containerStyle={tw`mt-10px`} title={'Thanh toán'} onPress={onComplete} loading={loadingComplete} />
      </View>
    );
  }

  if (status === BookingStatusEnum.COMPLETE) {
    return (
      <View style={tw`flex-row `}>
        {booking?.userCanReviewTechnician && (
          <>
            <Button
              title={'Đánh giá'}
              type={'outline'}
              buttonStyle={tw`border-grayscale-disabled`}
              onPress={() => navigation.navigate('my-repair-request/review', { bookingId })}
              containerStyle={tw`flex-1`}
            />
            <View style={tw`w-16px`} />
          </>
        )}
        <Button containerStyle={tw`flex-1`} title={'Xem hóa đơn'} onPress={onReceipt} />
      </View>
    );
  }

  return <Button title={'Hủy yêu cầu'} onPress={onCancel} />;
};
