import { Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton, tw } from '../../components';
import { FileType } from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';

import { VideoPlayer } from './video-player';

const { width } = Dimensions.get('window');

export type PropsType = StackScreenProps<AppStackNavigatorParamList, 'media-preview'>;

export const MediaPreview: React.FC<PropsType> = (props) => {
  const { data, activeIndex } = props.route.params;
  const [indexCarousel, setIndexCarousel] = useState(activeIndex ?? 0);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`bg-black flex-1`}>
      <View style={tw`flex-row items-center justify-between px-4 py-2x`}>
        <BackButton iconColor="white" containerStyle={tw`bg-[#FFFFFF66]`} />
        <Text style={tw`text-white text-3`}>
          {indexCarousel + 1}/{data.length}
        </Text>
        <View />
      </View>
      <Carousel
        data={data}
        defaultIndex={indexCarousel}
        onSnapToItem={setIndexCarousel}
        loop={false}
        renderItem={({ item, index }) => {
          return (
            <View style={tw`flex-1 items-center justify-center`}>
              {item.type === FileType.IMAGE && (
                <Image
                  source={{ uri: item.fullOriginalUrl ?? '' }}
                  style={tw`w-${width}px h-${width}px`}
                  resizeMode="contain"
                />
              )}
              {item.type === FileType.VIDEO && (
                <View>
                  <VideoPlayer uri={item.videoUrl ?? ''} shouldPlay={indexCarousel === index} />
                </View>
              )}
            </View>
          );
        }}
        width={width}
      />
    </SafeAreaView>
  );
};
