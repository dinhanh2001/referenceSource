import React from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormTrigger } from 'react-hook-form';
import { LayoutAnimation, Text, View } from 'react-native';

import { Checkbox, Space, TextInput, tw } from '../../../components';
import { OperatingUnitEnum } from '../../../graphql/type.interface';
import * as Svg from '../../../svg';

import { CategoryInput } from './category-input';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  nameIsNew: FieldPath<T>;
  nameOperatingNumber?: FieldPath<T>;
  nameOperatingUnit?: FieldPath<T>;
  control: Control<T, any>;
  error?: string;
  title?: string;
  isRequired?: boolean;
  hideInput?: boolean;
  isNewMachine?: boolean;
  trigger: UseFormTrigger<T>;
};

export function ProductStatus<T extends FieldValues>({
  control,
  // name,
  nameIsNew,
  nameOperatingNumber,
  nameOperatingUnit,
  error,
  title,
  isRequired,
  hideInput = false,
  isNewMachine,
  trigger,
}: Props<T>) {
  return (
    <View>
      {!!title && (
        <Text style={tw`mb-8px text-grayscale-black font-medium mb-8px`}>
          {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
        </Text>
      )}

      <Controller
        name={nameIsNew}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={tw`flex-row items-center `}>
            <Checkbox
              checkedIcon={<Svg.CheckedSVG />}
              uncheckedIcon={<Svg.UncheckSVG />}
              title={'Mới'}
              value={value}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onChange(!value);
                trigger(nameOperatingUnit);
              }}
            />
            <Space horizontal size={24} />
            <Checkbox
              checkedIcon={<Svg.CheckedSVG />}
              uncheckedIcon={<Svg.UncheckSVG />}
              title={'Đã qua sử dụng'}
              value={!value}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onChange(!value);
                trigger(nameOperatingUnit);
              }}
            />
          </View>
        )}
      />
      <Space />
      {!isNewMachine && !hideInput && (
        <View style={tw`flex-row `}>
          <Controller
            name={nameOperatingNumber as FieldPath<T>}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  trigger(nameOperatingUnit);
                  onChange(text);
                }}
                containerStyle={tw`flex-1`}
                placeholder="Nhập số"
                keyboardType="number-pad"
              />
            )}
          />
          <Space horizontal />
          <View style={tw`flex-1`}>
            <CategoryInput
              name={nameOperatingUnit as FieldPath<T>}
              control={control}
              data={[
                { label: 'Giờ', value: OperatingUnitEnum.HOURS },
                { label: 'Km', value: OperatingUnitEnum.KM },
              ]}
              placeholder="giờ"
              titleModal={'Chọn giờ'}
            />
          </View>
        </View>
      )}
      {!!error && (
        <Text style={[tw`text-error text-13px mb-16px`, { marginTop: isNewMachine ? -8 : -16 }]}>{error}</Text>
      )}
    </View>
  );
}
