import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect } from 'react';
import { Linking, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';

import {
  ActivityIndicator,
  ButtonSection,
  LocationSection,
  MalfunctionSection,
  RepairRequestStatusBar,
  Space,
  VehicleSection,
  tw,
} from '../../components';
import { CallButton } from '../../components/call-button';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { usePartnerGetLatestQuotationOfBookingQuery } from '../../graphql/queries/partnerGetLatestQuotationOfBooking.generated';
import { BookingEntity, BookingStatusEnum, CategoryEntity, VehicleEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';
import { ArrowRightSVG, StarSVG } from '../../svg';
import { usePartnerGetInvoiceLazyQuery } from '../../graphql/queries/partnerGetInvoice.generated';
import { useFullScreenLoading } from '../../contexts';

import { PropsType, RepairRequestDetailScreenNavigationProps } from './type';

export const RepairRequestDetailScreen: React.FC<PropsType> = memo((props: PropsType) => {
  const navigation = useNavigation<RepairRequestDetailScreenNavigationProps>();
  const { bookingId } = props.route.params;

  const { bottom } = useSafeAreaInsets();
  const { showFullscreenLoading } = useFullScreenLoading();

  const { data, loading, refetch } = usePartnerBookingQuery({ variables: { id: bookingId } });
  const { data: dataQuotations, refetch: refetchQuotation } = usePartnerGetLatestQuotationOfBookingQuery({
    variables: { bookingId },
  });
  const [getInvoice] = usePartnerGetInvoiceLazyQuery();

  const refresh = useCallback(async () => {
    await refetchQuotation();
    await refetch();
  }, [refetch, refetchQuotation]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refresh);

  const {
    code,
    mapAddress,
    addressMoreInfo,
    transportFee,
    user,
    createdAt,
    status,
    statusDetail,
    technicianId,
    settlementAccepted,
  } = data?.partnerBooking || {};

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const navigateToMalfunctionScreen = useCallback(() => {
    navigation.navigate(AppRoutes.MALFUNCTION_SCREEN, { bookingId });
  }, [bookingId, navigation]);

  const navigateToQuotationHistoryScreen = useCallback(() => {
    navigation.navigate(AppRoutes.QUOTATION_HISTORY, { bookingId });
  }, [bookingId, navigation]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`text-17px font-semibold`}>{code}</Text>
        </View>
      ),
      headerTitleAlign: 'left',
    });
  }, [code, props.navigation]);

  const onReceipt = useCallback(async () => {
    try {
      showFullscreenLoading(true);
      const invoice = await getInvoice({
        variables: {
          settlementId: settlementAccepted?.id as string,
        },
      });

      await Linking.openURL(invoice.data?.partnerGetInvoice?.fullOriginalUrl as string);
    } catch (error) {
      showMessage({
        message: 'Không thể mở hoá đơn',
        type: 'danger',
      });
    } finally {
      showFullscreenLoading(false);
    }
  }, [getInvoice, settlementAccepted?.id, showFullscreenLoading]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (data == null) return null;

  return (
    <View style={tw`flex-1`}>
      <ScrollView
        style={tw`flex-1 bg-white`}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <RepairRequestStatusBar
          status={data.partnerBooking.status}
          scheduleAt={data.partnerBooking.scheduleTime}
          bookingId={data?.partnerBooking?.id}
        />
        <View style={tw`p-16px`}>
          <VehicleSection data={data?.partnerBooking.vehicle as VehicleEntity} />
          <Space size={16} />
          <LocationSection location={`${addressMoreInfo} ${mapAddress}` ?? ''} />
          <Space size={16} />
          <Text style={tw`font-semibold mb-12px`}>Hiện tượng hư hỏng</Text>
          <MalfunctionSection
            navigateToMalfunctionScreen={navigateToMalfunctionScreen}
            data={data?.partnerBooking as BookingEntity}
            previewMedia
          />
        </View>
        <Space size={6} backgroundColor={tw.color('grayscale-border')} />
        <View style={tw`p-16px`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold`}>CHI PHÍ DỰ KIẾN</Text>
            {!!dataQuotations?.partnerGetLatestQuotationOfBooking && (
              <TouchableOpacity
                onPress={navigateToQuotationHistoryScreen}
                style={tw`flex-row items-center justify-center`}
              >
                <Text>Lịch sử báo giá</Text>
                <Space horizontal size={4} />
                <ArrowRightSVG width={15} height={15} />
              </TouchableOpacity>
            )}
          </View>
          <View style={tw`flex-row mt-16px`}>
            <View style={tw`flex-1 py-10px px-16px bg-grayscale-bg border border-grayscale-border border-r-0`}>
              <Text style={tw`text-13px`}>Phí di chuyển</Text>
            </View>
            <View style={tw`flex-1 py-10px px-16px items-end border border-grayscale-border`}>
              <Text style={tw`text-13px`}>{thousandSeparator(transportFee || 0)} đ</Text>
            </View>
          </View>
          <View style={tw`flex-row`}>
            <View
              style={tw`flex-1 py-10px px-16px bg-grayscale-border border border-grayscale-border border-r-0 border-t-0`}
            >
              <Text style={tw`text-13px`}>Tổng chi phí</Text>
            </View>
            <View style={tw`flex-1 py-10px px-16px items-end border border-grayscale-border border-t-0`}>
              <Text style={tw`text-16px font-semibold`}>
                {thousandSeparator(dataQuotations?.partnerGetLatestQuotationOfBooking?.total || transportFee || 0)} đ
              </Text>
            </View>
          </View>
        </View>
        <Space size={6} backgroundColor={tw.color('grayscale-border')} />
        {/* <View style={tw`p-16px`}>
        <View>
          <Text style={tw`font-semibold`}>KỸ THUẬT VIÊN PHỤ TRÁCH</Text>
        </View>
        <Space size={6} />
        <View style={tw` flex-row items-center p-3 border border-grayscale-border`}>
          <View style={tw`flex-row items-center flex-1 `}>
            <View style={tw`relative`}>
              <View style={tw`bottom-5px p-2px border rounded-full border-white shadow-xl`}>
                <Image source={{ uri: 'https://picsum.photos/200' }} style={tw`w-40px h-40px rounded-full`} />
              </View>
              <View
                style={tw`-bottom-5px flex-row absolute items-center self-center bg-white px-4px py-1px rounded-full`}>
                <StarSVG />
                <Space size={4} horizontal />
                <Text style={tw`font-semibold text-12px`}>5.0</Text>
              </View>
            </View>
            <Space horizontal size={12} />
            <View>
              <Text style={tw`font-medium`}>{partner?.fullname}</Text>
              <Text style={tw`text-grayscale-gray text-12px`}>{partner?.description}</Text>
            </View>
          </View>
          <CallSVG />
        </View>
      </View>
      <Space size={6} backgroundColor={tw.color('grayscale-border')} /> */}
        <View style={tw`p-16px`}>
          <View>
            <Text style={tw`font-semibold`}>KHÁCH HÀNG</Text>
          </View>
          <Space size={16} />
          <View style={tw` flex-row items-center p-3 border border-grayscale-border`}>
            <View style={tw`flex-row items-center flex-1`}>
              <View>
                <Image
                  source={{ uri: user?.avatar?.fullThumbUrl ?? '' }}
                  style={tw`w-40px h-40px rounded-full flex-shrink-0`}
                  resizeMode="cover"
                />
                <View
                  style={tw`-bottom-5px flex-row absolute items-center self-center bg-white px-4px py-1px rounded-full`}
                >
                  <StarSVG />
                  <Space size={4} horizontal />
                  <Text style={tw`font-semibold text-12px`}>{user?.star?.toFixed?.(1)}</Text>
                </View>
              </View>
              <Space horizontal size={12} />
              <View>
                <Text style={tw`font-medium`}>{user?.fullname}</Text>
                <Text style={tw`text-grayscale-gray text-12px`}>{user?.phone}</Text>
              </View>
            </View>
            <CallButton phone={user?.phone} />
          </View>
        </View>
        <Space size={6} backgroundColor={tw.color('grayscale-border')} />
        <View style={tw`p-16px`}>
          <RowInfo title={'Mã yêu cầu'} value={code as string} />
          <RowInfo title={'Thời gian đặt'} value={dayjs(createdAt).format('DD/MM/YYYY HH:mm')} />
          {status === BookingStatusEnum.CANCEL && (
            <>
              <RowInfo title={'Thời gian hủy'} value={dayjs(statusDetail?.createdAt).format('DD/MM/YYYY HH:mm')} />
              <RowInfo
                title={'Người hủy'}
                value={
                  statusDetail?.userId
                    ? 'Khách hàng'
                    : statusDetail?.partnerId === technicianId
                    ? 'Kỹ thuật viên'
                    : 'Đơn vị sửa chữa'
                }
              />
              <RowInfo
                title={'Lý do hủy'}
                value={statusDetail?.reasons?.map?.((e: CategoryEntity) => e?.name)?.join?.() as string}
                moreValue={statusDetail?.note as string}
              />
            </>
          )}
          <Space size={52} />
        </View>
      </ScrollView>
      <View style={tw`p-16px pb-${bottom + 16}px`}>
        <ButtonSection booking={data.partnerBooking as BookingEntity} screen="DETAIL" onReceipt={onReceipt} />
      </View>
    </View>
  );
});

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
