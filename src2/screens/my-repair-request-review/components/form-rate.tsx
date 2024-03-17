import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { View } from 'react-native';

import { TextInput, tw } from '../../../components';
import { PartnerEntity } from '../../../graphql/type.interface';

import { ContactView } from './contact-view';
import { Rate } from './rate';

type Props<T extends FieldValues> = {
  partner: PartnerEntity;
  labelRate: string;
  placeholder: string;
  control: Control<T, any>;
};

export function FormRate<T extends FieldValues>({ control, partner, labelRate, placeholder }: Props<T>) {
  return (
    <View>
      <ContactView partner={partner} />

      <View style={tw`px-16px mt-20px`}>
        <Controller
          name={'star' as FieldPath<T>}
          control={control}
          render={({ field: { onChange } }) => <Rate label={labelRate} onChange={onChange} />}
        />
        <Controller
          name={'comment' as FieldPath<T>}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} placeholder={placeholder} containerStyle={tw`mt-20px `} onChangeText={onChange} />
          )}
        />
      </View>
    </View>
  );
}
