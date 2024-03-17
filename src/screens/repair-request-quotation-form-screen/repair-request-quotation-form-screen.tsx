import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Checkbox,
  DateInput,
  DiagnosticSelect,
  ModalUnit,
  NumberInput,
  PriceInput,
  Space,
  TextArea,
  TextInput,
  tw,
} from '../../components';
import { OPERATING_UNIT } from '../../constants';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { useQuotationPriceListsQuery } from '../../graphql/queries/quotationPriceLists.generated';
import { QuotationPriceListEntity, StatusEnum } from '../../graphql/type.interface';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { AddSVG, ArrowDownSVG, CheckedSVG, UncheckSVG } from '../../svg';

import { AdditionalFee, Diagnostics, FormAccessory, FormCheckAndQuote, PropsType } from './type';
import { useSchemaQuotationForm } from './use-schema';

type FieldTitleProps = {
  isRequired?: boolean;
  title: string;
};

const FieldTitle = memo(({ isRequired, title }: FieldTitleProps) => (
  <Text style={tw`font-medium mb-8px`}>
    {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
  </Text>
));

const EMPTY_DIAGNOSTIC: Diagnostics = { quotationPriceListId: '', description: '', expense: '', workingHour: '' };
const EMPTY_ACCESSORY: FormAccessory = {
  accessoryName: '',
  accessoryUnit: '',
  accessoryQuantity: '',
  accessoryAvailable: false,
  accessoryUnitPrice: '',
};
const EMPTY_ADDITIONAL: AdditionalFee = { additionalFeeName: '', additionalFeeAmount: '' };

type ScreenRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN>;

export const RepairRequestQuotationFormScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const routes = useRoute<ScreenRouteProp>();
  const [isModalVisible, setModalVisible] = useState(false);

  const { bookingId } = routes?.params || {};
  const { data, loading } = usePartnerBookingQuery({ variables: { id: bookingId } });
  const { data: dataDiagnostic } = useQuotationPriceListsQuery({
    variables: {
      isActive: StatusEnum.ACTIVE,
      limit: 1000,
    },
  });

  const { validationSchema } = useSchemaQuotationForm();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormCheckAndQuote>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      diagnostics: [EMPTY_DIAGNOSTIC],
      accessory: [EMPTY_ACCESSORY],
      additional: [EMPTY_ADDITIONAL],
      transportFee: data?.partnerBooking?.transportFee?.toString() || '',
    },
  });

  const {
    fields: fieldDiagnostic,
    append: appendDiagnostic,
    remove: removeDianostic,
  } = useFieldArray({
    control,
    name: 'diagnostics',
  });

  const {
    fields: fieldAccessory,
    append: appendAccessory,
    remove: removeAccessory,
  } = useFieldArray({
    control,
    name: 'accessory',
  });

  const {
    fields: fieldAdditional,
    append: appendAdditional,
    remove: removeAdditional,
  } = useFieldArray({
    control,
    name: 'additional',
  });

  const diagnostics = watch('diagnostics');
  const accessory = watch('accessory');
  const additional = watch('additional');

  useEffect(() => {
    if (!loading && data?.partnerBooking?.transportFee) {
      setValue('transportFee', data?.partnerBooking?.transportFee?.toString() || '');
    }
  }, [data?.partnerBooking?.transportFee, loading, setValue]);

  const openModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onChooseOperatingUnit = (name: any, value: any) => {
    setValue(name, value);
    setError(name, undefined as any);
  };

  const onSubmit = (values: FormCheckAndQuote) => {
    navigation.navigate(AppRoutes.REPAIR_REQUEST_QUOTATION_CONFIRM_SCREEN, {
      data: {
        ...values,
        estimatedCompleteAt: dayjs(values.estimatedCompleteAt, 'DD/MM/YYYY').toISOString(),
      },
      bookingId,
    });
  };

  return (
    <View>
      <KeyboardAwareScrollView style={tw`p-16px`}>
        <ModalUnit
          isModalVisible={isModalVisible}
          onClose={openModal}
          onChooseValue={onChooseOperatingUnit}
          name={'operatingUnit'}
        />

        <Text style={tw`font-semibold mb-16px`}>I. CHẨN ĐOÁN</Text>
        <FieldTitle title="Đã vận hành" />
        <View style={tw`flex-row`}>
          <Controller
            name="operatingNumber"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                containerStyle={tw`flex-1`}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập số"
                errorMessage={errors.operatingNumber?.message}
                keyboardType="number-pad"
              />
            )}
          />
          <Space horizontal />
          <Controller
            name="operatingUnit"
            control={control}
            render={({ field: { value } }) => (
              <TouchableOpacity style={tw`flex-1`} onPress={openModal}>
                <View pointerEvents="none">
                  <TextInput
                    value={value ? OPERATING_UNIT?.[value] : ''}
                    editable={false}
                    labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                    placeholder="giờ"
                    rightIcon={<ArrowDownSVG width={11} height={6} style={tw`flex-shrink-0`} />}
                    errorMessage={errors.operatingUnit?.message}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Space backgroundColor={tw.color('grayscale-border')} size={1} />

        {diagnostics && (
          <FlatList
            data={fieldDiagnostic}
            scrollEnabled={false}
            renderItem={({ index }) => {
              return (
                <View style={tw`border border-grayscale-border p-16px rounded-4px mt-16px`} key={index}>
                  <DiagnosticSelect
                    name={`diagnostics.${index}.quotationPriceListId`}
                    nameWorkingHour={`diagnostics.${index}.workingHour`}
                    nameExpense={`diagnostics.${index}.expense`}
                    nameDescription={`diagnostics.${index}.description`}
                    control={control}
                    data={dataDiagnostic?.quotationPriceLists?.items as QuotationPriceListEntity[]}
                    onSetFixable={(val: boolean) => setValue(`diagnostics.${index}.fixable`, val)}
                    fixable={diagnostics?.[index]?.fixable}
                    error={errors?.diagnostics?.[index]?.quotationPriceListId?.message}
                    errorExpense={errors?.diagnostics?.[index]?.expense?.message}
                    errorWorkingHour={errors?.diagnostics?.[index]?.workingHour?.message}
                    errorDescription={errors?.diagnostics?.[index]?.description?.message}
                  />
                  {diagnostics?.length > 1 && (
                    <>
                      <Space />
                      <Space backgroundColor={tw.color('grayscale-border')} size={1} />
                      <TouchableOpacity
                        style={tw`rounded-4px border border-error px-16px py-8px mt-16px self-end`}
                        onPress={() => removeDianostic(index)}
                      >
                        <Text style={tw`text-error`}>Xoá</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              );
            }}
          />
        )}

        <Space />
        <TouchableOpacity
          style={tw`bg-primary self-end rounded-4px py-7px px-12px flex-row justify-center items-center mb-16px`}
          onPress={() => {
            appendDiagnostic(EMPTY_DIAGNOSTIC);
          }}
        >
          <AddSVG />
          <Space size={8} horizontal />
          <Text style={tw`text-12px font-medium`}>Thêm chẩn đoán</Text>
        </TouchableOpacity>
        <Space backgroundColor={tw.color('grayscale-border')} size={1} />
        <Space />
        <Controller
          name="diagnosisNote"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              label="Ghi chú"
              labelStyle={tw`text-grayscale-black font-medium mb-8px`}
              maxLength={1000}
              placeholder="Nhập ghi chú"
              value={value}
              multiline={true}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.diagnosisNote?.message}
            />
          )}
        />
        <Space />

        <Controller
          name="estimatedCompleteAt"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateInput
              isRequiredField
              value={value}
              label={'Dự kiến thời gian hoàn thành'}
              onDateChange={onChange}
              labelStyle={tw`text-grayscale-black font-medium mb-8px`}
              placeholder="DD/MM/YYYY"
              errorMessage={errors.estimatedCompleteAt?.message}
            />
          )}
        />

        <Space size={12} />
        <Space size={6} style={tw`-mx-16px my-16px`} backgroundColor={tw.color('bg-grayscale-border')} />

        <Text style={tw`font-semibold`}>II. BÁO GIÁ SỬA CHỮA</Text>
        <Space size={12} />
        <Text style={tw`font-semibold`}>1. Vật tư phụ tùng</Text>

        {accessory && (
          <FlatList
            data={fieldAccessory}
            scrollEnabled={false}
            renderItem={({ index }) => {
              return (
                <View key={index}>
                  <Space />
                  <Controller
                    name={`accessory.${index}.accessoryName`}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        isRequiredField
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label={'Tên vật tư phụ tùng'}
                        labelStyle={tw`font-medium mb-8px`}
                        placeholder="Nhập vật tư phụ tùng"
                        errorMessage={errors?.accessory?.[index]?.accessoryName?.message}
                      />
                    )}
                  />
                  <View style={tw`flex-row`}>
                    <View style={tw`flex-1`}>
                      <Controller
                        name={`accessory.${index}.accessoryUnit`}
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                          <TextInput
                            isRequiredField
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            label={'Đơn vị tính'}
                            labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                            placeholder="Nhập đơn vị"
                            errorMessage={errors?.accessory?.[index]?.accessoryUnit?.message}
                          />
                        )}
                      />
                    </View>
                    <Space horizontal />
                    <View style={tw`flex-1`}>
                      <Controller
                        name={`accessory.${index}.accessoryQuantity`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <NumberInput
                            isRequiredField
                            value={value}
                            onChange={onChange}
                            label={'Số lượng'}
                            editable={false}
                            labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                            style={tw`text-14px font-semibold`}
                            errorMessage={errors?.accessory?.[index]?.accessoryQuantity?.message}
                          />
                        )}
                      />
                    </View>
                  </View>
                  <FieldTitle isRequired title="Trạng thái" />
                  <View style={tw`flex-row items-center `}>
                    <Checkbox
                      checkedIcon={<CheckedSVG />}
                      uncheckedIcon={<UncheckSVG />}
                      title={'Không có sẵn'}
                      value={!getValues(`accessory.${index}.accessoryAvailable`)}
                      onPress={() => setValue(`accessory.${index}.accessoryAvailable`, false)}
                    />
                    <Space horizontal size={24} />
                    <Checkbox
                      checkedIcon={<CheckedSVG />}
                      uncheckedIcon={<UncheckSVG />}
                      title={'Có sẵn'}
                      value={getValues(`accessory.${index}.accessoryAvailable`)}
                      onPress={() => setValue(`accessory.${index}.accessoryAvailable`, true)}
                    />
                  </View>
                  <Space />
                  <Controller
                    name={`accessory.${index}.accessoryUnitPrice`}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <PriceInput
                        isRequiredField
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={'Đơn giá'}
                        placeholder="Nhập giá"
                        errorMessage={errors?.accessory?.[index]?.accessoryUnitPrice?.message}
                      />
                    )}
                  />
                  {accessory?.length > 1 && (
                    <TouchableOpacity
                      style={tw`rounded-4px border border-error px-16px py-8px self-end mb-16px`}
                      onPress={() => removeAccessory(index)}
                    >
                      <Text style={tw`text-error`}>Xoá</Text>
                    </TouchableOpacity>
                  )}
                  <Space size={1} style={tw``} backgroundColor={tw.color('bg-grayscale-border')} />
                </View>
              );
            }}
          />
        )}

        <Space />
        <TouchableOpacity
          style={tw`bg-primary self-end rounded-4px py-7px px-12px flex-row justify-center items-center`}
          onPress={() => {
            appendAccessory(EMPTY_ACCESSORY);
          }}
        >
          <AddSVG />
          <Space size={8} horizontal />
          <Text style={tw`text-12px font-medium`}>Thêm phụ tùng</Text>
        </TouchableOpacity>

        <Space size={2} style={tw`-mx-16px my-16px`} backgroundColor={tw.color('bg-grayscale-border')} />

        <Text style={tw`font-semibold`}>2. Chi phí công dịch vụ</Text>
        <Space size={12} />

        <Controller
          name={`transportFee`}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <PriceInput
              isRequiredField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              editable={false}
              label="Phí di chuyển"
              containerStyle={tw`mb-16px`}
              placeholder="Nhập số tiền"
              errorMessage={errors?.transportFee?.message}
              inputContainerStyle={tw`bg-grayscale-bg border-[#eee]`}
            />
          )}
        />

        <Controller
          name={`diagnosticFee`}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <PriceInput
              isRequiredField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label="Phí chẩn đoán"
              containerStyle={tw`mb-16px`}
              placeholder="Nhập số tiền"
              errorMessage={errors?.diagnosticFee?.message}
            />
          )}
        />
        <Controller
          name={`repairFee`}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <PriceInput
              isRequiredField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label="Phí sửa chữa, thay thế"
              containerStyle={tw`mb-16px`}
              placeholder="Nhập số tiền"
              errorMessage={errors?.repairFee?.message}
            />
          )}
        />

        <Space size={12} />
        <Text style={tw`font-semibold`}>3. Chi phí phát sinh</Text>
        <Space size={12} />

        {additional && (
          <FlatList
            data={fieldAdditional}
            scrollEnabled={false}
            renderItem={({ index }) => {
              return (
                <View style={tw`border border-grayscale-border p-16px rounded-4px mt-16px`} key={index}>
                  <Controller
                    name={`additional.${index}.additionalFeeName`}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label={'Tên chi phí'}
                        labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                        placeholder="Nhập tên chi phí"
                        errorMessage={errors?.additional?.[index]?.additionalFeeName?.message}
                      />
                    )}
                  />

                  <Controller
                    name={`additional.${index}.additionalFeeAmount`}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <PriceInput
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        label="Số tiền"
                        placeholder="Nhập số tiền"
                        errorMessage={errors?.additional?.[index]?.additionalFeeAmount?.message}
                      />
                    )}
                  />

                  <Space backgroundColor={tw.color('grayscale-border')} size={1} />
                  <Space />
                  <TouchableOpacity
                    style={tw`rounded-4px border border-error px-16px py-8px self-end`}
                    onPress={() => removeAdditional(index)}
                  >
                    <Text style={tw`text-error`}>Xoá</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
        <Space />
        <TouchableOpacity
          style={tw`bg-primary self-end rounded-4px py-7px px-12px flex-row justify-center items-center`}
          onPress={() => {
            appendAdditional({ additionalFeeName: '', additionalFeeAmount: '' });
          }}
        >
          <AddSVG />
          <Space size={8} horizontal />
          <Text style={tw`text-12px font-medium`}>Thêm chi phí phát sinh</Text>
        </TouchableOpacity>

        <Space size={120} />
      </KeyboardAwareScrollView>
      <View style={tw`absolute bottom-0 left-0 right-0 pb-40px pt-10px px-16px bg-white`}>
        <Button title={'Lưu'} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
});
