import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, VehicleCard, tw } from '../../components';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { useCompleteBookingByUserMutation } from '../../graphql/mutations/completeBookingByUser.generated';
import { useBookingQuery } from '../../graphql/queries/booking.generated';
import { useUserGetInvoiceLazyQuery } from '../../graphql/queries/userGetInvoice.generated';
import { useUserGetLatestQuotationOfBookingQuery } from '../../graphql/queries/userGetLatestQuotationOfBooking.generated';
import { BookingEntity, BookingStatusEnum, CategoryEntity } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorParamList, AppStackNavigatorScreenProps } from '../../navigator-params';
import { ArrowRight, LocationPrimary, Sent } from '../../svg';
import { thousandSeparator } from '../../utils';
import { IssueDescription, PartnerContactView } from '../my-repair-requests/components';

import { ButtonSection, RepairRequestStatusBar } from './components';

type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const MyRepairRequestsDetail = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<AppStackNavigatorScreenProps<'my-repair-request/detail'>['route']>();
  const { bookingId } = route?.params || {};
  const { showDialog } = useOverlay();

  const { data, loading, refetch } = useBookingQuery({ variables: { id: bookingId } });
  const { data: dataQuotation, refetch: refetchQuotation } = useUserGetLatestQuotationOfBookingQuery({
    variables: { bookingId },
  });
  const [getInvoice] = useUserGetInvoiceLazyQuery();
  const { showFullscreenLoading } = useFullScreenLoading();

  const refresh = useCallback(async () => {
    await refetchQuotation();
    await refetch();
  }, [refetch, refetchQuotation]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refresh);

  const booking = useMemo(() => data?.booking as unknown as BookingEntity, [data?.booking]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const {
    partner,
    addressMoreInfo,
    mapAddress,
    vehicle,
    transportFee,
    code,
    createdAt,
    technician,
    status,
    statusDetail,
    technicianId,
    settlementAccepted,
  } = booking || {};

  const [completeBooking, { loading: loadingCompleteBooking }] = useCompleteBookingByUserMutation({
    variables: { input: { bookingId } },
    onError: showFlashMessageError,
    onCompleted: async () => {
      await refetch();
      await showDialog({
        icon: <Sent />,
        title: 'Thanh toán thành công!',
        message: 'Bạn đã thanh toán thành công.',
        type: 'ALERT',
      });
    },
  });

  const onSettleDetail = useCallback(() => {
    if (bookingId) {
      navigation.navigate('my-repair-requests/settlement-detail', { bookingId });
    }
  }, [bookingId, navigation]);

  const onCancel = useCallback(() => {
    if (booking != null) {
      navigation.navigate('my-repair-request/cancel-reason', {
        booking,
        refetch: refetchByUser,
      });
    }
  }, [booking, navigation, refetchByUser]);

  const onQuotationHistory = useCallback(() => {
    navigation.navigate('my-repair-requests/quotation-history', { bookingId });
  }, [bookingId, navigation]);

  const onReceipt = useCallback(async () => {
    try {
      showFullscreenLoading(true);
      const invoice = await getInvoice({ variables: { settlementId: settlementAccepted?.id || '' } });
      await Linking.openURL(invoice?.data?.userGetInvoice?.fullOriginalUrl as string);
    } catch (error) {
      showMessage({
        message: 'Không thể mở hóa đơn',
        type: 'danger',
      });
    } finally {
      showFullscreenLoading(false);
    }
  }, [showFullscreenLoading, getInvoice, settlementAccepted?.id]);

  if (loading) return <ActivityIndicator />;

  if (booking == null) return null;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Chi tiết sửa chữa" />

      <RepairRequestStatusBar booking={booking} />

      <ScrollView
        contentContainerStyle={tw`grow bg-grayscale-bg`}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <View style={tw`bg-white px-4 pt-16px`}>
          <Text style={tw`text-[14px] font-bold mb-4`}>XE GẶP SỰ CỐ</Text>
          <VehicleCard item={vehicle} />
          <Text style={tw`text-14px font-medium mt-6 mb-5`}>Hiện tượng hư hỏng</Text>
          <View style={tw`flex-row px-3 py-2 bg-grayscale-bg mb-4 items-center`}>
            <LocationPrimary />
            <Text style={tw`text-[13px] mx-3`}>{`${addressMoreInfo}, ${mapAddress}`}</Text>
          </View>
          <IssueDescription booking={booking} previewMedia />
        </View>
        <View style={tw`py-5 mt-[6px] bg-white px-4 `}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-[14px] font-bold `}>CHI PHÍ DỰ KIẾN</Text>
            {!!dataQuotation?.userGetLatestQuotationOfBooking && (
              <TouchableOpacity style={tw`flex-row items-center`} onPress={onQuotationHistory}>
                <Text style={tw`mr-4px text-13px text-grayscale-black`}>Lịch sử báo giá</Text>
                <ArrowRight />
              </TouchableOpacity>
            )}
          </View>
          <View style={tw`flex-row items-center border border-grayscale-border bg-[#f9f9f9]`}>
            <View style={tw`flex-1 px-16px py-10px `}>
              <Text style={tw`text-12px text-grayscale-black`}>Phí di chuyển</Text>
            </View>
            <View style={tw`flex-1 px-16px py-10px bg-white`}>
              <Text style={tw`text-12px text-grayscale-black`}>{thousandSeparator(transportFee || 0)} đ</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center border border-grayscale-border bg-[#f9f9f9]`}>
            <View style={tw`flex-1 px-16px py-10px `}>
              <Text style={tw`text-12px text-grayscale-black`}>Tổng chi phí</Text>
            </View>
            <View style={tw`flex-1 px-16px py-10px bg-white`}>
              <Text style={tw`text-12px text-grayscale-black font-bold`}>
                {thousandSeparator(dataQuotation?.userGetLatestQuotationOfBooking?.total || transportFee || 0)} đ
              </Text>
            </View>
          </View>
          {status === BookingStatusEnum.COMPLETE && (
            <Button
              title={'Xem quyết toán'}
              type="outline"
              containerStyle={tw`mt-16px border-primary-dark `}
              titleStyle={tw`text-primary-dark`}
              onPress={onSettleDetail}
            />
          )}
        </View>
        <View style={tw`py-5 mt-[6px] bg-white px-4 `}>
          <Text style={tw`text-[14px] font-bold mb-4`}>{technician ? 'KỸ THUẬT VIÊN' : 'ĐƠN VỊ SỬA CHỮA'}</Text>
          <View style={tw`p-16px border-grayscale-border border rounded`}>
            <PartnerContactView
              containerStyle={tw`border-t-0 border-b-0 py-0 pt-0 mt-0`}
              partner={technician ? technician : partner}
            />
          </View>
        </View>
        <View style={tw`py-5 mt-[6px] bg-white px-4 `}>
          <RowInfo title={'Mã yêu cầu'} value={code} />
          <RowInfo title={'Thời gian đặt'} value={dayjs(createdAt).format('DD/MM/YYYY HH:mm')} />
          {status === BookingStatusEnum.CANCEL && (
            <>
              <RowInfo title={'Thời gian hủy'} value={dayjs(statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')} />
              {!!statusDetail?.partnerId && (
                <RowInfo
                  title={'Người hủy'}
                  value={statusDetail?.partnerId === technicianId ? 'Kỹ thuật viên' : 'Đơn vị sửa chữa'}
                />
              )}
              <RowInfo
                title={'Lý do hủy'}
                value={statusDetail?.reasons?.map?.((e: CategoryEntity) => e?.name)?.join?.() as string}
                moreValue={statusDetail?.note as string}
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={tw`px-4 py-2 shadow`}>
        <ButtonSection
          booking={booking}
          onCancel={onCancel}
          onComplete={() => completeBooking()}
          loadingComplete={loadingCompleteBooking}
          onReceipt={onReceipt}
        />
      </View>
    </SafeAreaView>
  );
};

type RowInfoProps = {
  title: string;
  value: string;
  moreValue?: string;
};

const RowInfo = ({ title, value, moreValue }: RowInfoProps) => {
  return (
    <View style={tw`flex-row  mt-8px`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-[14px] text-grayscale-gray leading-5`}>{title}</Text>
      </View>
      <View style={tw`flex-2 ml-8px items-end`}>
        <Text style={tw`text-[14px] text-right text-grayscale-gray leading-5 `}>{value}</Text>
        {!!moreValue && <Text style={tw`text-[14px] text-right text-grayscale-gray leading-5 `}>{moreValue}</Text>}
      </View>
    </View>
  );
};
