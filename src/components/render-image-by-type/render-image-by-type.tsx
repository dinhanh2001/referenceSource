import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FileType, Media } from '../../graphql/type.interface';
import { AppRoutes, UseAppStackNavigatorScreenProps } from '../../navigator-params';
import { FilmSVG } from '../../svg';
import { tw } from '../tw';

type Props = {
  imagesParent?: Media[];
  images?: Media;
  imageSize?: number;
  index: number;
};

export const RenderImageByType = ({ images, imagesParent, index, imageSize = 50 }: Props) => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<AppRoutes.FEEDBACK_DETAIL>>();

  return (
    <TouchableOpacity
      onPress={() => {
        if (imagesParent) {
          navigation.navigate(AppRoutes.MEDIA_LIST_VIEW_SCREEN, {
            listImage: imagesParent,
            index,
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
          <FilmSVG width={30} height={30} />
        </View>
      )}
    </TouchableOpacity>
  );
};
