import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';

import { tw } from '../../../components';
import { BookingEntity, FileType } from '../../../graphql/type.interface';
import { DEVICE_WIDTH } from '../../../utils';
import { FilmSVG } from '../../../svg';
import { ShortList } from '../../../components/short-list';
import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

type Props = {
  booking: BookingEntity;
  containerStyle?: StyleProp<ViewStyle>;
};
const ITEM_GAP = 8 * 5;
const IMAGE_SIZE = ((DEVICE_WIDTH - 32) * 0.9 - ITEM_GAP) / 6;

export const IssueView = React.memo(({ booking, containerStyle }: Props) => {
  const { description, problemTexts, medias } = booking || {};

  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  return (
    <TouchableOpacity
      style={[tw` justify-between`, containerStyle]}
      onPress={() => navigation.navigate(AppRoutes.MALFUNCTION_SCREEN, { bookingId: booking.id })}
    >
      <Text style={tw`text-white font-semibold`}>Hiện tượng hư hỏng</Text>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-1 mt-8px`}>
          <ShortList data={problemTexts as string[]} />
        </View>
      </View>
      <View style={tw`flex-row gap-2 my-3 overflow-hidden`}>
        {medias?.map?.((item, index) => {
          if (item.type === FileType.IMAGE) {
            return (
              <Image
                key={index}
                resizeMode="cover"
                source={{ uri: item.fullThumbUrl as string }}
                style={[tw`rounded`, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}
              />
            );
          }
          return (
            <View
              key={index}
              style={[tw`items-center justify-center rounded bg-black`, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}
            >
              <FilmSVG width={30} height={30} />
            </View>
          );
        })}
        {medias?.length > 6 && (
          <View
            style={[
              tw`absolute items-center justify-center rounded top-0 bottom-0 right-0`,
              { width: IMAGE_SIZE, height: IMAGE_SIZE },
            ]}
          >
            <Text style={tw`text-white text-13px`}>+{medias?.length - 6}</Text>
          </View>
        )}
      </View>
      {!!description && (
        <View style={tw`bg-[#293847] mt-12px px-16px py-12px mb-20px rounded-4px`}>
          <Text numberOfLines={1} style={tw`text-13px text-white`}>
            {description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});
