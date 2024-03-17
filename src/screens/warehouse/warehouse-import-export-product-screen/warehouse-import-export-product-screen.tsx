import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as zod from 'zod';

import { AppHeader, DatePicker, TextInput, tw } from '../../../components';
import { validationMessage } from '../../../constants';
import { usePartnerAddProductForStoreMutation } from '../../../graphql/mutations/partnerAddProductForStore.generated';
import { StoreProductTypeEnum } from '../../../graphql/type.interface';
import { AppRoutes } from '../../../navigator-params';

import {
  PropsType,
  WarehouseImportExportFormData,
  WarehouseImportExportProductScreenNavigationProps,
  WarehouseImportExportProductScreenRouteProps,
} from './type';

export const WarehouseImportExportProductScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<WarehouseImportExportProductScreenNavigationProps>();
  const { params } = useRoute<WarehouseImportExportProductScreenRouteProps>();

  const [addProduct, { loading }] = usePartnerAddProductForStoreMutation({
    onError(error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    },
    onCompleted() {
      showMessage({
        message: 'Thêm kho hàng thành công',
        type: 'success',
      });
      navigation.goBack();
    },
  });

  const warehouseValidation: zod.ZodType<WarehouseImportExportFormData> = useMemo(
    () =>
      zod.object({
        name: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        productId: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        date: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        quantity: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
      }),
    [],
  );

  const {
    control,
    handleSubmit: onSubmit,
    setValue,
    getValues,
    formState: { errors: formErrors },
  } = useForm<WarehouseImportExportFormData>({
    resolver: zodResolver(warehouseValidation),
    mode: 'onChange',
  });

  const handleSelectProducts = useCallback(
    (data: string[], productName?: string) => {
      setValue('productId', data[0]);
      productName && setValue('name', productName);
    },
    [setValue],
  );

  const handleSubmit = useCallback(
    async ({ date, quantity, productId }: WarehouseImportExportFormData) => {
      await addProduct({
        variables: {
          input: {
            storeId: params.storeId,
            productId: productId,
            quantity: parseFloat(quantity),
            inputDate: date,
            type: params.isImport ? StoreProductTypeEnum.IMPORT : StoreProductTypeEnum.EXPORT,
          },
        },
      });
    },
    [addProduct, params.isImport, params.storeId],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title={params.isImport ? 'Nhập hàng' : 'Xuất hàng'} />
      <View style={tw`flex-1 p-16px`}>
        <KeyboardAwareScrollView style={tw`flex-1`}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                editable={false}
                onPressIn={() =>
                  navigation.navigate(AppRoutes.CHOOSE_PRODUCT, {
                    handleSelectProducts: handleSelectProducts,
                    listProducts: [getValues('productId')],
                    isMultipleSelect: false,
                  })
                }
                label={'Tên sản phẩm'}
                placeholder="Chọn sản phẩm"
                isRequiredField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                labelStyle={tw`text-gray-900 font-normal mb-8px`}
                maxLength={255}
                clearButtonMode="while-editing"
                errorMessage={formErrors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label={params.isImport ? 'Ngày nhập hảng' : 'Ngày xuất hàng'}
                labelStyle={tw`text-gray-900 font-normal mb-8px`}
                isRequiredField
                onDateChange={onChange}
                pointerEvents="none"
                value={value}
                errorMessage={formErrors.date?.message}
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label={'Số lượng'}
                placeholder="Nhập số lượng"
                isRequiredField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                labelStyle={tw`text-gray-900 font-normal mb-8px`}
                maxLength={255}
                clearButtonMode="while-editing"
                errorMessage={formErrors.quantity?.message}
              />
            )}
          />
        </KeyboardAwareScrollView>
        <Button title={'Lưu'} onPress={onSubmit(handleSubmit)} disabled={loading} loading={loading} />
      </View>
    </SafeAreaView>
  );
});
