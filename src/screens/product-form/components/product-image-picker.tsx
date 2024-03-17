import { Image } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Space, tw } from '../../../components';
import * as Svg from '../../../svg';

type Props = {
  image: string;
  setImage: (images: ImagePicker.ImagePickerAsset) => void;
  error?: string;
};

export const ProductImagePicker = ({ image, setImage, error }: Props) => {
  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result?.assets?.[0]);
    }
  }, [setImage]);

  return (
    <View>
      <View style={tw`flex-row items-center`}>
        {image ? (
          <Image source={{ uri: image }} style={tw`w-72px h-72px`} />
        ) : (
          <Svg.ImagePlaceholderSVG width={72} height={72} />
        )}
        <Space size={12} horizontal />
        <View>
          <Text style={tw`font-semibold`}>Ảnh đại điện</Text>
          <Space size={4} />
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={tw`text-blue`}>Thay đổi</Text>
            </TouchableOpacity>
            <Space size={8} horizontal />
            <Svg.Edit2SVG />
          </View>
        </View>
      </View>
      {!!error && <Text style={tw`text-error text-13px mb-16px mt-8px`}>{error}</Text>}
      <Space />
    </View>
  );
};
