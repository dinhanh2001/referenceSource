import { transformFileToFormData } from '../helpers';
import { useUploadFileMutation } from '../services';

export const useUploadFile = () => {
  const { mutateAsync: uploadAsync, ...res } = useUploadFileMutation();
  const uploadFile = async (file: any) => {
    const formData = transformFileToFormData(file);

    return await uploadAsync(formData);
  };

  return { uploadFile, ...res };
};
