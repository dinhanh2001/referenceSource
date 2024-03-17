import { Text } from '@rneui/themed';
import React, { Dispatch, SetStateAction, memo, useCallback } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';

import * as Svg from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';

export type SelectImageProps = {
  listImage: ImagePicker.ImagePickerAsset[];
  setListImage: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  error?: string;
};

export const SelectImage: React.FC<SelectImageProps> = memo(({ listImage, setListImage, error }: SelectImageProps) => {
  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setListImage(
        [...(listImage || []), ...result.assets].filter(
          (it, idx, self) => self.findIndex((s) => s.assetId === it.assetId) === idx,
        ),
      );
    }
  }, [listImage, setListImage]);

  const removeImage = useCallback(
    (i: number) => {
      const new_list = [...listImage];
      _.remove(new_list, function (_n: any, index: number) {
        return index === i;
      });
      setListImage(new_list);
    },
    [listImage, setListImage],
  );

  return (
    <View>
      <Text style={tw`font-medium`}>Ảnh mô tả</Text>
      <Text style={tw`text-12px text-grayscale-gray`}>
        Tối đa 10 tài liệu, kích cỡ mỗi tài liệu tối đa 5MB. Định dạng JPG, JPEG, GIF, PNG
      </Text>
      <Space size={8} />
      <View style={tw`flex-row`}>
        <Svg.AddImageSVG onPress={pickImage} />
        <Space size={8} horizontal />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={listImage}
          ItemSeparatorComponent={() => <Space size={8} horizontal />}
          renderItem={({ item, index }) => {
            return (
              <ImageBackground
                style={tw`h-48px w-48px`}
                imageStyle={tw`rounded-4px`}
                key={index.toString()}
                source={{ uri: item.uri }}
              >
                <TouchableOpacity style={tw`self-end p-5px`} onPress={() => removeImage(index)}>
                  <Svg.CloseCircleSVG fill={tw.color('white')} width={'10px'} height={'10px'} />
                </TouchableOpacity>
              </ImageBackground>
            );
          }}
          keyExtractor={(item) => item && item.uri}
        />
      </View>
      {!!error && <Text style={tw`text-error text-13px mb-16px mt-8px`}>{error}</Text>}
    </View>
  );
});
