import React, { useCallback } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../../tw';

type ItemProps = {
  icon?: React.ReactNode;
  title: string;
  value: string;
};

type Props<T extends FieldValues> = {
  title: string;
  data: any[];
  control: Control<T, any>;
  name: Path<T>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function ECommerceSearchSectionFilter<T extends FieldValues>({
  title,
  data,
  name,
  control,
  containerStyle,
}: Props<T>) {
  const renderItem = useCallback(
    (onChange: (val: string) => void, value: string) => (it: ItemProps) => {
      const { icon } = it || {};
      const selected = value === it?.value;

      return (
        <Pressable
          key={it?.value}
          style={tw`flex-row`}
          onPress={() => {
            onChange(it?.value);
          }}
        >
          <View style={tw`flex-1 flex-row items-center`}>
            {!!icon && <View style={tw`mr-4`}>{icon}</View>}
            <Text>{it?.title}</Text>
          </View>
          <View
            style={[
              tw`w-5 h-5 rounded-full border items-center justify-center`,
              selected ? tw`border-primary` : tw`border-grayscale-gray`,
            ]}
          >
            {selected && <View style={tw`w-10px h-10px bg-primary rounded-full`} />}
          </View>
        </Pressable>
      );
    },
    [],
  );

  return (
    <View style={containerStyle}>
      <Text style={tw`font-semibold text-14px text-grayscale-black`}>{title}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return <View style={tw`gap-18px mt-17px`}>{data?.map?.(renderItem(onChange, value))}</View>;
        }}
      />
    </View>
  );
}
