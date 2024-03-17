import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  BannerMaintenance,
  DateMaintenance,
  MaintenanceInfo,
  RoutineMaintenance,
  VehicleMaintenance,
  tw,
} from '../../../components';
import { Space } from '../../../components/spacer';
import { useMaintenanceQuery } from '../../../graphql/queries/maintenance.generated';
import {
  MaintenanceAccessoryEntity,
  MaintenanceEntity,
  MaintenanceLevelEnum,
  MaintenanceStatusEnum,
  MaintenancesAccessoryEntity,
  VehicleEntity,
} from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { MaintenanceDetailNavigationProps, MaintenanceDetailRouteProps } from './type';

export const MaintenanceDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<MaintenanceDetailNavigationProps>();
  const {
    params: { maintenanceId },
  } = useRoute<MaintenanceDetailRouteProps>();

  const { data, loading, refetch } = useMaintenanceQuery({
    variables: {
      id: maintenanceId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const {
    vehicle,
    status,
    addressMoreInfo,
    mapAddress,
    startDate,
    endDate,
    maintenanceLevel,
    vehicleTypeCategory,
    accessories_available,
  } = data?.maintenance || {};
  // const showPartnent = status === MaintenanceStatusEnum.ACCEPTED;
  const isRoutine = maintenanceLevel === MaintenanceLevelEnum.ROUTINE;
  const showCancel = MaintenanceStatusEnum.NEW === status;

  const onCancel = useCallback(() => {
    navigation.navigate('maintenance/cancel', { maintenanceId });
  }, [maintenanceId, navigation]);

  if (loading && !data?.maintenance) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        <BannerMaintenance status={status as MaintenanceStatusEnum} />

        <View style={tw`m-4`}>
          <Text style={tw`uppercase font-semibold`}>Xe Cần Bảo dưỡng</Text>
          <VehicleMaintenance
            containerStyle={tw`mt-4`}
            vehicle={vehicle as VehicleEntity}
            address={`${addressMoreInfo} ${mapAddress}`}
          />

          <Space size={6} backgroundColor={'#EEE'} style={tw`-mx-4 my-5`} />
          {isRoutine ? (
            <RoutineMaintenance
              accessories={vehicleTypeCategory?.maintenanceAcessories as MaintenancesAccessoryEntity[]}
              operatingNumber={vehicleTypeCategory?.operatingNumber as number}
              available={accessories_available as MaintenanceAccessoryEntity[]}
            />
          ) : (
            <>
              <Text style={tw`font-medium`}>Bảo dưỡng phát sinh</Text>
              <Text style={tw`text-3 text-grayscale-gray mt-2px`}>Hạng mục & vật tư bảo dưỡng</Text>
            </>
          )}

          <Space size={6} backgroundColor={'#EEE'} style={tw`-mx-4 my-5`} />

          <Text style={tw`uppercase font-semibold`}>Thời gian đặt lịch</Text>
          <View style={tw`flex-row mt-4`}>
            <DateMaintenance containerStyle={tw`flex-1`} title="Từ ngày" date={startDate} />
            <Space horizontal size={16} />
            <DateMaintenance containerStyle={tw`flex-1`} title="Đến ngày" date={endDate} />
          </View>

          <Space size={6} backgroundColor={'#EEE'} style={tw`-mx-4 my-5`} />

          <MaintenanceInfo maintenance={data?.maintenance as MaintenanceEntity} />
        </View>
      </ScrollView>
      {showCancel ? (
        <View style={tw`pb-${bottom + 20}px px-4 pt-2 shadow-md bg-white`}>
          <Button title={'Hủy yêu cầu'} onPress={onCancel} />
        </View>
      ) : (
        <View style={tw`h-${bottom + 20}px`} />
      )}
    </View>
  );
};
