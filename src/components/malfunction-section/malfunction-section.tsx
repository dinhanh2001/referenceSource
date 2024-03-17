import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { BookingEntity, FileType } from '../../graphql/type.interface';
import { ArrowRightSVG, ClipSVG, FilmSVG } from '../../svg';
import { DEVICE_WIDTH } from '../../utils';
import { ShortList } from '../short-list';
import { tw } from '../tw';

type PropsType = {
  navigateToMalfunctionScreen?: () => void;
  data: BookingEntity;
  previewMedia?: boolean;
  hideDescription?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const ITEM_GAP = 8 * 5;
const IMAGE_SIZE = ((DEVICE_WIDTH - 32) * 0.9 - ITEM_GAP) / 6;

export const MalfunctionSection: React.FC<PropsType> = memo(
  ({ navigateToMalfunctionScreen, previewMedia = false, data, hideDescription = false, containerStyle }: PropsType) => {
    const { problemTexts = [], medias = [], description } = data || {};

    return (
      <TouchableOpacity onPress={navigateToMalfunctionScreen} style={[tw`justify-between`, containerStyle]}>
        {problemTexts && problemTexts.length > 0 && (
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-1 `}>
              <ShortList
                data={problemTexts}
                textStyle={tw`text-grayscale-black`}
                itemStyle={tw`border-grayscale-border`}
              />
            </View>
            <ArrowRightSVG width={15} height={15} />
          </View>
        )}

        {!previewMedia ? (
          <View style={tw`flex-row items-center border self-start rounded px-2 py-1 border-grayscale-border mt-2`}>
            <ClipSVG />
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
        )}
        {!!description && !hideDescription && (
          <View style={tw`bg-grayscale-bg mt-12px px-16px py-12px mb-20px`}>
            <Text numberOfLines={1} style={tw`text-13px`}>
              {description}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);
