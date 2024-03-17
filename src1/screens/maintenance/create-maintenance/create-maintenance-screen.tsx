import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddressGroupInput, AppHeader, DateInput, TextArea, TextInput, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useOverlay } from '../../../contexts';
import { useCreateMaintenanceMutation } from '../../../graphql/mutations/createMaintenance.generated';
import {
  CreateMaintenanceInput,
  MaintenanceLevelEnum,
  StatusEnum,
  VechicleTypeCategoryEntity,
  VehicleEntity,
} from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { ArrowDown, ArrowRight, Sent } from '../../../svg';
import { useUserGetVehicleTypeCategoriesQuery } from '../../../graphql/queries/userGetVehicleTypeCategories.generated';

import { CreateMaintenanceForm, schemaCreateMaintenance } from './schema';
import { ECreateMaintenanceNavigationProp } from './type';

export const CreateMaintenanceScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { showDialog } = useOverlay();
  const navigation = useNavigation<ECreateMaintenanceNavigationProp>();

  const [createMaintenance, { loading }] = useCreateMaintenanceMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        icon: <Sent />,
        title: 'Tạo bảo dưỡng thành công',
        message: '',
        type: 'ALERT',
      });

      if (res) {
        navigation.goBack();
      }
    },
  });

  const {
    trigger,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMaintenanceForm>({
    resolver: zodResolver(schemaCreateMaintenance),
  });

  const [vehicle, setVehicle] = useState<VehicleEntity>();
  const [operatingNumber, setOperatingNumber] = useState<number>();
  const [vehicleTypeId, setVehicleTypeId] = useState<string>();
  const [modelId, setModelId] = useState<string>();

  const { data: dataVehicleType } = useUserGetVehicleTypeCategoriesQuery({
    variables: {
      input: {
        vehicleTypeId: vehicle?.vehicleType?.id as string,
        modelId: vehicle?.model?.id as string,
      },
    },
  });

  const quickAddVehicleDataWatch = watch('quickAddVehicleData');
  const vehicleTypeCategoryIdWatch = watch('level.vehicleTypeCategoryId');

  const errorLevel = useMemo(
    () => errors?.level?.maintenanceLevel?.message,
    [errors?.level?.maintenanceLevel?.message],
  );
  const errorRoutine = useMemo(
    () => errors?.level?.vehicleTypeCategoryId?.message,
    [errors?.level?.vehicleTypeCategoryId?.message],
  );

  const onChooseVehicleType = useCallback(
    (vehicleTypeCategory: VechicleTypeCategoryEntity) => () => {
      setValue('level.vehicleTypeCategoryId', vehicleTypeCategory?.id);
      setOperatingNumber(vehicleTypeCategory?.operatingNumber);
      setVehicleTypeId(vehicleTypeCategory?.vehicleTypeId);
      setModelId(vehicleTypeCategory?.model?.id);
      trigger('level.vehicleTypeCategoryId');
    },
    [setValue, trigger],
  );

  const onSubmit = useCallback(
    (formData: CreateMaintenanceForm) => {
      if (formData?.level?.maintenanceLevel === MaintenanceLevelEnum.INCURRED) {
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
          vehicleTypeCategoryId: undefined,
          note: note?.trim?.(),
          accessories: [],
        };

        createMaintenance({
          variables: {
            input,
          },
        });
      } else {
        navigation.navigate('maintenance/form-supplies', {
          formData,
          vehicle: vehicle as VehicleEntity,
          operatingNumber: operatingNumber as number,
          vehicleTypeId: vehicleTypeId as string,
          modelId: modelId as string,
        });
      }
    },
    [createMaintenance, modelId, navigation, operatingNumber, vehicle, vehicleTypeId],
  );

  const renderVehicleTypeOption = useCallback(
    (value: VechicleTypeCategoryEntity) => {
      const selected = vehicleTypeCategoryIdWatch === value?.id;

      return (
        <TouchableOpacity
          key={value?.id}
          style={tw`flex-row items-center gap-3 bg-grayscale-bg rounded-1 p-3 mt-3`}
          onPress={onChooseVehicleType(value)}
        >
          <View
            style={tw`w-5 h-5 border border-${
              selected ? 'primary' : 'grayscale-gray'
            } rounded-full items-center justify-center`}
          >
            {selected && <View style={tw`w-10px h-10px bg-primary rounded-full`} />}
          </View>
          <View style={tw`flex-1`}>
            <Text>{`Giờ vận hành: ${value?.operatingNumber} giờ`}</Text>
            {/* <Text>{`Bảo dưỡng lần ${value}`}</Text> */}
            {/* {currentRoutineLevel + 1 === value && (
              <Text style={tw`mt-2px text-grayscale-gray text-3`}>Kỳ hiện tại</Text>
            )} */}
          </View>
          <ArrowRight />
        </TouchableOpacity>
      );
    },
    [onChooseVehicleType, vehicleTypeCategoryIdWatch],
  );

  const renderLevelOption = useCallback(
    (val: string, onChange: (v: string) => void) =>
      ({ label, value }: OptionType) => {
        const selected = val === value;
        const isRoutine = value === MaintenanceLevelEnum.ROUTINE;
        // const currentRoutineLevel: number = dataCurrentRoutine?.currentRoutineLevel || 0;

        // if (isRoutine && currentRoutineLevel === 20) {
        //   return null;
        // }

        return (
          <TouchableOpacity
            key={value}
            style={tw`mt-3 border px-4 py-14px border-[#EEE] rounded-1 `}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              onChange(value);
              if (!isRoutine) {
                setValue('level.vehicleTypeCategoryId', '');
              }
            }}
          >
            <View style={tw`flex-row gap-3 items-center`}>
              <View
                style={tw`w-5 h-5 border border-${
                  selected ? 'primary' : 'grayscale-gray'
                } rounded-full items-center justify-center`}
              >
                {selected && <View style={tw`w-10px h-10px bg-primary rounded-full`} />}
              </View>
              <Text style={tw`text-14px text-grayscale-black font-medium`}>{label}</Text>
            </View>

            {selected && isRoutine && (
              <View style={tw`mt-3`}>
                <Space size={1} backgroundColor={'#EEE'} />
                {dataVehicleType?.userGetVehicleTypeCategories?.map?.((item) =>
                  renderVehicleTypeOption(item as VechicleTypeCategoryEntity),
                )}
                {errorRoutine != null && <Text style={tw`text-error text-12px -mt-8px`}>{errorRoutine}</Text>}
              </View>
            )}
          </TouchableOpacity>
        );
      },
    [dataVehicleType?.userGetVehicleTypeCategories, errorRoutine, renderVehicleTypeOption, setValue],
  );

  return (
    <View style={tw`flex-1 bg-primary`}>
      <SafeAreaView edges={['top']} style={tw`flex-1`}>
        <AppHeader title="Đặt lịch bảo dưỡng" />
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`h-42px absolute w-full bg-primary`} />
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={tw`h-42px bg-transparent`} />
            <View style={tw`-mt-30px bg-white shadow-md p-4 rounded-1 mx-4`}>
              <Text style={tw`text-17px font-semibold text-grayscale-black`}>Xe cần bảo dưỡng</Text>
              <Text style={tw`text-grayscale-black font-medium mt-4 mb-2`}>
                <Text style={tw`text-error`}>* </Text>Tên xe
              </Text>
              <Controller
                control={control}
                name="vehicleId"
                render={({ field: { onChange } }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('repair-request/select-car', {
                        isActive: StatusEnum.ACTIVE,
                        title: 'Chọn xe cần bảo dưỡng',
                        excludes: {
                          excludeActiveMaintenance: true,
                        },
                        selectedVehicle: vehicle,
                        quickAddData: quickAddVehicleDataWatch,
                        textEmpty: '',
                        hideQuickAdd: true,
                        onSelect: (item) => {
                          setVehicle(item);
                          onChange(item.id);
                          setValue('quickAddVehicleData', undefined);
                        },
                        onQuickAddVehicle: (quickAddData) => {
                          onChange(quickAddData.name);
                          setValue('quickAddVehicleData', quickAddData);
                        },
                      })
                    }
                  >
                    <View pointerEvents="none">
                      <TextInput
                        placeholder="Chọn xe"
                        value={vehicle?.name ?? quickAddVehicleDataWatch?.name}
                        rightIcon={<ArrowDown />}
                        errorMessage={errors.vehicleId?.message}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <AddressGroupInput control={control as any} errors={errors} trigger={trigger as any} label="Vị trí xe" />
            </View>

            <View style={tw`mt-2 pt-3 px-4 bg-white`}>
              <View>
                <Text style={tw`text-17px font-semibold text-grayscale-black`}>Khoảng thời gian đặt lịch</Text>
                <View style={tw`flex-row mt-4`}>
                  <Controller
                    name="date.startDate"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <DateInput
                        isRequiredField
                        value={value}
                        onDateChange={(d) => {
                          onChange(d);
                          trigger('date.startDate');
                          trigger('date.endDate');
                        }}
                        onBlur={onBlur}
                        containerStyle={tw`flex-1`}
                        label="Từ ngày"
                        errorMessage={errors?.date?.startDate?.message}
                      />
                    )}
                  />
                  <Space horizontal size={16} />
                  <Controller
                    name="date.endDate"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <DateInput
                        isRequiredField
                        value={value}
                        onDateChange={(d) => {
                          onChange(d);
                          trigger('date.startDate');
                          trigger('date.endDate');
                        }}
                        onBlur={onBlur}
                        containerStyle={tw`flex-1`}
                        label="Đến ngày"
                        errorMessage={errors?.date?.endDate?.message}
                      />
                    )}
                  />
                </View>
              </View>

              <Space size={4} backgroundColor={'#EEE'} style={tw`-mx-4 my-5`} />

              <View>
                <Text style={tw`text-17px font-semibold text-grayscale-black`}>
                  <Text style={tw`text-error`}>* </Text>Chọn mốc bảo dưỡng
                </Text>
                <Controller
                  name="level.maintenanceLevel"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View pointerEvents={vehicle ? 'auto' : 'none'}>
                      {levelOptions?.map?.(renderLevelOption(value, onChange))}
                    </View>
                  )}
                />
                {errorLevel != null && <Text style={tw`text-error text-12px mt-8px`}>{errorLevel}</Text>}
              </View>

              <Space size={4} backgroundColor={'#EEE'} style={tw`-mx-4 my-5`} />

              <View style={tw`mb-5`}>
                <Text style={tw`text-14px text-grayscale-black font-medium mb-2`}>Ghi chú</Text>
                <Controller
                  control={control}
                  name="note"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextArea
                      placeholder="Nhập ghi chú..."
                      multiline
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>

          <Button
            title={'Tiếp theo'}
            containerStyle={tw`p-4 pt-2 mb-${bottom}px`}
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

type OptionType = {
  value: string;
  label: string;
};

const levelOptions = [
  {
    value: MaintenanceLevelEnum.ROUTINE,
    label: 'Bảo dưỡng định kỳ',
  },
  {
    value: MaintenanceLevelEnum.INCURRED,
    label: 'Bảo dưỡng phát sinh',
  },
];
