import { useMemo } from 'react';
import * as zod from 'zod';
import { ZodType } from 'zod';

import { validationMessage } from '../../../constants';
import { isLessThanTheMB, showFlashMessageError } from '../../../helpers';
import { useUploadFile } from '../../../hooks';
import { usePartnerRespondProductQuotationMutation } from '../../../graphql/mutations/partnerRespondProductQuotation.generated';
import { useFullScreenLoading } from '../../../contexts';
import { client } from '../../../apollo/apollo';
import { PartnerProductQuotationDocument } from '../../../graphql/queries/partnerProductQuotation.generated';
import { PartnerProductQuotationsDocument } from '../../../graphql/queries/partnerProductQuotations.generated';
import { PartnerCountProductQuotationForEachStatusDocument } from '../../../graphql/queries/partnerCountProductQuotationForEachStatus.generated';

import { FormResponse } from './type';

export const MAX_FILES = 3;

export const useSchema = () => {
  const validationSchema: ZodType<FormResponse> = useMemo(
    () =>
      zod.object({
        response: zod.string().nonempty({ message: validationMessage.required }),
        medias: zod
          .array(zod.any(), { required_error: validationMessage.required })
          .min(1, validationMessage.required)
          .refine((data) => {
            return data == null || data.length <= MAX_FILES;
          }, `Số lượng file không được vượt quá ${MAX_FILES} tệp`)
          .refine((data) => {
            return !data?.filter?.((it) => it.duration == null).some((it) => !isLessThanTheMB(it?.fileSize || 0, 5));
          }, 'File không được vượt quá 5MB'),
      }),

    [],
  );

  return {
    validationSchema,
  };
};

export const useSubmitForm = (id: string) => {
  const { uploadFile } = useUploadFile();
  const { showFullscreenLoading } = useFullScreenLoading();
  const [respond] = usePartnerRespondProductQuotationMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      client.refetchQueries({
        include: [
          PartnerProductQuotationDocument,
          PartnerProductQuotationsDocument,
          PartnerCountProductQuotationForEachStatusDocument,
        ],
      });
    },
  });

  const onSubmit = async ({ medias, response }: FormResponse) => {
    try {
      showFullscreenLoading(true);
      const mediaIds = await Promise.all(medias?.map(async (it) => uploadFile(it)));

      await respond({
        variables: {
          input: {
            id,
            response: response?.trim?.() || '',
            mediaIds: mediaIds?.map((it) => it?.id) || [],
          },
        },
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      showFullscreenLoading(false);
    }
  };

  return {
    onSubmit,
  };
};
