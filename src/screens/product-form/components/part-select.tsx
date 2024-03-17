import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { Space, tw } from '../../../components';
import { AppRoutes } from '../../../navigator-params';
import { AddSVG } from '../../../svg';
import { ProductDeviceType } from '../add-accessory-screen/type';
import { ProductAddVehicleScreenProps } from '../add-vehicle-screen/type';
import { useOptionsProductDevices } from '../hooks';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, any>;
  title: string;
  isRequired?: boolean;
  error?: string;
};

export function PartSelect<T extends FieldValues>({ title, isRequired, error, control, name }: Props<T>) {
  const navigation = useNavigation<ProductAddVehicleScreenProps>();

  const { vehicleTypeOptions, manufacturerOptions, modelOptions } = useOptionsProductDevices();

  const renderItem =
    (onChange: (values: ProductDeviceType[]) => void, value: ProductDeviceType[]) =>
    (item: ProductDeviceType, index: number) => {
      const { manufacturerId, modelId, vehicleTypeId } = item || {};
      const vehicleType = vehicleTypeOptions.find((i) => i?.value === vehicleTypeId);
      const manufacturer = manufacturerOptions.find((i) => i?.value === manufacturerId);
      const model = modelOptions.find((i) => i?.value === modelId);

      return (
        <View key={index} style={tw` my-8px border border-grayscale-border p-16px rounded-4px`}>
          <Text>{`${vehicleType?.label}-${manufacturer?.label}-${model?.label}`}</Text>
          <Space size={1} style={tw`my-12px`} backgroundColor={tw.color('bg-grayscale-border')} />
          <TouchableOpacity
            style={tw`rounded-4px border border-error px-16px py-8px self-end `}
            onPress={() => {
              onChange(value?.filter((_item: ProductDeviceType, i: number) => i !== index));
            }}
          >
            <Text style={tw`text-error`}>Xoá</Text>
          </TouchableOpacity>
        </View>
      );
    };

  return (
    <View>
      {!!title && (
        <Text style={tw`mb-8px text-grayscale-black font-medium mb-8px`}>
          {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View>
            {value?.map?.(renderItem(onChange, value))}
            <View style={tw`flex-row justify-end mt-24px`}>
              <TouchableOpacity
                style={tw`bg-primary self-end rounded-4px py-7px px-12px flex-row justify-center items-center`}
                onPress={() => {
                  navigation.navigate(AppRoutes.PART_SELECT_SCREEN, {
                    onChange: (values) => {
                      onChange([...(value || []), values]);
                    },
                  });
                }}
              >
                <AddSVG />
                <Space size={8} horizontal />
                <Text style={tw`text-12px font-medium`}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {!!error && <Text style={tw`text-error text-13px mb-16px mt-8px`}>{error}</Text>}
    </View>
  );
}
