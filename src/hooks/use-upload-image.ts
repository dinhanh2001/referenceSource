import { ImagePickerAsset } from 'expo-image-picker';

import { useUploadImageMutation } from '../services';
import { transformFileToFormData } from '../helpers';

export const useUploadImage = () => {
  const { mutateAsync: uploadImageAsync, ...res } = useUploadImageMutation();
  const uploadImage = async (image: ImagePickerAsset) => {
    const formData = transformFileToFormData(image);

    return await uploadImageAsync(formData);
  };

  return { uploadImage, ...res };
};
