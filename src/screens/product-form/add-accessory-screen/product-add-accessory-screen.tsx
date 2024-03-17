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
import * as Svg from '../../../svg';
import { CategoryInput, PartSelect, ProductImagePicker, ProductPrice, ProductStatus } from '../components';
import { useOptionsCategoryAccessories, useSaveAccessoryForm, useSchemaAccessory } from '../hooks';
import { Media, ProductDevice, ProductTypeEnum } from '../../../graphql/type.interface';

import {
  FormAccessoryData,
  ProductAddAccessoryScreenNavigationProps,
  ProductAddAccessoryScreenRouteProps,
  PropsType,
} from './type';

export const ProductAddAccessoryScreen: React.FC<PropsType> = memo(() => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<ProductAddAccessoryScreenNavigationProps>();
  const {
    params: { data },
  } = useRoute<ProductAddAccessoryScreenRouteProps>();

  const { originOptions, productUniOptions, partOptions } = useOptionsCategoryAccessories();

  const { validationSchema } = useSchemaAccessory();
  const { onSave } = useSaveAccessoryForm(async () => {
    const res = await showDialog({
      icon: <Svg.TickGreen />,
      title: data ? 'Sửa thành công' : 'Thêm mới thành công',
      message: `Phụ tùng ${data ? 'đã được sửa' : 'được thêm mới đã có'} trong danh sách Sản phẩm của tôi`,
      type: 'ALERT',
    });

    if (res) {
      navigation.pop(data ? 1 : 2);
    }
  });

  const defaultValues = useMemo(() => {
    if (data) {
      const {
        avatar,
        descriptionImages,
        name,
        serialNumber,
        partNumber,
        isNew,
        origin,
        partOfProduct,
        detail,
        isFixedCost,
        unitPrice,
        quantity,
        productUnit,
        productDevices,
      } = data || {};

      return {
        avatarId: avatar?.fullThumbUrl || '',
        avatar: { ...avatar, uri: avatar?.fullThumbUrl } as any,
        descriptionImageIds:
          descriptionImages?.map(({ id, fullThumbUrl }: Media) => ({ id, uri: fullThumbUrl, assetId: id } as any)) ||
          [],
        name: name || '',
        serialNumber: serialNumber || '',
        partNumber: partNumber || '',
        isNew: isNew || false,
        originId: origin?.id || '',
        partId: partOfProduct?.id || '',
        productDevices:
          productDevices?.map?.((it: ProductDevice) => ({
            modelId: it?.model?.id || '',
            manufacturerId: it?.manufacturer?.id || '',
            vehicleTypeId: it?.vehicleType?.id || '',
          })) || [],
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
      isNew: false,
      price: {
        isFixedCost: false,
      },
    };
  }, [data]);

  const {
    control,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormAccessoryData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const isNew = watch('isNew');
  const isFixedCost = watch('price.isFixedCost');

  useEffect(() => {
    if (productUniOptions?.length && !watch('productUnitId')) {
      const item = productUniOptions?.find?.((it) => it?.label?.toLowerCase?.() === 'chiếc');
      setValue('productUnitId', item?.value || '');
    }
  }, [productUniOptions, setValue, watch]);

  const onSubmit = useCallback(
    (values: FormAccessoryData) => {
      onSave(values, data?.id);
    },
    [data?.id, onSave],
  );

  const onPreview = useCallback(
    (accessory: FormAccessoryData) => {
      navigation.navigate(AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW, {
        type: ProductTypeEnum.ACCESSARY,
        accessory,
        id: data?.id,
      });
    },
    [data?.id, navigation],
  );

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <KeyboardAwareScrollView scrollIndicatorInsets={{ right: 1 }} keyboardShouldPersistTaps={'handled'}>
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
                label={'Tên phụ tùng'}
                isRequiredField
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập tên phụ tùng"
                errorMessage={errors?.name?.message}
              />
            )}
          />

          <Controller
            name="serialNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Ký hiệu/Model'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập ký hiệu/model"
                errorMessage={errors?.serialNumber?.message}
              />
            )}
          />

          <Controller
            name="partNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                keyboardType="number-pad"
                onChangeText={onChange}
                onBlur={onBlur}
                label={'Serial/Part-number'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập Serial/Part-number"
                errorMessage={errors?.partNumber?.message}
              />
            )}
          />

          <ProductStatus<FormAccessoryData>
            name="isNew"
            nameIsNew={'isNew'}
            control={control}
            isNewMachine={isNew}
            isRequired
            hideInput
            title="Tình trạng"
            error={errors?.isNew?.message}
            trigger={trigger}
          />

          <CategoryInput<FormAccessoryData>
            name="originId"
            data={originOptions}
            control={control}
            errors={errors}
            placeholder="Chọn quốc gia"
            title="Xuất xứ"
          />

          <CategoryInput<FormAccessoryData>
            name="partId"
            data={partOptions}
            control={control}
            isRequiredField
            errors={errors}
            placeholder="Chọn bộ phận"
            title="Dùng cho bộ phận"
          />

          <PartSelect name="productDevices" control={control} title={'Lắp cho các thiết bị'} />

          <Controller
            name="detail"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextArea
                label={'Chi tiết'}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                isRequiredField
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập chi tiết..."
                errorMessage={errors?.detail?.message}
              />
            )}
          />

          <Space style={tw`-mx-4 bg-grayscale-border mt-4`} size={8} />
          <Space />
          <Text style={tw`text-17px font-semibold`}>Thông tin giá</Text>
          <Space />

          <ProductPrice<FormAccessoryData>
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

          <CategoryInput<FormAccessoryData>
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
