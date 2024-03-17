import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { AddressEntity } from '../../../graphql/type.interface';
import { Location, Trash } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (it: AddressEntity) => void;
  selected?: boolean;
  item?: AddressEntity;
  onDelete?: (item?: AddressEntity) => void;
};

export const ECommerceCartAddressItem = ({ containerStyle, onPress, selected, item, onDelete }: Props) => {
  const { isDefault, addressName, mapAddress } = item || {};

  const handlePress = useCallback(() => {
    onPress?.(item as AddressEntity);
  }, [item, onPress]);

  const handleDelete = useCallback(() => {
    onDelete?.(item);
  }, [item, onDelete]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        tw`flex-row p-4 border border-${selected ? 'primary-dark' : '[#EEE]'} rounded-1 items-center`,
        containerStyle,
      ]}
    >
      <View style={tw`h-32px w-32px rounded-full bg-primary items-center justify-center`}>
        <Location fill={tw.color('white')} />
      </View>
      <View style={tw`ml-3 mr-4 flex-1 gap-2px`}>
        <Text style={tw`text-grayscale-black font-semibold`}>{`${addressName}  ${isDefault ? '(mặc định)' : ''}`}</Text>
        <Text style={tw`text-13px text-grayscale-gray`} numberOfLines={1}>
          {mapAddress}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} hitSlop={12}>
        <Trash fill={tw.color('grayscale-gray')} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
