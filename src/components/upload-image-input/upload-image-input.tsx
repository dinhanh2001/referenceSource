import { View, Text, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

import { useOverlay } from '../../contexts/overlay-content';
import { useBottomAction } from '../../contexts/bottom-action';
import { tw } from '../tw';
import { CloseSVG, FilmSVG, AddImageSVG, ImagePrimaryIconSvg } from '../../svg';
import { onLaunchCamera, onMediaImage } from '../../helpers';

type UploadMediaInputProp = {
  value?: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[];
  onChangeValue: (value: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[]) => void;
  onDelete: (value: ImagePicker.ImagePickerAsset) => void;
  mediaTypes?: ImagePicker.ImagePickerOptions['mediaTypes'];
  hintText?: string;
  popupTitle?: string;
  pickPhotoTitle?: string;
  takePhotoTitle?: string;
};

export const UploadMediaInput = ({
  value,
  onChangeValue,
  onDelete,
  mediaTypes,
  hintText,
  popupTitle,
  pickPhotoTitle,
  takePhotoTitle,
}: UploadMediaInputProp) => {
  const { showActionDialog } = useBottomAction();

  const { showDialog } = useOverlay();
  const onShowAction = useCallback(async () => {
    try {
      const actions = [
        { key: 'pickPhoto', title: pickPhotoTitle ?? 'Chọn ảnh' },
        { key: 'takePhoto', title: takePhotoTitle ?? 'Chụp ảnh' },
      ];

      const act = await showActionDialog({ title: popupTitle ?? 'Chọn hoặc chụp ảnh đại diện', actions });

      if (act === 'pickPhoto') {
        setTimeout(async () => {
          const result = await onMediaImage(
            {
              mediaTypes: mediaTypes ?? ImagePicker.MediaTypeOptions.Images,
              aspect: [4, 3],
              quality: 0.9,
              allowsMultipleSelection: true,
            },
            showDialog,
          );
          if (result && result.assets) {
            onChangeValue(result.assets);
          }
        }, 600);
      } else if (act === 'takePhoto') {
        setTimeout(async () => {
          const result = await onLaunchCamera(
            {
              mediaTypes: mediaTypes ?? ImagePicker.MediaTypeOptions.Images,
              aspect: [4, 3],
              quality: 0.9,
            },
            showDialog,
          );
          if (result && result.assets) {
            onChangeValue(result.assets);
          }
        }, 600);
      }
    } catch (error) {
      //error
    }
  }, [pickPhotoTitle, takePhotoTitle, showActionDialog, popupTitle, mediaTypes, showDialog, onChangeValue]);

  return (
    <View>
      <Text style={tw`text-14px font-medium my-16px`}>Ảnh/ Video</Text>
      <View style={tw` bg-[#F9F9F9] py-10px px-16px flex-row items-center rounded`}>
        <AddImageSVG />
        <Text style={tw`flex-1 text-14px text-grayscale-gray ml-16px`}>
          {!!value && Array.isArray(value) ? value?.length : 0} ảnh/ video
        </Text>
        <Button
          onPress={onShowAction}
          containerStyle={tw`h-30px justify-center`}
          titleStyle={tw`text-12px`}
          title={'Tải lên'}
        />
      </View>
      <Text style={tw`text-12px text-grayscale-gray mt-8px`}>
        {hintText ?? 'Tối đa 20 ảnh, kích cỡ mỗi ảnh tối đa 5MB. Định dạng PNG, JPG, JPEG,...'}
      </Text>
      {Array.isArray(value) && (
        <View style={tw`flex-row flex-wrap`}>
          {!!value &&
            value.map((media: ImagePicker.ImagePickerAsset) => {
              return (
                <View
                  key={media.assetId}
                  style={tw`flex-row items-center bg-[#F9F9F9] self-start rounded-full p-8px mr-8px mt-8px`}
                >
                  {media.type === 'image' ? <ImagePrimaryIconSvg /> : <FilmSVG />}
                  <Text style={tw`text-13px text-[#161629] mx-10px`}>
                    {media.fileName || media.uri.replace(/^.*[/\\/]/, '')}
                  </Text>
                  <Pressable onPress={() => onDelete(media)}>
                    <CloseSVG />
                  </Pressable>
                </View>
              );
            })}
        </View>
      )}
    </View>
  );
};
