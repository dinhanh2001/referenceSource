import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, tw } from '../../components';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { BookingEntity, PartnerEntity, VehicleEntity } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { ServiceSVG, UndoSVG } from '../../svg';
import { thousandSeparator } from '../../helpers';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

import { ContactView, IssueView, LocationIssue, SliderAccept, VehicleView } from './components';

type ScreenRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_REQUEST_PUSH_AGENCY>;

export const RepairRequestRequestPushTechnician = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

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
    console.log('rejected');
  }, []);

  const onAccept = useCallback(() => {
    console.log('accepted');
  }, []);

  const renderHeader = useMemo(
    () => (
      <View style={tw`flex-row items-center px-20px mt-10px`}>
        <ServiceSVG />
        <View style={tw`flex-1 ml-12px mr-16px`}>
          <Text style={tw`text-white text-13px font-medium mb-2px`}>Dịch vụ cứu hộ 911</Text>
          <Text style={tw`text-white text-12px `}>Điều phối bạn</Text>
        </View>
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
        <SliderAccept onAccept={onAccept} minute={5} onClose={onClose} />
        <Text style={tw`opacity-40 text-white text-center mt-4px`}>Vuốt sang phải để nhận yêu cầu</Text>
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
