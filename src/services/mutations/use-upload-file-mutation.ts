import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { request } from '../request';

const UPLOAD_ENDPOINT = '/api/media/upload/file';

export type UploadFileMutationResponse = {
  id: string;
  fileSize: number;
  name: string;
  originalUrl: string;
  thumbUrl: string;
  mimeType: string;
  isDeleted: false;
  ownerId: null;
  type: string;
  fullThumbUrl: string;
  fullOriginalUrl: string;
};
export type UploadFileMutationInput = FormData;

export type UploadFileMutationOptions = UseMutationOptions<
  UploadFileMutationResponse,
  AxiosError,
  UploadFileMutationInput
>;

export function useUploadFileMutation(options?: UploadFileMutationOptions, onProgress?: (percent: number) => void) {
  return useMutation(
    (values) =>
      request
        .post(UPLOAD_ENDPOINT, values, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            onProgress && onProgress(percentCompleted);
          },
        })
        .then((res) => res.data),
    options,
  );
}
