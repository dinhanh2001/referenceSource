import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { QuotationPriceListEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { AppRoutes } from '../../navigator-params';
import { ArrowDownSVG } from '../../svg';
import { PriceInput } from '../price-input';
import { TextArea } from '../text-area';
import { TextInput } from '../text-input';
import { tw } from '../tw';

import { DiagnosticSelectNavigationProps } from './type';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  nameWorkingHour: FieldPath<T>;
  nameExpense: FieldPath<T>;
  nameDescription: FieldPath<T>;
  data: QuotationPriceListEntity[];
  control: Control<T, any>;
  fixable?: boolean;
  onSetFixable?: (fixable: boolean) => void;
  error?: string;
  errorWorkingHour?: string;
  errorExpense?: string;
  errorDescription?: string;
};

export function DiagnosticSelect<T extends FieldValues>({
  name,
  nameExpense,
  nameWorkingHour,
  nameDescription,
  control,
  data,
  fixable,
  onSetFixable,
  error,
  errorWorkingHour,
  errorExpense,
  errorDescription,
}: Props<T>) {
  const navigation = useNavigation<DiagnosticSelectNavigationProps>();

  const list = useMemo(
    () =>
      data?.map?.(({ id, diagnosticCode, accessoriesName, vehicleType }: QuotationPriceListEntity) => ({
        value: id,
        label: `${diagnosticCode} - ${accessoriesName} - ${vehicleType}`,
      })),
    [data],
  );

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => {
          const itemSelected = data?.find?.((it: QuotationPriceListEntity) => it.id === value);
          const selected = itemSelected
            ? `${itemSelected?.diagnosticCode} - ${itemSelected?.accessoriesName} - ${itemSelected?.vehicleType}`
            : '';
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(AppRoutes.SELECT, {
                    options: list || [],
                    isSearchable: true,
                    title: 'Chọn mã chẩn đoán',
                    multiple: false,
                    value,
                    onSelect: (val: string) => {
                      const item = data?.find?.((it: QuotationPriceListEntity) => it.id === val);
                      onChange(val);
                      onSetFixable?.(item?.fixable as boolean);
                    },
                  });
                }}
              >
                <View pointerEvents="none">
                  <TextInput
                    isRequiredField
                    value={selected}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    label={'Mã chẩn đoán'}
                    editable={false}
                    labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                    placeholder={'Nhập để tìm hoặc chọn'}
                    rightIcon={<ArrowDownSVG width={11} height={6} style={tw`flex-shrink-0`} />}
                    errorMessage={error}
                  />
                </View>
              </TouchableOpacity>
              {!itemSelected?.fixable && (
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-grayscale-black font-medium`}>Chi phí</Text>
                  <Text style={tw`text-grayscale-black font-medium`}>{`${thousandSeparator(
                    itemSelected?.expense || 0,
                  )} đ`}</Text>
                </View>
              )}
            </View>
          );
        }}
      />

      {!!fixable && (
        <>
          <View style={tw`mt-4 flex-row gap-4`}>
            <View style={tw`flex-1`}>
              <Controller
                name={nameExpense}
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <PriceInput
                    isRequiredField
                    label="Chi phí"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    placeholder="0.0"
                    errorMessage={errorExpense}
                  />
                )}
              />
            </View>
            <View style={tw`flex-1`}>
              <Controller
                name={nameWorkingHour}
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    isRequiredField
                    label="Thời gian dự kiến"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    labelStyle={tw`text-grayscale-black font-medium mb-5px `}
                    placeholder="0.0 giờ"
                    keyboardType="number-pad"
                    errorMessage={errorWorkingHour}
                  />
                )}
              />
            </View>
          </View>

          <Controller
            name={nameDescription}
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextArea
                isRequiredField
                label={'Thông tin'}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                labelStyle={tw`text-grayscale-black font-medium mb-5px `}
                placeholder="Thêm thông tin"
                errorMessage={errorDescription}
              />
            )}
          />
        </>
      )}
    </View>
  );
}
