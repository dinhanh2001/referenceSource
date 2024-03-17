import React from 'react';
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { LayoutAnimation, StyleProp, Text, View, ViewStyle } from 'react-native';

import { Checkbox, PriceInput, Space, tw } from '../../../components';
import * as Svg from '../../../svg';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  nameFixed: FieldPath<T>;
  control: Control<T, any>;
  errors: FieldErrors<T>;
  title?: string;
  isRequired?: boolean;
  error?: string;
  isFixedPrice?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function ProductPrice<T extends FieldValues>({
  control,
  name,
  nameFixed,
  title,
  isRequired,
  error,
  isFixedPrice,
  containerStyle,
}: Props<T>) {
  return (
    <View style={containerStyle}>
      {!!title && (
        <Text style={tw`mb-8px text-grayscale-black font-medium mb-8px`}>
          {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
        </Text>
      )}
      <Controller
        name={nameFixed}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={tw`flex-row items-center `}>
            <Checkbox
              checkedIcon={<Svg.CheckedSVG />}
              uncheckedIcon={<Svg.UncheckSVG />}
              title={'Cố định'}
              value={value}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onChange(!value);
              }}
            />
            <Space horizontal size={24} />
            <Checkbox
              checkedIcon={<Svg.CheckedSVG />}
              uncheckedIcon={<Svg.UncheckSVG />}
              title={'Thương lượng'}
              value={!value}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onChange(!value);
              }}
            />
          </View>
        )}
      />
      <Space />
      {isFixedPrice && (
        <View style={tw`mb-16px`}>
          <Controller
            name={name}
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <PriceInput
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Nhập giá"
                errorMessage={error as string}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
