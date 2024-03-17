import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, tw } from '../../components';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { BookingEntity, PartnerEntity, PartnerTypeEnum, VehicleEntity } from '../../graphql/type.interface';
import { showFlashMessageError, thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { UndoSVG } from '../../svg';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { useAuth, useFullScreenLoading, useOverlay } from '../../contexts';
import { useTechnicianArrivingBookingMutation } from '../../graphql/mutations/technicianArrivingBooking.generated';

import { ContactView, IssueView, LocationIssue, SliderAccept, VehicleView } from './components';

type ScreenRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_REQUEST_PUSH_AGENCY>;

export const RepairRequestRequestPushAgencyScreen = () => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const route = useRoute<ScreenRouteProp>();

  const { partner } = useAuth();

  const { bookingId } = route.params || {};

  const { data, loading, refetch } = usePartnerBookingQuery({
    variables: {
      id: bookingId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { transportFee, transportDistance, user, addressMoreInfo, mapAddress, vehicle } = data?.partnerBooking || {};

  const onClose = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const onReject = useCallback(() => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_CANCEL_REQUEST, {
      bookingId,
      onComplete: onClose,
    });
  }, [bookingId, navigation, onClose]);

  const [arrivingAsync, { loading: arrivingLoading }] = useTechnicianArrivingBookingMutation({
    onError: showFlashMessageError,
    onCompleted: onClose,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(arrivingLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivingLoading]);

  const { showDialog } = useOverlay();

  const onAccept = useCallback(async () => {
    if (partner?.type === PartnerTypeEnum.AGENCY) {
      navigation.navigate(AppRoutes.REPAIR_REQUEST_AGENCY_ASSIGN_TECHNICIAN, { bookingId, onCompleted: onClose });
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
              bookingId,
            },
          },
        });
      } else {
        navigation.navigate(AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST, {
          bookingId,
          onCompleted: () => navigation.goBack(),
        });
      }
    }
  }, [arrivingAsync, bookingId, navigation, onClose, partner?.type, showDialog]);

  const renderHeader = useMemo(
    () => (
      <View style={tw`flex-row items-center px-20px mt-10px`}>
        <View style={tw`flex-1`} />
        <TouchableOpacity onPress={onClose}>
          <Text style={tw`text-border font-semibold`}>Đóng</Text>
        </TouchableOpacity>
      </View>
    ),
    [onClose],
  );

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <ScrollView refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}>
        <View style={tw`mt-22px`}>
          <Text style={tw`text-center text-white`}>Yêu cầu sửa chữa</Text>
          <Text style={tw`text-center text-white text-19px font-semibold mt-4px`}>
            {`${transportDistance || 0} KM - ${thousandSeparator(transportFee || 0)} đ`}
          </Text>

          <View style={tw`mt-28px px-16px border-b-4 border-white border-opacity-10 pb-20px`}>
            <ContactView partner={user as PartnerEntity} />
            <LocationIssue
              containerStyle={tw`mt-16px`}
              mapAddress={mapAddress as string}
              addressMoreInfo={addressMoreInfo as string}
            />
          </View>

          <View style={tw`mt-20px mx-16px`}>
            <VehicleView item={vehicle as VehicleEntity} />
            <IssueView booking={data?.partnerBooking as BookingEntity} containerStyle={tw`mt-16px`} />
          </View>
        </View>
      </ScrollView>
    );
  }, [
    addressMoreInfo,
    data?.partnerBooking,
    isRefetchingByUser,
    loading,
    mapAddress,
    refetchByUser,
    transportDistance,
    transportFee,
    user,
    vehicle,
  ]);

  const renderBottom = useMemo(() => {
    return (
      <View style={tw`px-16px py-12px`}>
        <Button
          icon={<UndoSVG />}
          title={'Từ chối yêu cầu'}
          buttonStyle={tw`bg-error`}
          onPress={onReject}
          titleStyle={tw`text-white font-semibold mx-8px`}
        />
        <SliderAccept onAccept={onAccept} minute={15} onClose={onClose} />
        <Text style={tw`opacity-40 text-white text-center mt-12px`}>Vuốt sang phải để nhận yêu cầu</Text>
      </View>
    );
  }, [onAccept, onClose, onReject]);

  return (
    <View style={tw`flex-1 bg-grayscale-black`}>
      <SafeAreaView style={tw`flex-1`}>
        {renderHeader}
        {renderContent}
        {renderBottom}
      </SafeAreaView>
    </View>
  );
};
