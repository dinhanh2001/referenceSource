import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { tw } from '../tw';
import { DefaultAvatar, EditPenSvg } from '../../svg';
import { onLaunchCamera, onMediaImage } from '../../helpers';
import { useBottomAction, useOverlay } from '../../contexts';

type Props = {
  onChange?(assets: ImagePicker.ImagePickerAsset[]): void;
  value?: string;
  errorMessage?: string;
  title?: string;
  rounded?: boolean;
  required?: boolean;
};

export const UploadImage = ({
  onChange,
  value,
  errorMessage,
  title = 'Ảnh đại diện',
  rounded = false,
  required = false,
}: Props) => {
  const { showDialog } = useOverlay();
  const { showActionDialog } = useBottomAction();

  const [uri, setUri] = useState<string>();

  const handleChangeAvatar = useCallback(async () => {
    try {
      const actions = [
        { key: 'pickPhoto', title: 'Chọn ảnh' },
        { key: 'takePhoto', title: 'Chụp ảnh' },
      ];

      const act = await showActionDialog({ title: 'Chọn hoặc chụp ảnh đại diện', actions });

      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      };

      if (act === 'pickPhoto') {
        setTimeout(async () => {
          const result = await onMediaImage(options, showDialog);
          if (result && result.assets) {
            onChange?.(result.assets);
            setUri(result.assets[0]?.uri);
          }
        }, 600);
      } else if (act === 'takePhoto') {
        setTimeout(async () => {
          const result = await onLaunchCamera(options, showDialog);
          if (result && result.assets && result.assets[0]) {
            onChange?.(result.assets);
            setUri(result.assets[0]?.uri);
          }
        }, 600);
      }
    } catch (error) {
      //error
    }
  }, [onChange, showActionDialog, showDialog]);

  useEffect(() => {
    setUri(value);
  }, [value]);

  return (
    <>
      <View style={tw`flex-row items-center mb-16px`}>
        {uri ? (
          <Image source={{ uri }} style={tw`w-56px h-56px ${rounded ? 'rounded-full' : ''}`} />
        ) : (
          <DefaultAvatar height={rounded ? 56 : 72} width={rounded ? 56 : 72} />
        )}
        <View style={tw`ml-12px`}>
          <Text style={tw`text-14px font-semibold text-grayscale-black leading-24px`}>
            {required && <Text style={tw`text-error`}>* </Text>} {title}
          </Text>
          <TouchableOpacity onPress={handleChangeAvatar} style={tw`flex-row items-center mt-4px`}>
            <Text style={tw`text-13px text-blue mr-8px`}>Thay đổi</Text>
            <EditPenSvg />
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage && <Text style={tw`text-12px text-error mb-6px`}>{errorMessage}</Text>}
    </>
  );
};
