import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectImage, Space, TextArea, TextInput, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { AppRoutes } from '../../../navigator-params';
import { TickGreen } from '../../../svg';
import { CategoryInput, ProductImagePicker, ProductPrice, ProductStatus } from '../components';
import { useOptionsCategory, useSaveVehicleForm, useSchemaVehicle } from '../hooks';
import { Media, ProductTypeEnum } from '../../../graphql/type.interface';

import { FormVehicleData, ProductAddVehicleScreenProps, ProductAddVehicleScreenRouteProps, PropsType } from './type';

export const ProductAddVehicleScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<ProductAddVehicleScreenProps>();
  const {
    params: { data },
  } = useRoute<ProductAddVehicleScreenRouteProps>();
  const { showDialog } = useOverlay();

  const { validationSchema, vinLoading, serialLoading, registrationLoading } = useSchemaVehicle();
  const { onSave } = useSaveVehicleForm(async () => {
    const res = await showDialog({
      icon: <TickGreen />,
      title: data ? 'Sửa thành công' : 'Thêm mới thành công',
      message: data
        ? 'Thiết bị đã được sửa trong danh sách Sản phẩm của tôi'
        : 'Thiết bị được thêm mới đã có trong danh sách Sản phẩm của tôi',
      type: 'ALERT',
    });

    if (res) {
      navigation.pop(data ? 1 : 2);
    }
  });

  const { vehicleTypeOptions, manufacturerOptions, modelOptions, originOptions, productUniOptions, yearOptions } =
    useOptionsCategory();

  const defaultValues = useMemo(() => {
    if (data) {
      const {
        avatar,
        descriptionImages,
        name,
        vehicleRegistrationPlate,
        ordinalNumber,
        productType,
        manufacturer,
        model,
        serialNumber,
        vinNumber,
        origin,
        yearOfManufacture,
        isNew,
        operatingNumber,
        operatingUnit,
        detail,
        isFixedCost,
        unitPrice,
        quantity,
        productUnit,
      } = data;

      return {
        avatarId: avatar?.fullThumbUrl || '',
        avatar: { ...avatar, uri: avatar?.fullThumbUrl } as any,
        descriptionImageIds:
          descriptionImages?.map(({ id, fullThumbUrl }: Media) => ({ id, uri: fullThumbUrl, assetId: id } as any)) ||
          [],
        name,
        vehicleRegistrationPlate: vehicleRegistrationPlate || '',
        ordinalNumber: ordinalNumber?.toString?.() || '',
        vehicleTypeId: productType?.id || '',
        manufacturerId: manufacturer?.id || '',
        modelId: model?.id || '',
        serialNumber: serialNumber || '',
        vinNumber: vinNumber || '',
        originId: origin?.id || '',
        yearOfManufacture: yearOfManufacture?.toString?.() || '',
        status: {
          isNew: isNew || false,
          operatingNumber: operatingNumber?.toString?.() || '',
          operatingUnit: operatingUnit || '',
        },
        detail: detail || '',
        price: {
          isFixedCost: isFixedCost || false,
          unitPrice: unitPrice?.toString?.() || '',
        },
        quantity: quantity?.toString?.() || '',
        productUnitId: productUnit?.id || '',
      };
    }

    return {
      descriptionImageIds: [],
      price: { isFixedCost: true },
      status: { isNew: false },
    };
  }, [data]);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormVehicleData>({
    resolver: zodResolver(validationSchema),
    mode: 'all',
    defaultValues: defaultValues,
  });

  const isFixedCost = watch('price.isFixedCost');
  const isNew = watch('status.isNew');

  useEffect(() => {
    if (productUniOptions?.length && !watch('productUnitId')) {
      const item = productUniOptions?.find?.((it) => it?.label?.toLowerCase?.() === 'chiếc');
      setValue('productUnitId', item?.value || '');
    }
  }, [productUniOptions, setValue, watch]);

  const onSubmit = useCallback(
    (values: FormVehicleData) => {
      onSave(values, data?.id);
    },
    [data?.id, onSave],
  );

  const onPreview = useCallback(
    (vehicle: FormVehicleData) => {
      navigation.navigate(AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW, {
        vehicle,
        type: ProductTypeEnum.VEHICLE,
        id: data?.id,
      });
    },
    [data?.id, navigation],
  );

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} scrollIndicatorInsets={{ right: 1 }}>
        <View style={tw`px-16px pb-40px`}>
          <Text style={tw`text-17px font-semibold`}>Thông tin sản phẩm</Text>
          <Space />
          <Controller
            name="avatarId"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ProductImagePicker
                image={value}
                setImage={(image: ImagePicker.ImagePickerAsset) => {
                  onChange(image?.uri);
                  setValue('avatar', image);
                }}
                error={errors?.avatarId?.message}
              />
            )}
          />

          <Controller
            name="descriptionImageIds"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectImage listImage={value} setListImage={onChange} error={errors?.descriptionImageIds?.message} />
            )}
          />
          <Space />

          <Controller
            name="name"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Tên máy'}
                isRequiredField
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập tên máy"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="vehicleRegistrationPlate"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Biển số'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập biển số"
                isLoading={registrationLoading}
                errorMessage={errors.vehicleRegistrationPlate?.message}
              />
            )}
          />

          <Controller
            name="ordinalNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                keyboardType="number-pad"
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Số thứ tự'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập số thứ tự"
                errorMessage={errors.ordinalNumber?.message}
              />
            )}
          />

          <CategoryInput<FormVehicleData>
            name="vehicleTypeId"
            data={vehicleTypeOptions}
            control={control}
            errors={errors}
            placeholder="Chọn chủng loại máy"
            title="Chủng loại máy"
            isRequiredField
          />

          <CategoryInput<FormVehicleData>
            name="manufacturerId"
            data={manufacturerOptions}
            control={control}
            errors={errors}
            placeholder="Chọn hãng sản xuất"
            title="Hãng sản xuất"
            isRequiredField
          />

          <CategoryInput<FormVehicleData>
            name="modelId"
            data={modelOptions}
            control={control}
            errors={errors}
            placeholder="Chọn model"
            title="Model"
            isRequiredField
          />

          <Controller
            name="serialNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Số serial'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập số serial"
                isLoading={serialLoading}
                errorMessage={errors.serialNumber?.message}
              />
            )}
          />
          <Controller
            name="vinNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Số VIN'}
                isRequiredField
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập số VIN"
                errorMessage={errors.vinNumber?.message}
                isLoading={vinLoading}
              />
            )}
          />

          <CategoryInput<FormVehicleData>
            name="originId"
            data={originOptions}
            control={control}
            errors={errors}
            placeholder="Chọn quốc gia"
            title="Xuất xứ"
          />

          <CategoryInput<FormVehicleData>
            name="yearOfManufacture"
            data={yearOptions}
            control={control}
            errors={errors}
            placeholder="Chọn năm sản xuất"
            title="Năm sản xuất"
          />

          <ProductStatus<FormVehicleData>
            name="status"
            nameIsNew={'status.isNew'}
            nameOperatingNumber="status.operatingNumber"
            nameOperatingUnit="status.operatingUnit"
            control={control}
            isNewMachine={isNew}
            isRequired
            title="Tình trạng"
            error={errors?.status?.operatingUnit?.message}
            trigger={trigger}
          />

          <Controller
            name="detail"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextArea
                label={'Chi tiết'}
                isRequiredField
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập chi tiết..."
                errorMessage={errors.detail?.message}
              />
            )}
          />

          <Space style={tw`-mx-4 mt-4 bg-grayscale-border`} size={8} />
          <Space />

          <Text style={tw`text-17px font-semibold`}>Thông tin giá</Text>
          <Space />

          <ProductPrice<FormVehicleData>
            name={'price.unitPrice'}
            nameFixed="price.isFixedCost"
            control={control}
            errors={errors}
            isRequired
            title="Giá sản phẩm"
            error={errors.price?.unitPrice?.message}
            isFixedPrice={isFixedCost}
          />

          <Controller
            name="quantity"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Tồn kho'}
                isRequiredField
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập số lượng"
                keyboardType="number-pad"
                errorMessage={errors.quantity?.message}
              />
            )}
          />

          <CategoryInput<FormVehicleData>
            name="productUnitId"
            data={productUniOptions}
            control={control}
            errors={errors}
            placeholder="Chọn đơn vị"
            title="Chọn đơn vị"
            isRequiredField
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={tw`flex-row m-4 mt-2`}>
        <Button
          containerStyle={tw`flex-1`}
          type="outline"
          buttonStyle={tw`border-grayscale-disabled`}
          onPress={handleSubmit(onSubmit)}
        >
          Lưu
        </Button>
        <Space horizontal />
        <Button containerStyle={tw`flex-1`} onPress={handleSubmit(onPreview)}>
          Xem trước
        </Button>
      </View>
    </SafeAreaView>
  );
});
