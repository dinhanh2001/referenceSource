import React from 'react';
import { ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ArrowRight } from '../../../svg';
import { tw } from '../../tw';
import { ProductEntity } from '../../../graphql/type.interface';

import { ProductItem } from './product-item';

type Props = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  data: ProductEntity[];
  onPress?: () => void;
};

export const ListProductHorizontal = ({ title, containerStyle, data, onPress }: Props) => {
  if (!data?.length) return null;

  return (
    <View style={containerStyle}>
      {!!title && (
        <View style={tw`flex-row items-center mb-4 mt-8 mx-4`}>
          <Text style={tw`font-semibold text-17px mr-12px`}>{title}</Text>
          <TouchableOpacity
            style={tw`bg-primary-light rounded-full w-20px h-20px justify-center items-center`}
            onPress={onPress}
          >
            <ArrowRight width={12} height={12} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        contentContainerStyle={tw`gap-3 px-4`}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {data?.map?.((it: ProductEntity) => (
          <ProductItem key={it?.id} data={it} />
        ))}
      </ScrollView>
    </View>
  );
};
