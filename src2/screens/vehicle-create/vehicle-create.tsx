import { zodResolver } from '@hookform/resolvers/zod';
import {
  CommonActions,
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as zod from 'zod';

import { AddressGroupInput, AppHeader, GridSelect, ListSelect, TextArea, TextInput, tw } from '../../components';
import { validationMessage } from '../../constants';
import { FullScreenLoadingContext, useBottomAction, useOverlay } from '../../contexts';
import { useCreateVehicleMutation } from '../../graphql/mutations/createVehicle.generated';
import { useUpdateVehicleMutation } from '../../graphql/mutations/updateVehicle.generated';
import { useCheckSerialExistLazyQuery } from '../../graphql/queries/checkSerialExist.generated';
import { useCheckVehicleRegistrationPlateExistLazyQuery } from '../../graphql/queries/checkVehicleRegistrationPlateExist.generated';
import { useCheckVinExistLazyQuery } from '../../graphql/queries/checkVinExist.generated';
import { VehiclesDocument } from '../../graphql/queries/vehicles.generated';
import { CategoryEntity, CategoryTypeEnum, LatLng, OperatingUnitEnum } from '../../graphql/type.interface';
import { onLaunchCamera, onMediaImage, showFlashMessageError } from '../../helpers';
import { useUploadImage } from '../../hooks/use-upload-image';
import {
  AppStackNavigatorParamList,
  AppStackNavigatorScreenProps,
  RootNavigatorParamList,
} from '../../navigator-params';
import { DefaultCarAvatar, EditPenSvg, Sent } from '../../svg';

type FormData = {
  avatarUri: string;
  file?: ImagePicker.ImagePickerAsset | undefined;
  name: string;
  vehicleRegistrationPlate?: string;
  ordinalNumber?: string;
  vehicleType: Pick<CategoryEntity, 'id' | 'name'>;
  manufacturer: Pick<CategoryEntity, 'id' | 'name'>;
  model: Pick<CategoryEntity, 'id' | 'name'>;
  serialNumber?: string;
  vinNumber: string;
  origin: Pick<CategoryEntity, 'id' | 'name'>;
  yearOfManufacture: string;
  operatingNumber: string;
  operatingNumberUnit: string;
  address: LatLng & {
    mapAddress: string;
  };
  addressDetail?: string;
  detailVehicle?: string;
};

type ScreenNavigationProps = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AppStackNavigatorParamList>
>;

export const VehicleCreate = React.memo(() => {
  const navigation = useNavigation<ScreenNavigationProps>();

  const { params } = useRoute<AppStackNavigatorScreenProps<'vehicle-create'>['route']>();
  const { vehicle } = params ?? {};

  const { showActionDialog } = useBottomAction();
  const { showFullscreenLoading } = useContext(FullScreenLoadingContext);

  const categoryValidate = useMemo(
    () =>
      zod.object(
        {
          id: zod.string(),
          name: zod.string(),
        },
        { required_error: validationMessage.required },
      ),
    [],
  );

  const [checkRegistration, { loading: registrationLoading }] = useCheckVehicleRegistrationPlateExistLazyQuery();
  const [checkSerial, { loading: serialLoading }] = useCheckSerialExistLazyQuery();
  const [checkVin, { loading: vinLoading }] = useCheckVinExistLazyQuery();

  const validationSchema: zod.ZodType<FormData> = useMemo(
    () =>
      zod.object({
        name: zod.string({ required_error: 'Tên máy là trường bắt buộc' }).nonempty('Tên máy là trường bắt buộc'),
        avatarUri: zod
          .string({ required_error: 'Ảnh đại diện là trường bắt buộc' })
          .nonempty('Ảnh đại diện là trường bắt buộc'),
        file: zod.any().optional(),
        vehicleType: zod.object(
          {
            id: zod.string(),
            name: zod.string(),
          },
          { required_error: 'Chủng loại máy là trường bắt buộc' },
        ),
        manufacturer: zod.object(
          {
            id: zod.string(),
            name: zod.string(),
          },
          { required_error: 'Hãng sản xuất là trường bắt buộc' },
        ),
        model: zod.object(
          {
            id: zod.string(),
            name: zod.string(),
          },
          { required_error: 'Model là trường bắt buộc' },
        ),
        origin: categoryValidate,
        vinNumber: zod
          .string({ required_error: 'Số VIN là trường bắt buộc' })
          .nonempty('Số VIN là trường bắt buộc')
          .refine(
            async (data) =>
              data == null ||
              data.length === 0 ||
              !(
                await checkVin({
                  variables: {
                    serialNumber: data,
                    id: vehicle?.id,
                  },
                })
              ).data?.checkVinExist,
            'Số VIN đã tồn tại',
          ),
        operatingNumber: zod
          .string({ required_error: 'Số giờ/km đã vận hành là trường bắt buộc' })
          .nonempty('Số giờ/km đã vận hành là trường bắt buộc'),
        operatingNumberUnit: zod.string().nonempty(),
        address: zod.object(
          { mapAddress: zod.string().nonempty(), lat: zod.number(), lng: zod.number() },
          { required_error: 'Địa điểm đặt máy là trường bắt buộc' },
        ),
        addressDetail: zod
          .string({ required_error: 'Địa chỉ chi tiết là trường bắt buộc' })
          .nonempty('Địa chỉ chi tiết là trường bắt buộc'),
        yearOfManufacture: zod
          .string({ required_error: 'Năm sản xuất là trường bắt buộc' })
          .nonempty('Năm sản xuất là trường bắt buộc'),
        detailVehicle: zod.string().optional(),
        serialNumber: zod
          .string()
          .optional()
          .refine(async (data) => {
            return (
              data == null ||
              data.length === 0 ||
              !(
                await checkSerial({
                  variables: {
                    serialNumber: data,
                    id: vehicle?.id,
                  },
                })
              ).data?.checkSerialExist
            );
          }, 'Số serial đã tồn tại'),
        vehicleRegistrationPlate: zod
          .string()
          .optional()
          .refine(async (data) => {
            return (
              data == null ||
              data.length === 0 ||
              !(
                await checkRegistration({
                  variables: {
                    vehicleRegistrationPlate: data,
                    id: vehicle?.id,
                  },
                })
              ).data?.checkVehicleRegistrationPlateExist
            );
          }, 'Biển số đã tồn tại'),
        ordinalNumber: zod.string().optional(),
      }),
    [categoryValidate, checkRegistration, checkSerial, checkVin, vehicle?.id],
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: vehicle
      ? {
          name: vehicle.name,
          vehicleType: vehicle.vehicleType as CategoryEntity,
          manufacturer: vehicle.manufacturer as CategoryEntity,
          model: vehicle.model as CategoryEntity,
          origin: vehicle.origin as CategoryEntity,
          vinNumber: vehicle.vinNumber,
          address: {
            lat: vehicle.latitude,
            lng: vehicle.longitude,
            mapAddress: vehicle.mapAddress ?? undefined,
          },
          addressDetail: vehicle.addressMoreInfo ?? undefined,
          yearOfManufacture: vehicle.yearOfManufacture?.toString(),
          operatingNumberUnit: vehicle.operatingUnit === OperatingUnitEnum.KM ? 'KM' : 'Giờ',
          vehicleRegistrationPlate: vehicle.vehicleRegistrationPlate ?? undefined,
          ordinalNumber: vehicle.ordinalNumber?.toString(),
          serialNumber: vehicle.serialNumber ?? undefined,
          operatingNumber: vehicle.operatingNumber.toString(),
          detailVehicle: vehicle.detail ?? undefined,
          avatarUri: vehicle.avatar?.id ?? undefined,
        }
      : {
          operatingNumberUnit: 'Giờ',
        },
  });

  const { uploadImage } = useUploadImage();

  const [createVehicle] = useCreateVehicleMutation({ onError: showFlashMessageError });

  const [updateVehicle] = useUpdateVehicleMutation({
    onError: showFlashMessageError,
  });

  const { showDialog } = useOverlay();

  const handleChangeAvatar = useCallback(async () => {
    Keyboard.dismiss();

    try {
      const actions = [
        { key: 'pickPhoto', title: 'Chọn ảnh' },
        { key: 'takePhoto', title: 'Chụp ảnh' },
      ];
      const act = await showActionDialog({ title: 'Chọn hoặc chụp ảnh đại diện', actions });
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      };
      if (act === 'pickPhoto') {
        setTimeout(async () => {
          const result = await onMediaImage(options, showDialog);
          if (result && result.assets && result.assets[0]) {
            setValue('file', result.assets[0]);
            setValue('avatarUri', result.assets[0].uri);
            trigger('avatarUri');
          }
        }, 600);
      } else if (act === 'takePhoto') {
        setTimeout(async () => {
          const result = await onLaunchCamera(options, showDialog);
          if (result && result.assets && result.assets[0]) {
            setValue('file', result.assets[0]);
            setValue('avatarUri', result.assets[0].uri);
            trigger('avatarUri');
          }
        }, 600);
      }
    } catch (error) {
      //error
    }
  }, [setValue, showActionDialog, showDialog, trigger]);

  const file = watch('file');

  const renderAvatar = useMemo(() => {
    if (file) {
      return <Image source={{ uri: file.uri }} style={tw`w-72px h-72px`} />;
    }
    if (vehicle?.avatar?.fullThumbUrl) {
      return <Image source={{ uri: vehicle?.avatar?.fullThumbUrl }} style={tw`w-72px h-72px`} />;
    }
    return <DefaultCarAvatar height={72} width={72} />;
  }, [file, vehicle?.avatar?.fullThumbUrl]);

  const yearList = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const minYear = 1950;

    const arr = [];
    for (let index = minYear; index < year + 1; index++) {
      arr.push(index.toString());
    }
    return arr.reverse();
  }, []);

  const onSaveVehicle = useCallback(
    async (values: FormData) => {
      try {
        showFullscreenLoading(true);

        let avatarId = vehicle?.avatarId;
        if (file) {
          const response = await uploadImage(file);
          avatarId = response.id;
        }

        const input = {
          addressMoreInfo: values.addressDetail,
          avatarId,
          detail: values.detailVehicle,
          latitude: values.address ? values.address.lat : 0,
          longitude: values.address ? values.address.lng : 0,
          manufacturerId: values.manufacturer.id,
          mapAddress: values.address.mapAddress,
          modelId: values.model.id,
          name: values.name,
          operatingNumber: parseFloat(values.operatingNumber),
          operatingUnit: values.operatingNumberUnit === 'KM' ? OperatingUnitEnum.KM : OperatingUnitEnum.HOURS,
          ordinalNumber: values.ordinalNumber ? parseFloat(values.ordinalNumber) : undefined,
          originId: values?.origin?.id,
          serialNumber: values.serialNumber,
          vehicleRegistrationPlate: values.vehicleRegistrationPlate,
          vehicleTypeId: values.vehicleType.id,
          vinNumber: values.vinNumber,
          yearOfManufacture: parseFloat(values.yearOfManufacture),
        };

        if (vehicle?.id) {
          const res = await updateVehicle({
            variables: {
              input: {
                id: vehicle.id,
                ...input,
              },
            },
            refetchQueries: [
              {
                query: VehiclesDocument,
                fetchPolicy: 'network-only',
                variables: {
                  limit: 8,
                  page: 1,
                },
              },
            ],
          });

          if (res.errors) {
            showFullscreenLoading(false);
            return;
          }

          showFullscreenLoading(false);

          setTimeout(async () => {
            await showDialog({
              icon: <Sent />,
              type: 'ALERT',
              title: 'Thành công',
              message: 'Thay đổi thông tin xe thành công',
            });
            navigation.navigate('my-vehicles');
          }, 500);
        } else {
          const res = await createVehicle({
            variables: {
              input,
            },
            refetchQueries: [
              {
                query: VehiclesDocument,
                fetchPolicy: 'network-only',
                variables: {
                  limit: 8,
                  page: 1,
                },
              },
            ],
          });

          if (res.errors) {
            showFullscreenLoading(false);
            return;
          }
          showFullscreenLoading(false);
          setTimeout(async () => {
            const confirmRes = await showDialog({
              type: 'CONFIRM',
              icon: (
                <View style={tw.style('mt-[20px]')}>
                  <Sent />
                </View>
              ),
              title: <Text style={tw.style('text-17px font-semibold text-center')}>Thêm mới thành công</Text>,
              message: (
                <Text style={tw.style('mt-12px text-grayscale-gray text-center')}>
                  Xe được thêm mới đã có trong danh sách Xe của tôi
                </Text>
              ),
              cancelText: 'Về Trang chủ',
              confirmText: 'Về trang Xe Của tôi',
            });
            if (confirmRes) {
              navigation.navigate('my-vehicles');
            } else {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'bottom-tab' }],
                }),
              );
            }
          }, 500);
        }
      } catch (error) {
        showFullscreenLoading(false);
        showMessage({
          message: 'Có lỗi xảy ra',
          type: 'danger',
        });
      }
    },
    [showFullscreenLoading, vehicle, file, uploadImage, updateVehicle, showDialog, navigation, createVehicle],
  );

  return (
    <SafeAreaView edges={['bottom', 'top']} style={tw`flex-1`}>
      <AppHeader title={vehicle ? 'Chỉnh sửa máy' : 'Thêm máy'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollIndicatorInsets={{ right: 1 }}
        contentContainerStyle={tw`grow px-16px pt-26px pb-34px`}
      >
        <Controller
          control={control}
          name="avatarUri"
          render={() => (
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center `}>
                {renderAvatar}
                <View style={tw`ml-12px`}>
                  <Text style={tw`text-14px font-semibold text-grayscale-black leading-24px`}>
                    <Text style={tw`text-error`}>* </Text> Ảnh đại diện
                  </Text>
                  <TouchableOpacity onPress={handleChangeAvatar} style={tw`flex-row items-center mt-4px`}>
                    <Text style={tw`text-13px text-blue mr-8px`}>Thay đổi</Text>
                    <EditPenSvg width={15} height={15} />
                  </TouchableOpacity>
                </View>
              </View>
              {errors.avatarUri?.message && (
                <Text style={tw`text-12px text-error mt-2`}>{errors.avatarUri?.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text> Tên máy
        </Text>
        <Controller
          name="name"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              maxLength={255}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập tên máy"
              borderVisibleIfValue={false}
              errorMessage={errors.name?.message}
              trimWhenBlur
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>Biển số</Text>
        <Controller
          name="vehicleRegistrationPlate"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập biển số"
              borderVisibleIfValue={false}
              isLoading={registrationLoading}
              trimWhenBlur
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>Số thứ tự</Text>
        <Controller
          name="ordinalNumber"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập số thứ tự"
              borderVisibleIfValue={false}
              keyboardType="decimal-pad"
              trimWhenBlur
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text>Chủng loại máy
        </Text>
        <Controller
          name="vehicleType"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ListSelect
              value={value as CategoryEntity}
              placeholder="Chọn chủng loại máy"
              categoryType={CategoryTypeEnum.VEHICLE_TYPE}
              title={'Nhập tên chủng loại máy'}
              onValueChange={onChange}
              errorMessage={errors.vehicleType?.message}
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px mt-16px`}>
          <Text style={tw`text-error`}>* </Text>Hãng sản xuất
        </Text>
        <Controller
          name="manufacturer"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ListSelect
              value={value as CategoryEntity}
              placeholder="Chọn hãng sản xuất"
              categoryType={CategoryTypeEnum.MANUFACTURER}
              title={'Nhập tên hãng xe'}
              onValueChange={onChange}
              errorMessage={errors.manufacturer?.message}
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px mt-16px`}>
          <Text style={tw`text-error`}>* </Text>Model
        </Text>
        <Controller
          name="model"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ListSelect
              value={value as CategoryEntity}
              placeholder="Chọn model"
              categoryType={CategoryTypeEnum.MODEL}
              title={'Nhập tên model'}
              onValueChange={onChange}
              errorMessage={errors.model?.message}
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px mt-16px`}>Số serial</Text>
        <Controller
          name="serialNumber"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Nhập số serial"
              borderVisibleIfValue={false}
              onBlur={onBlur}
              errorMessage={errors.serialNumber?.message}
              isLoading={serialLoading}
              trimWhenBlur
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text>Số VIN
        </Text>
        <Controller
          name="vinNumber"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Nhập số VIN"
              borderVisibleIfValue={false}
              onBlur={onBlur}
              errorMessage={errors.vinNumber?.message}
              isLoading={vinLoading}
              trimWhenBlur
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text>Xuất xứ
        </Text>
        <Controller
          name="origin"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ListSelect
              value={value as CategoryEntity}
              placeholder="Chọn quốc gia"
              categoryType={CategoryTypeEnum.ORIGIN}
              title={'Nhập tên quốc gia'}
              onValueChange={onChange}
              errorMessage={errors.origin?.message}
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px mt-16px`}>
          <Text style={tw`text-error`}>* </Text>Năm sản xuất
        </Text>
        <Controller
          name="yearOfManufacture"
          control={control}
          render={({ field: { value, onChange } }) => (
            <GridSelect
              value={value}
              data={yearList}
              placeholder="Chọn năm sản xuất"
              onChange={onChange}
              errorMessage={errors.yearOfManufacture?.message}
            />
          )}
        />
        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text>Số giờ/kilomet đã vận hành
        </Text>
        <View style={tw`flex-row justify-between`}>
          <Controller
            name="operatingNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <View style={tw`w-48%`}>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập số"
                  borderVisibleIfValue={false}
                  keyboardType="decimal-pad"
                  errorMessage={errors.operatingNumber?.message}
                  trimWhenBlur
                />
              </View>
            )}
          />
          <Controller
            name="operatingNumberUnit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={tw`w-48%`}>
                <GridSelect value={value} col={2} data={['Giờ', 'KM']} onChange={onChange} placeholder="Đơn vị" />
              </View>
            )}
          />
        </View>

        <AddressGroupInput control={control as any} errors={errors} trigger={trigger as any} label="Địa điểm đặt máy" />

        <Text style={tw`text-14px font-medium mb-8px`}>Chi tiết</Text>
        <Controller
          name="detailVehicle"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              maxLength={1000}
              placeholder="Nhập chi tiết..."
              value={value}
              multiline={true}
              onChangeText={onChange}
              onBlur={onBlur}
              trimWhenBlur
            />
          )}
        />
      </KeyboardAwareScrollView>
      <View style={tw`p-16px pt-2`}>
        <Button title="Hoàn tất" onPress={handleSubmit(onSaveVehicle)} />
      </View>
    </SafeAreaView>
  );
});
