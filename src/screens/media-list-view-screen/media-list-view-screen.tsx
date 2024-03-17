import { Image, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '../../components';
import { FileType } from '../../graphql/type.interface';

import { PropsType } from './type';
import { VideoPlayer } from './video-player';

const { width } = Dimensions.get('window');

export const MediaListViewScreen: React.FC<PropsType> = (props) => {
  const { listImage, index: selectedImageIndex } = props.route.params;
  const [indexCarousel, setIndexCarousel] = useState(selectedImageIndex);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`text-white`}>
            {indexCarousel + 1}/{listImage.length}
          </Text>
        </View>
      ),
      headerStyle: tw`bg-black`,
    });
  }, [indexCarousel, listImage.length, props.navigation, selectedImageIndex]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`bg-black flex-1`}>
      <Carousel
        data={listImage}
        defaultIndex={selectedImageIndex}
        onSnapToItem={setIndexCarousel}
        loop={false}
        renderItem={({ item, index }) => {
          return (
            <View style={tw`flex-1 w-full h-full items-center justify-center`}>
              {item.type === FileType.IMAGE && (
                <Image source={{ uri: item.fullOriginalUrl ?? '' }} style={tw`w-screen h-80%`} resizeMode="contain" />
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
