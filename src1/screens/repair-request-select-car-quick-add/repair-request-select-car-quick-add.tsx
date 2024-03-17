import { memo, useCallback } from 'react';
import { Button } from '@rneui/themed';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AddressGroupFormState, AddressGroupInput, AppHeader, Screen, TextInput, tw } from '../../components';
import { CloseSvg } from '../../svg';
import { validationMessage } from '../../constants';
import { useOverlay } from '../../contexts';
import { RepairStackNavigatorParamList } from '../../navigator-params/repair-stack-navigator';

type FormData = AddressGroupFormState & {
  vehicleName: string;
};

const schema: z.ZodType<FormData> = z.object({
  vehicleName: z.string({
    required_error: validationMessage.required,
  }),
  address: z.object(
    {
      lat: z.number(),
      lng: z.number(),
      mapAddress: z.string(),
    },
    { required_error: validationMessage.required },
  ),
  addressDetail: z.string({ required_error: validationMessage.required }),
});

export const RepairRequestSelectCardQuickAddInfoFormScreen = memo(() => {
  const {
    params: { onQuickAddVehicle, quickAddData },
  } = useRoute<RouteProp<RepairStackNavigatorParamList, 'repair-request/select-car/quick-add'>>();

  const navigation = useNavigation<StackNavigationProp<RepairStackNavigatorParamList>>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: quickAddData
      ? {
          address: {
            lat: quickAddData.latitude,
            lng: quickAddData.longitude,
            mapAddress: quickAddData.mapAddress ?? '',
          },
          addressDetail: quickAddData.addressMoreInfo ?? '',
          vehicleName: quickAddData.name,
        }
      : undefined,
  });

  const { showDialog } = useOverlay();

  const handleSubmitFailure = useCallback(() => {
    showDialog({
      type: 'ALERT',
      title: 'Submit thất bại',
      message: 'Vui lòng kiểm tra lại thông tin',
    });
  }, [showDialog]);

  const handleSubmitSuccess = useCallback(
    async (data: FormData) => {
      const res = await showDialog({
        type: 'CONFIRM',
        title: 'Bạn có muốn lưu lại thông tin xe này?',
        message: 'Khi bấm nút “Không lưu”, mọi thông tin bạn nhập sẽ không được lưu lại.',
        confirmText: 'Lưu lại',
        cancelText: 'Không lưu',
      });

      onQuickAddVehicle({
        hidden: res,
        latitude: data.address.lat,
        longitude: data.address.lng,
        name: data.vehicleName,
        addressMoreInfo: data.addressDetail,
        mapAddress: data.address.mapAddress,
      });

      navigation.pop(2);
    },
    [navigation, onQuickAddVehicle, showDialog],
  );

  return (
    <Screen style={tw`flex-1 justify-between`} edges={['top', 'bottom']}>
      <AppHeader title="Thêm xe" leftIcon={<CloseSvg width={24} height={24} />} />

      <View style={tw`flex-1 p-16px justify-between`}>
        <View>
          <Controller
            name="vehicleName"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Tên xe"
                required
                maxLength={255}
                placeholder="Nhập tên xe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.vehicleName?.message}
              />
            )}
          />

          <AddressGroupInput control={control as any} errors={errors} label="Vị trí xe" />
        </View>
        <Button onPress={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>Hoàn tất</Button>
      </View>
    </Screen>
  );
});
