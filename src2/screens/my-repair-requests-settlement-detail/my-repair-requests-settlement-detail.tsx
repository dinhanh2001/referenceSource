import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { client } from '../../apollo/apollo';
import { ActivityIndicator, AppHeader, tw } from '../../components';
import { Table } from '../../components/table';
import { useOverlay } from '../../contexts';
import { useUserAcceptSettlementMutation } from '../../graphql/mutations/userAcceptSettlement.generated';
import { BookingDocument } from '../../graphql/queries/booking.generated';
import { useUserGetLatestSettlementOfBookingQuery } from '../../graphql/queries/userGetLatestSettlementOfBooking.generated';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorParamList, AppStackNavigatorScreenProps } from '../../navigator-params';
import { ArrowDown, ArrowUp, Sent } from '../../svg';
import { OPERATING_UNIT, thousandSeparator } from '../../utils';

type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const MyRepairRequestsSettlementDetail = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<AppStackNavigatorScreenProps<'my-repair-requests/settlement-detail'>['route']>();
  const { bookingId } = route?.params || {};
  const { showDialog } = useOverlay();

  const { data, loading, refetch } = useUserGetLatestSettlementOfBookingQuery({ variables: { bookingId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const { id } = data?.userGetLatestSettlementOfBooking || {};

  const [collapsed, setCollapsed] = useState(true);

  const [acceptSettlement, { loading: loadingAccept }] = useUserAcceptSettlementMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        icon: <Sent />,
        title: 'Chấp nhận quyết toán thành công',
        message: `Bạn đã đồng ý quyết toán`,
        confirmText: 'Về trang chi tiết',
        type: 'ALERT',
        columnAction: true,
      });

      if (res) {
        client.refetchQueries({
          include: [BookingDocument],
        });
        navigation.goBack();
      }
    },
  });

  const onToggleCollapse = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed((p) => !p);
  }, []);

  const onSubmit = useCallback(() => {
    //submit
    acceptSettlement({
      variables: {
        settlementId: id || '',
      },
    });
  }, [acceptSettlement, id]);

  const onReSettlement = useCallback(() => {
    navigation.navigate('my-repair-requests/re-settlement-reason', { settlementId: id as string });
  }, [navigation, id]);

  const renderContent = useMemo(() => {
    const { booking, quotation, additionalFees } = data?.userGetLatestSettlementOfBooking || {};
    const {
      operatingUnit,
      operatingNumber,
      diagnosisFee,
      diagnostics,
      diagnosisNote,
      estimatedCompleteAt,
      accessories,
      transportFee,
      repairFee,
      total,
    } = quotation || {};
    const { code, createdAt, user, vehicle, status } = booking || {};
    const isSettleRequested = status === BookingStatusEnum.SETTLEMENT_REQUESTED;

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <ScrollView
          stickyHeaderIndices={[0]}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        >
          <View>
            <View style={tw`p-4 justify-center items-center bg-white`}>
              <Text style={tw`font-bold text-14px`}>{code}</Text>
              <Text style={tw`text-12px text-grayscale-gray`}>
                Đặt lúc: {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>
            <View style={tw`h-6px w-full bg-grayscale-border`} />
          </View>
          <View style={tw`p-4`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-14px font-bold `}>{'I. THông tin chung'.toLocaleUpperCase()}</Text>
              <TouchableOpacity hitSlop={20} onPress={onToggleCollapse}>
                {collapsed ? <ArrowUp /> : <ArrowDown />}
              </TouchableOpacity>
            </View>
            {collapsed && (
              <View>
                <Text style={tw`text-14px font-bold mt-16px mb-12px`}>{'1. Thông tin khách hàng'}</Text>
                <Table data={[{ 'Họ và tên': user?.fullname }, { 'Số điện thoại': user?.phone }]} />

                <Text style={tw`text-14px font-bold mt-16px mb-12px`}>{'2. Thông tin xe gặp sự cố'}</Text>
                <Table
                  data={[
                    { 'Tên xe': vehicle?.name },
                    { 'Biển kiểm soát': vehicle?.vinNumber },
                    { 'Vị trí xe': `${vehicle?.addressMoreInfo} ${vehicle?.mapAddress}` },
                  ]}
                />

                <Text style={tw`text-14px font-bold mt-16px mb-12px`}>{'3. Chẩn đoán'}</Text>
                <Table
                  data={[
                    { 'Đã vận hành': `${operatingNumber} ${OPERATING_UNIT?.[operatingUnit || '']}` },
                    diagnostics?.map?.((item) => ({ [item?.diagnosticCode]: `${thousandSeparator(item?.expense)} đ` })),
                    { 'Ghi chú': diagnosisNote },
                    { 'Dự kiến thời gian hoàn thành': dayjs(estimatedCompleteAt).format('DD/MM/YYYY') },
                  ].flat()}
                />
              </View>
            )}
          </View>
          <View style={tw`w-full h-6px bg-grayscale-border`} />
          <View style={tw`p-4`}>
            <Text style={tw`text-14px font-bold`}>{'II. THông tin Chi Phí'.toLocaleUpperCase()}</Text>
            <Text style={tw`text-14px font-bold my-3`}>{'1. Vật tư phụ tùng'}</Text>
            <Table
              right
              data={accessories?.map?.((item: any) => ({
                [item?.name]: `${thousandSeparator(item?.unitPrice)} đ`,
                moreInfo: `x${item?.quantity} ${item?.unit}`,
              }))}
            />
            <Text style={tw`text-14px font-bold my-3`}>{'2. Chi phí công dịch vụ'}</Text>
            <Table
              right
              data={[
                { 'Phí di chuyển': `${thousandSeparator(transportFee || 0)} đ` },
                { 'Phí chẩn đoán': `${thousandSeparator(diagnosisFee || 0)} đ` },
                { 'Phí sửa chữa, thay thế': `${thousandSeparator(repairFee || 0)} đ` },
              ]}
            />

            {!!additionalFees?.length && (
              <>
                <Text style={tw`text-14px font-bold my-3`}>{'3. Chi phí phát sinh'}</Text>
                <Table
                  right
                  data={additionalFees?.map?.((item) => ({
                    [item?.name]: `${thousandSeparator(item?.amount)} đ`,
                  }))}
                />
              </>
            )}
          </View>
        </ScrollView>
        <View style={tw`p-4 border-t border-grayscale-border`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-13px`}>Tổng quyết toán</Text>
            <Text style={tw`text-17px font-bold`}>{thousandSeparator(total || 0)}</Text>
          </View>
          {isSettleRequested && (
            <View style={tw`mt-3 w-full gap-2`}>
              <Button
                title={'Yêu cầu quyết toán lại'}
                type="outline"
                onPress={onReSettlement}
                buttonStyle={tw`border-grayscale-disabled`}
              />
              <Button title={'Chấp thuận quyết toán'} onPress={onSubmit} loading={loadingAccept} />
            </View>
          )}
        </View>
      </>
    );
  }, [
    collapsed,
    data?.userGetLatestSettlementOfBooking,
    isRefetchingByUser,
    loading,
    loadingAccept,
    onReSettlement,
    onSubmit,
    onToggleCollapse,
    refetchByUser,
  ]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="#QT12345678" />
      {/* {isSettleRequested && (
        <View style={tw`px-4 py-3 bg-primary-light flex-row items-center mb-4`}>
          <MegaphoneSvg fill={'#202C38'} />
          <Pressable>
            <Text style={tw`text-3 ml-3`}>
              Thêm 01 chi phí phát sinh. <Text style={[tw`font-bold underline`]}>Xem chi tiết</Text>
            </Text>
          </Pressable>
        </View>
      )} */}
      {renderContent}
    </SafeAreaView>
  );
};
