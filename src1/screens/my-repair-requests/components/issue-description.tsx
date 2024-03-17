import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ShortList, tw } from '../../../components';
import { BookingEntity, FileType } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';
import { BottomTabScreensParams } from '../../../navigator-params/bottom-tab-navigator';
import { ArrowRight, ClipIcon, FilmIconSvg } from '../../../svg';
import { DEVICE_WIDTH } from '../../../utils';

type IssueDescriptionProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabScreensParams, 'my-repair-requests'>,
  NativeStackScreenProps<AppStackNavigatorParamList>
>;

type Props = {
  previewMedia?: boolean;
  booking: BookingEntity;
};
const ITEM_GAP = 8 * 5;
const IMAGE_SIZE = ((DEVICE_WIDTH - 32) * 0.9 - ITEM_GAP) / 6;

export const IssueDescription = React.memo(({ previewMedia, booking }: Props) => {
  const navigation = useNavigation<IssueDescriptionProps['navigation']>();

  const { id, description, problemTexts, medias } = booking || {};

  const onDetail = useCallback(() => {
    navigation.navigate('my-repair-request/issue-detail', { bookingId: id });
  }, [id, navigation]);

  return (
    <TouchableOpacity onPress={onDetail} style={tw` justify-between`}>
      {problemTexts && problemTexts.length > 0 && (
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-1`}>
            <ShortList data={problemTexts} />
          </View>
          <ArrowRight width={18} height={18} />
        </View>
      )}

      {!previewMedia ? (
        <View style={tw`flex-row items-center border self-start rounded px-2 py-1 border-grayscale-border mt-2`}>
          <ClipIcon />
          <Text style={tw`text-13px`}>
            {' '}
            {medias?.length || 0} ảnh{medias.some((it) => it.type === FileType.VIDEO) ? '/video' : ''}
          </Text>
        </View>
      ) : (
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
                <FilmIconSvg width={30} height={30} />
              </View>
            );
          })}
          {medias?.length > 6 && (
            <View
              style={[
                tw`absolute items-center justify-center rounded bg-black_40 top-0 bottom-0 right-0`,
                { width: IMAGE_SIZE, height: IMAGE_SIZE },
              ]}
            >
              <Text style={tw`text-white text-13px`}>+{medias?.length - 6}</Text>
            </View>
          )}
        </View>
      )}
      {!!description && (
        <View style={tw`bg-grayscale-bg mt-12px px-16px py-12px mb-20px`}>
          <Text numberOfLines={1} style={tw`text-13px`}>
            {description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});
