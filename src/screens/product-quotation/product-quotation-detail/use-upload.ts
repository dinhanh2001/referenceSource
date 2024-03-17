import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useCallback } from 'react';

import { useBottomAction, useOverlay } from '../../../contexts';
import { onLaunchCamera, onMediaImage } from '../../../helpers';

export const useUpload = () => {
  const { showDialog } = useOverlay();
  const { showActionDialog } = useBottomAction();

  const upload = useCallback(
    async (onChange: (res: any) => void) => {
      try {
        const actions = [
          { key: 'takePhoto', title: 'Chụp ảnh' },
          { key: 'pickPhoto', title: 'Chọn ảnh' },
          { key: 'pickFile', title: 'Chọn file' },
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
              onChange(result.assets?.[0]);
            }
          }, 600);
        } else if (act === 'takePhoto') {
          setTimeout(async () => {
            const result = await onLaunchCamera(options, showDialog);
            if (result && result.assets && result.assets[0]) {
              onChange(result.assets?.[0]);
            }
          }, 600);
        } else if (act === 'pickFile') {
          setTimeout(async () => {
            const res = await DocumentPicker.getDocumentAsync({
              type: '*/*',
            });
            if (res?.type === 'success') {
              onChange({
                ...res,
                fileName: res?.name,
                fileSize: res?.size,
              });
            }
          }, 600);
        }
      } catch (error) {
        //error
      }
    },
    [showActionDialog, showDialog],
  );

  return { upload };
};
