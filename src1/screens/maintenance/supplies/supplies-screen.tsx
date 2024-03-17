import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, FieldSupplies, VehicleSupplies, tw } from '../../../components';
import { useMaintenanceQuery } from '../../../graphql/queries/maintenance.generated';
import {
  MaintenanceAccessoryEntity,
  MaintenancesAccessoryEntity,
  VehicleEntity,
} from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { SuppliesRouteProp } from './type';

export const MaintenanceSuppliesScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { maintenanceId },
  } = useRoute<SuppliesRouteProp>();

  const { data, loading, refetch } = useMaintenanceQuery({
    variables: {
      id: maintenanceId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { vehicle, maintenanceLevel, accessories_available, vehicleTypeCategory } = data?.maintenance || {};

  const renderAccessory = useCallback(
    (item: MaintenancesAccessoryEntity, index: number) => {
      return (
        <FieldSupplies
          item={item}
          key={item?.id}
          index={index}
          available={accessories_available as MaintenanceAccessoryEntity[]}
        />
      );
    },
    [accessories_available],
  );

  if (loading && !data?.maintenance) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      style={tw`pb-${bottom + 20}px`}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      <VehicleSupplies
        maintenanceLevel={maintenanceLevel}
        vehicle={vehicle as VehicleEntity}
        operatingNumber={vehicleTypeCategory?.operatingNumber as number}
      />

      {vehicleTypeCategory?.maintenanceAcessories?.map?.(renderAccessory)}
    </ScrollView>
  );
};
