import { UseMutationOptions, useMutation } from 'react-query';
import { AxiosError } from 'axios';

import { Media } from '../../graphql/type.interface';
import { request } from '../request';

const UPLOAD_ENDPOINT = '/api/media/upload/video';

export type UploadVideoMutationInput = FormData;

export type UploadVideoMutationOptions = UseMutationOptions<Media, AxiosError, UploadVideoMutationInput>;

export function useUploadVideoMutation(options?: UploadVideoMutationOptions, onProgress?: (percent: number) => void) {
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
