import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

import { TextInput, tw } from '../../../components';
import { AppRoutes } from '../../../navigator-params';
import * as Svg from '../../../svg';
import { ProductAddVehicleScreenNavigationProps } from '../add-vehicle-screen/type';

type DataProps = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  data: DataProps[];
  name: FieldPath<T>;
  control: Control<T, any>;
  errors?: FieldErrors<T>;
  title?: string;
  titleModal?: string;
  placeholder: string;
  isRequiredField?: boolean;
};

export function CategoryInput<T extends FieldValues>({
  data,
  control,
  errors,
  title,
  titleModal,
  placeholder,
  name,
  isRequiredField,
}: Props<T>) {
  const navigation = useNavigation<ProductAddVehicleScreenNavigationProps>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => {
        const selected = data?.find?.((it: DataProps) => it.value === value);
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(AppRoutes.SELECT, {
                options: data || [],
                title: title || titleModal || '',
                multiple: false,
                value,
                onSelect: onChange,
              });
            }}
          >
            <View pointerEvents="none">
              <TextInput
                value={selected?.label || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                label={title}
                editable={false}
                isRequiredField={isRequiredField}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder={placeholder}
                rightIcon={<Svg.ArrowDownSVG width={11} height={6} style={tw`flex-shrink-0`} />}
                errorMessage={errors?.[name]?.message as string}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
