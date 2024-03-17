import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { MaintenancesAccessoryEntity } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: MaintenancesAccessoryEntity;
  index: number;
  value?: boolean;
  onChange?: (id: string, value: boolean) => void;
};

export const FieldFormSuplies = ({ containerStyle, item, index, value, onChange }: Props) => {
  const { id, name, quantity, unit } = item || {};

  const onChangeValue = useCallback(
    (val: boolean) => {
      onChange?.(id, val);
    },
    [id, onChange],
  );

  return (
    <View style={[tw`mx-4 mt-4 border border-[#EEE] rounded-1 overflow-hidden`, containerStyle]}>
      <View style={tw`flex-row justify-between px-4 py-3 bg-grayscale-bg items-center`}>
        <Text style={tw`font-medium`}>{`${index + 1}. ${name}`}</Text>
        <Text style={tw`text-13px`}>{`x${quantity} ${unit}`}</Text>
      </View>
      <View style={tw`flex-row m-4`}>
        <Radio
          label={'Không có sẵn'}
          containerStyle={tw`flex-1`}
          value={value !== undefined ? !value : undefined}
          onPress={() => onChangeValue?.(false)}
        />
        <Radio label={'Có sẵn'} containerStyle={tw`flex-1`} value={value} onPress={() => onChangeValue?.(true)} />
      </View>
    </View>
  );
};

type RadioProps = {
  value?: boolean;
  onPress?: () => void;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Radio = ({ value, onPress, label, containerStyle }: RadioProps) => (
  <TouchableOpacity style={[tw`flex-row items-center gap-3`, containerStyle]} onPress={onPress}>
    <View
      style={[
        tw`w-5 h-5 rounded-full border items-center justify-center`,
        value ? tw`border-primary` : tw`border-grayscale-gray`,
      ]}
    >
      {value && <View style={tw`w-10px h-10px rounded-full bg-primary`} />}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);
