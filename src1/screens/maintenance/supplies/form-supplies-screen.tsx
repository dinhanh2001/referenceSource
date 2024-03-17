import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, FieldFormSuplies, VehicleSupplies, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { useCreateMaintenanceMutation } from '../../../graphql/mutations/createMaintenance.generated';
import { useUserGetVehicleTypeCategoryQuery } from '../../../graphql/queries/userGetVehicleTypeCategory.generated';
import {
  CreateMaintenanceInput,
  MaintenanceLevelEnum,
  MaintenancesAccessoryEntity,
} from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useRefreshByUser } from '../../../hooks';
import { Sent } from '../../../svg';

import { FormSuppliesNavigationProp, FormSuppliesRouteProp } from './type';

type AccessoryType = {
  accessoryId: string;
  isAvailable: boolean;
};

export const MaintenanceFormSuppliesScreen = () => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<FormSuppliesNavigationProp>();
  const {
    params: { formData, vehicle, operatingNumber, vehicleTypeId, modelId },
  } = useRoute<FormSuppliesRouteProp>();

  const [accessories, setAccessories] = useState<AccessoryType[]>();

  const [createMaintenance, { loading: loadingCreate }] = useCreateMaintenanceMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        icon: <Sent />,
        title: 'Tạo bảo dưỡng thành công',
        message: '',
        type: 'ALERT',
      });

      if (res) {
        navigation.pop(2);
      }
    },
  });

  const { data, loading, refetch } = useUserGetVehicleTypeCategoryQuery({
    variables: {
      input: {
        operatingNumber,
        vehicleTypeId,
        modelId,
      },
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useEffect(() => {
    if (!accessories && !!data?.userGetVehicleTypeCategory?.maintenanceAcessories?.length) {
      setAccessories(
        data?.userGetVehicleTypeCategory?.maintenanceAcessories?.map?.((item) => {
          return {
            accessoryId: item?.id,
            isAvailable: false,
          };
        }),
      );
    }
  }, [accessories, data?.userGetVehicleTypeCategory]);

  const onChangeAccessory = useCallback((id: string, val: boolean) => {
    setAccessories((p: any) => {
      const clone = [...p];
      const index = clone.findIndex((item: AccessoryType) => item?.accessoryId === id);
      clone[index].isAvailable = val;
      return clone;
    });
  }, []);

  const renderAccessories = useCallback(
    (item: MaintenancesAccessoryEntity, index: number) => {
      const selected = accessories?.find?.((accessory: AccessoryType) => accessory?.accessoryId === item?.id);

      return (
        <FieldFormSuplies
          key={item?.id}
          item={item}
          index={index}
          value={selected?.isAvailable}
          onChange={onChangeAccessory}
        />
      );
    },
    [accessories, onChangeAccessory],
  );

  const onSubmit = useCallback(() => {
    const { vehicleId, address, addressDetail, date, level, note } = formData || {};
    const input: CreateMaintenanceInput = {
      vehicleId,
      isActive: true,
      mapAddress: address?.mapAddress as string,
      latitude: address?.lat as number,
      longitude: address?.lng as number,
      addressMoreInfo: addressDetail?.trim?.(),
      startDate: dayjs(date?.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      endDate: dayjs(date?.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      maintenanceLevel: level?.maintenanceLevel as MaintenanceLevelEnum,
      vehicleTypeCategoryId: level?.vehicleTypeCategoryId,
      note: note?.trim?.(),
      accessories: accessories,
    };

    createMaintenance({
      variables: {
        input,
      },
    });
  }, [accessories, createMaintenance, formData]);

  if (loading && !data?.userGetVehicleTypeCategory) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        <VehicleSupplies vehicle={vehicle} operatingNumber={operatingNumber} />
        {data?.userGetVehicleTypeCategory?.maintenanceAcessories?.map?.((item, index) =>
          renderAccessories(item as MaintenancesAccessoryEntity, index),
        )}
      </ScrollView>
      <Button title={'Xác nhận'} containerStyle={tw`m-4`} onPress={onSubmit} loading={loadingCreate} />
    </SafeAreaView>
  );
};
