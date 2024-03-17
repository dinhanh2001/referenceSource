import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApolloError } from '@apollo/client';

import { client } from '../../apollo/apollo';
import { AppHeader, DateInput, NumberInput, PriceInput, Space, Switch, TextInput, tw } from '../../components';
import { usePartnerCreateDiscountCodeMutation } from '../../graphql/mutations/partnerCreateDiscountCode.generated';
import { usePartnerUpdateDiscountCodeMutation } from '../../graphql/mutations/partnerUpdateDiscountCode.generated';
import { PartnerCountDiscountCodeDocument } from '../../graphql/queries/partnerCountDiscountCode.generated';
import { PartnerGetDiscountCodesDocument } from '../../graphql/queries/partnerGetDiscountCodes.generated';
import { DiscountCodeUnitEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppRoutes } from '../../navigator-params';
import { ArrowRightSVG } from '../../svg';

import { VoucherAddFormData, VoucherAddScreenNavigationProps, VoucherAddScreenRouteProps } from './type';
import { validationSchema } from './validation-schema';

const MAX_LEN_NAME = 255;

export const VoucherAddScreen = memo(() => {
  const navigation = useNavigation<VoucherAddScreenNavigationProps>();
  const {
    params: { data, isEdit },
  } = useRoute<VoucherAddScreenRouteProps>();

  const flagSubmit = useRef(false);

  const onCompleted = useCallback(() => {
    client.refetchQueries({
      include: [PartnerCountDiscountCodeDocument, PartnerGetDiscountCodesDocument],
    });
    navigation.goBack();
  }, [navigation]);

  const onError = useCallback((error: ApolloError) => {
    flagSubmit.current = false;
    showFlashMessageError(error);
  }, []);

  const [createDiscountCode, { loading: loadingCreate }] = usePartnerCreateDiscountCodeMutation({
    onError,
    onCompleted,
  });

  const [updateDiscountCode, { loading: loadingUpdate }] = usePartnerUpdateDiscountCodeMutation({
    onError,
    onCompleted,
  });

  const onSubmit = useCallback(
    async (dataSubmit: VoucherAddFormData) => {
      if (flagSubmit.current) return;

      const limit = dataSubmit.limitTime ? parseFloat(dataSubmit.limitTime) : undefined;
      const limitPerAccount = dataSubmit.limitTimePerAccount ? parseFloat(dataSubmit.limitTimePerAccount) : undefined;
      const startDate = dayjs(dataSubmit.date?.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      const endDate = dayjs(dataSubmit.date?.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      flagSubmit.current = true;

      if (!isEdit) {
        await createDiscountCode({
          variables: {
            input: {
              name: dataSubmit.voucherName,
              startDate,
              endDate,
              unit: dataSubmit.discount.unit as DiscountCodeUnitEnum,
              productIds: dataSubmit?.products?.isAllProducts ? [] : dataSubmit?.products?.productIds,
              value: parseFloat(dataSubmit.discount.value),
              limit,
              limitPerAccount,
              minOrderValue: parseFloat(dataSubmit.minOrderValue),
              isActive: dataSubmit.isActive,
            },
          },
        });
      } else {
        await updateDiscountCode({
          variables: {
            input: {
              id: data?.id ?? '',
              name: dataSubmit.voucherName,
              startDate,
              endDate,
              unit: dataSubmit.discount.unit as DiscountCodeUnitEnum,
              productIds: dataSubmit?.products?.isAllProducts ? [] : dataSubmit?.products?.productIds,
              value: parseFloat(dataSubmit.discount.value),
              limit,
              limitPerAccount,
              minOrderValue: parseFloat(dataSubmit.minOrderValue),
              isActive: dataSubmit.isActive,
            },
          },
        });
      }
    },
    [createDiscountCode, data?.id, isEdit, updateDiscountCode],
  );

  const defaultValues = useMemo(() => {
    if (data) {
      const {
        name,
        value,
        unit,
        limit,
        limitPerAccount,
        minOrderValue,
        startDate,
        endDate,
        products,
        isAssignAllProduct,
      } = data;
      const values: VoucherAddFormData = {
        voucherName: name?.trim?.() || '',
        discount: {
          unit: unit,
          value: value?.toString?.(),
        },
        limitTime: limit ? limit?.toString() : '',
        limitTimePerAccount: limitPerAccount ? limitPerAccount?.toString?.() : '',
        minOrderValue: minOrderValue?.toString?.(),
        products: {
          productIds: products ? products?.map?.((e) => e.id) : [],
          isAllProducts: isAssignAllProduct,
        },
        date: {
          startDate: startDate,
          endDate: endDate,
        },
        isActive: data.isActive,
      };

      return values;
    }

    return {
      isActive: true,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    trigger,
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<VoucherAddFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const discountUnitWatch = watch('discount.unit');
  const isUnitPercent = discountUnitWatch === DiscountCodeUnitEnum.PERCENTAGE;
  const isUnitVND = discountUnitWatch === DiscountCodeUnitEnum.VND;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title={isEdit ? 'Sửa mã giảm giá' : 'Thêm mới mã giảm giá'} />
      <View style={tw`flex-1`}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} scrollIndicatorInsets={{ right: 1 }}>
          <Controller
            control={control}
            name="voucherName"
            render={({ field: { value, onChange } }) => (
              <View style={tw`bg-white px-16px pt-16px`}>
                <FieldTitle title="Tên chương trình" isRequired />
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nhập tên chương trình"
                  errorMessage={formErrors.voucherName?.message}
                  maxLength={MAX_LEN_NAME}
                />
              </View>
            )}
          />

          <Space size={8} backgroundColor={tw.color('grayscale-border')} />

          <Controller
            control={control}
            name="products"
            render={({ field: { value, onChange } }) => (
              <View style={tw`py-4 px-4`}>
                <TouchableOpacity
                  style={tw`bg-white flex-row justify-between items-center py-1`}
                  onPress={() => {
                    navigation.navigate(AppRoutes.CHOOSE_PRODUCT, {
                      handleSelectProducts: (list, _, isAll) => {
                        onChange({
                          productIds: list ?? [],
                          isAllProducts: isAll ?? false,
                        });
                      },
                      listProducts: value?.productIds ?? [],
                      isMultipleSelect: true,
                      isAll: value?.isAllProducts ?? false,
                    });
                  }}
                >
                  <FieldTitle title="Sản phẩm áp dụng" isRequired containerStyle={tw`mb-0`} />
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-grayscale-gray`}>
                      {value?.isAllProducts
                        ? 'Tất cả sản phẩm'
                        : value?.productIds?.length
                        ? `${value?.productIds?.length} sản phẩm`
                        : 'Chọn'}
                    </Text>
                    <Space horizontal size={4} />
                    <ArrowRightSVG />
                  </View>
                </TouchableOpacity>
                <FieldError
                  errorMessage={formErrors.products?.productIds?.message as string}
                  containerStyle={tw`mt-0`}
                />
              </View>
            )}
          />

          <Space size={8} backgroundColor={tw.color('grayscale-border')} />

          <View style={tw`bg-white px-4 mb-5`}>
            <Space />
            <Controller
              control={control}
              name="date.startDate"
              render={({ field: { value, onChange } }) => (
                <DateInput
                  isRequiredField
                  value={value}
                  label={'Thời gian bắt đầu'}
                  onDateChange={(val) => {
                    onChange(val);
                    trigger('date.startDate');
                    trigger('date.endDate');
                  }}
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  placeholder="DD/MM/YYYY"
                  errorMessage={formErrors.date?.startDate?.message}
                />
              )}
            />
            <Space backgroundColor={tw.color('grayscale-border')} size={1} style={tw`my-4`} />
            <Controller
              control={control}
              name="date.endDate"
              render={({ field: { value, onChange } }) => (
                <DateInput
                  isRequiredField
                  value={value}
                  label={'Thời gian kết thúc'}
                  onDateChange={(val) => {
                    onChange(val);
                    trigger('date.startDate');
                    trigger('date.endDate');
                  }}
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  placeholder="DD/MM/YYYY"
                  errorMessage={formErrors.date?.endDate?.message}
                />
              )}
            />
          </View>

          <Space size={8} backgroundColor={tw.color('grayscale-border')} />

          <View style={tw`bg-white px-16px py-4 rounded-1`}>
            <FieldTitle title="Giá trị giảm" isRequired />
            <Controller
              control={control}
              name="discount.unit"
              render={({ field: { value, onChange } }) => {
                const isPercent = value === DiscountCodeUnitEnum.PERCENTAGE;
                const isVND = value === DiscountCodeUnitEnum.VND;

                return (
                  <View>
                    <View style={tw`flex-row `}>
                      <TouchableOpacity
                        style={tw`flex-1 items-center justify-center ${
                          isPercent ? '' : 'border-grayscale-border'
                        } border rounded-4px py-10px`}
                        onPress={() => {
                          onChange(DiscountCodeUnitEnum.PERCENTAGE);
                          trigger('discount.value');
                        }}
                      >
                        <Text style={tw`${isPercent ? 'text-black' : 'text-grayscale-gray'}`}>%</Text>
                      </TouchableOpacity>
                      <Space horizontal size={8} />
                      <TouchableOpacity
                        style={tw`flex-1 items-center border  ${
                          isVND ? '' : 'border-grayscale-border'
                        } justify-center rounded-4px`}
                        onPress={() => {
                          onChange(DiscountCodeUnitEnum.VND);
                          trigger('discount.value');
                        }}
                      >
                        <Text style={tw`${isVND ? 'text-black' : 'text-grayscale-gray'}`}>vnđ</Text>
                      </TouchableOpacity>
                    </View>
                    <FieldError errorMessage={formErrors.discount?.unit?.message as string} />
                  </View>
                );
              }}
            />

            <Space />
            <Controller
              control={control}
              name="discount.value"
              render={({ field: { value, onChange } }) =>
                isUnitVND ? (
                  <PriceInput
                    isRequiredField
                    value={value}
                    keyboardType="number-pad"
                    onChange={(val) => {
                      onChange(val);
                      trigger('discount.value');
                    }}
                    label={'Mức giảm'}
                    placeholder="Nhập số"
                    errorMessage={formErrors.discount?.value?.message}
                    containerStyle={formErrors.discount?.value?.message ? tw`mb-2` : tw`mb-7`}
                  />
                ) : (
                  <TextInput
                    isRequiredField
                    value={value}
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                      onChange(val);
                      trigger('discount.value');
                    }}
                    label={'Mức giảm'}
                    labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                    placeholder="Nhập số"
                    errorMessage={formErrors.discount?.value?.message}
                    rightIcon={isUnitPercent ? <Text>%</Text> : <></>}
                  />
                )
              }
            />

            <Controller
              control={control}
              name="limitTime"
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  zeroToEmpty
                  value={value}
                  editable={true}
                  onChange={onChange}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  placeholder="Không giới hạn"
                  label={'Giới hạn tổng số lượt sử dụng'}
                  errorMessage={formErrors.limitTime?.message}
                  labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                />
              )}
            />

            <Controller
              control={control}
              name="limitTimePerAccount"
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  zeroToEmpty
                  value={value}
                  editable={true}
                  onChange={onChange}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  placeholder="Không giới hạn"
                  label={'Giới hạn số lượt sử dụng/1 tài khoản'}
                  labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                  errorMessage={formErrors.limitTimePerAccount?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="minOrderValue"
              render={({ field: { value, onChange } }) => (
                <PriceInput
                  isRequiredField
                  value={value}
                  onChange={onChange}
                  label="Giá trị đơn hàng tối thiểu"
                  labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                  placeholder="Nhập số tiền"
                  errorMessage={formErrors.minOrderValue?.message}
                  keyboardType="number-pad"
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="isActive"
            render={({ field: { value, onChange } }) => (
              <View style={tw`flex-row justify-between mx-4`}>
                <Text style={tw`text-grayscale-black font-medium`}>Trạng thái hoạt động</Text>

                <Switch value={value} onChange={onChange} />
              </View>
            )}
          />
          <Space size={24} />
        </KeyboardAwareScrollView>
        <View style={tw` flex-row pb-5 pt-2 px-4 bg-white`}>
          <Button
            title={'Hủy'}
            containerStyle={tw`flex-1`}
            onPress={() => {
              if (flagSubmit.current) return;
              navigation.goBack();
            }}
            type="outline"
            buttonStyle={tw`border-grayscale-disabled`}
          />
          <Space horizontal size={12} />
          <Button
            title={'Lưu'}
            onPress={handleSubmit(onSubmit)}
            loading={loadingCreate || loadingUpdate}
            containerStyle={tw`flex-1`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
});

type FieldTitleProps = {
  isRequired: boolean;
  title: string;
  note?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

type FieldErrorProps = {
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const FieldTitle = memo(({ isRequired, title, note, containerStyle }: FieldTitleProps) => (
  <Text style={[tw`mb-8px text-grayscale-black font-medium`, containerStyle]}>
    {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
    {note && <Text style={tw`text-grayscale-gray `}>({note})</Text>}
  </Text>
));

const FieldError = ({ errorMessage, containerStyle }: FieldErrorProps) =>
  errorMessage ? <Text style={[tw`text-error text-12px mt-8px`, containerStyle]}>{errorMessage}</Text> : <></>;
