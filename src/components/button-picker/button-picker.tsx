import { Button } from '@rneui/themed';
import React, { memo } from 'react';
import { Control, Controller, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { TouchableOpacity, View, Text } from 'react-native';

import { tw } from '../tw';

type Data = {
  label: string;
  value: string;
};

type Props = {
  data?: Data[];
  control: Control<any>;
  errors: FieldErrors<any>;
  trigger?: UseFormTrigger<any>;
  label: string;
  name: string;
  required?: boolean;
};

export const ButtonPicker = memo(({ label, errors, data, required = false, ...props }: Props) => {
  if (!data) return <></>;
  return (
    <>
      <Text style={tw`text-14px font-medium mb-8px`}>
        <Text style={tw`text-error`}>{required ? '*' : ''}</Text>
        {label}
      </Text>
      <Controller
        {...props}
        render={({ field: { value, onChange } }) => {
          return (
            <View style={tw`flex-row flex-wrap`}>
              {data.map((item) => {
                const selected = value === item.value;
                const color = selected ? 'grayscale-black' : 'grayscale-gray';

                return (
                  <TouchableOpacity
                    key={item?.value}
                    style={tw`px-3 py-2 border mb-2 mr-2 rounded-1 border-${color}`}
                    onPress={() => onChange(item.value)}
                  >
                    <Text style={tw`text-${color}`}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />
      {errors[props.name]?.message && (
        <Text style={tw`text-error text-12px pl-6px pb-8px`}>{errors[props.name]?.message as string}</Text>
      )}
    </>
  );
});
