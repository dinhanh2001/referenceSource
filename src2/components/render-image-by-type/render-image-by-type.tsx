import React from 'react';
import { Image } from '@rneui/themed';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FileType, Media } from '../../graphql/type.interface';
import { tw } from '../tw';
import { FilmIconSvg } from '../../svg';
import { UseAppStackNavigatorScreenProps } from '../../navigator-params';

type Props = {
  imagesParent?: Media[];
  images?: Media;
  imageSize?: number;
  index: number;
};

export const RenderImageByType = ({ images, imagesParent, index, imageSize = 50 }: Props) => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'feedback'>>();

  return (
    <TouchableOpacity
      onPress={() => {
        if (imagesParent) {
          navigation.navigate('media-preview', {
            data: imagesParent,
            activeIndex: index,
          });
        }
      }}
    >
      {images?.type === FileType.IMAGE ? (
        <Image
          resizeMode="cover"
          source={{ uri: images.fullThumbUrl as string }}
          style={[tw`rounded`, { width: imageSize, height: imageSize }]}
        />
      ) : (
        <View style={[tw`items-center justify-center rounded bg-black`, { width: imageSize, height: imageSize }]}>
          <FilmIconSvg width={30} height={30} />
        </View>
      )}
    </TouchableOpacity>
  );
};
