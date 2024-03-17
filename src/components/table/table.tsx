import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { tw } from '../tw';
import { Space } from '../spacer';

type Props = {
  data: any;
  right?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Table = memo(({ data, right, containerStyle }: Props) => {
  return (
    <View style={[tw`border-t border-r border-l border-grayscale-border`, containerStyle]}>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => {
          const key = Object.keys(item)[0];
          const { bold, bg, textColorRight } = item || {};

          return (
            <View style={tw`flex flex-row border-b border-grayscale-border`}>
              <View style={tw`w-1/2 justify-center px-16px py-10px bg-${bg ? `[${bg}]` : 'grayscale-bg'}`}>
                <Text style={bold && tw`font-semibold`}>{key}</Text>
              </View>
              <Space backgroundColor={bg ? '#fff' : tw.color('bg-grayscale-border')} size={1} horizontal />
              <View
                style={[
                  tw`w-1/2 justify-center ${right ? 'items-end' : 'items-start'} px-16px py-10px `,
                  !!bg && tw`bg-[${bg}]`,
                ]}
              >
                <Text style={[bold && tw`font-semibold`, !!textColorRight && tw`text-[${textColorRight}]`]}>
                  {item?.[key]}
                </Text>
                {item?.moreInfo && <Text style={tw`text-grayscale-gray`}>{item?.moreInfo}</Text>}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
});
