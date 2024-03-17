import { ImagePickerAsset } from 'expo-image-picker';
import { useCallback } from 'react';

import { useFullScreenLoading } from '../../../contexts';
import { usePartnerCreateProductAccessaryMutation } from '../../../graphql/mutations/partnerCreateProductAccessary.generated';
import { usePartnerCreateProductVehicleMutation } from '../../../graphql/mutations/partnerCreateProductVehicle.generated';
import { usePartnerUpdateProductVehicleMutation } from '../../../graphql/mutations/partnerUpdateProductVehicle.generated';
import {
  OperatingUnitEnum,
  PartnerCreateAccessaryInput,
  PartnerCreateProductVehicleInput,
  PartnerUpdateProductVehicleInput,
  ProductTypeEnum,
} from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useUploadImage } from '../../../hooks';
import { FormAccessoryData } from '../add-accessory-screen/type';
import { FormVehicleData } from '../add-vehicle-screen/type';
import { usePartnerUpdateAccessaryMutation } from '../../../graphql/mutations/partnerUpdateAccessary.generated';

export const useSaveVehicleForm = (onCompleted: any) => {
  const { uploadImage } = useUploadImage();
  const { showFullscreenLoading } = useFullScreenLoading();

  const [createVehicle] = usePartnerCreateProductVehicleMutation({
    onError: showFlashMessageError,
    onCompleted,
  });
  const [updateVehicle] = usePartnerUpdateProductVehicleMutation({
    onError: showFlashMessageError,
    onCompleted,
  });

  const onSave = useCallback(
    async (values: FormVehicleData, id?: string) => {
      try {
        showFullscreenLoading(true);

        const { avatar, descriptionImageIds, status, price, yearOfManufacture, ordinalNumber, quantity, ...rest } =
          values || {};

        if (id) {
          const listSubImage = descriptionImageIds?.filter?.((image) => !image?.id);
          const listSubRest = descriptionImageIds?.filter?.((image) => image?.id);
          const media = avatar?.id ? avatar : await uploadImage(avatar as ImagePickerAsset);
          const descriptionImages =
            listSubImage?.length > 0 ? await Promise.all(listSubImage.map((image) => uploadImage(image))) : [];

          const input: PartnerUpdateProductVehicleInput = {
            ...rest,
            id,
            avatarId: media?.id,
            descriptionImageIds: [...listSubRest, ...descriptionImages].map((image) => image?.id),
            isActive: true,
            type: ProductTypeEnum.VEHICLE,
            isNew: status.isNew as boolean,
            operatingNumber: status.isNew ? undefined : parseFloat(status.operatingNumber || ''),
            operatingUnit: status.isNew ? undefined : (status.operatingUnit as OperatingUnitEnum),
            isFixedCost: price.isFixedCost as boolean,
            unitPrice: price.isFixedCost ? parseFloat(price.unitPrice || '') : undefined,
            yearOfManufacture: parseFloat(yearOfManufacture || ''),
            ordinalNumber: parseFloat(ordinalNumber || ''),
            quantity: parseFloat(quantity || ''),
          };

          await updateVehicle({
            variables: {
              input,
            },
          });
        } else {
          const media = await uploadImage(avatar as ImagePickerAsset);
          const descriptionImages = await Promise.all(descriptionImageIds.map((image) => uploadImage(image)));

          const input: PartnerCreateProductVehicleInput = {
            ...rest,
            avatarId: media?.id,
            descriptionImageIds: descriptionImages.map((image) => image?.id),
            isActive: true,
            type: ProductTypeEnum.VEHICLE,
            isNew: status.isNew as boolean,
            operatingNumber: status.isNew ? undefined : parseFloat(status.operatingNumber || ''),
            operatingUnit: status.isNew ? undefined : (status.operatingUnit as OperatingUnitEnum),
            isFixedCost: price.isFixedCost as boolean,
            unitPrice: price.isFixedCost ? parseFloat(price.unitPrice || '') : undefined,
            yearOfManufacture: parseFloat(yearOfManufacture || ''),
            ordinalNumber: parseFloat(ordinalNumber || ''),
            quantity: parseFloat(quantity || ''),
          };

          await createVehicle({
            variables: {
              input,
            },
          });
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        showFullscreenLoading(false);
      }
    },
    [createVehicle, showFullscreenLoading, updateVehicle, uploadImage],
  );

  return {
    onSave,
  };
};

export const useSaveAccessoryForm = (onCompleted: any) => {
  const { uploadImage } = useUploadImage();
  const { showFullscreenLoading } = useFullScreenLoading();

  const [createAccessary] = usePartnerCreateProductAccessaryMutation({
    onError: showFlashMessageError,
    onCompleted,
  });
  const [updateAccessary] = usePartnerUpdateAccessaryMutation({
    onError: showFlashMessageError,
    onCompleted,
  });

  const onSave = useCallback(
    async (values: FormAccessoryData, id?: string) => {
      try {
        showFullscreenLoading(true);
        const { avatar, descriptionImageIds, price, quantity, ...rest } = values || {};

        if (id) {
          const listSubImage = descriptionImageIds?.filter?.((image) => !image?.id);
          const listSubRest = descriptionImageIds?.filter?.((image) => image?.id);
          const media = avatar?.id ? avatar : await uploadImage(avatar as ImagePickerAsset);
          const descriptionImages =
            listSubImage?.length > 0 ? await Promise.all(listSubImage.map((image) => uploadImage(image))) : [];

          const input: PartnerUpdateProductVehicleInput = {
            ...rest,
            id,
            avatarId: media?.id,
            descriptionImageIds: [...listSubRest, ...descriptionImages].map((image) => image?.id),
            isActive: true,
            type: ProductTypeEnum.ACCESSARY,
            isFixedCost: price.isFixedCost as boolean,
            unitPrice: price.isFixedCost ? parseFloat(price.unitPrice || '') : undefined,
            quantity: parseFloat(quantity || ''),
          };

          await updateAccessary({
            variables: {
              input,
            },
          });
        } else {
          const media = await uploadImage(avatar as ImagePickerAsset);
          const descriptionImages = await Promise.all(descriptionImageIds.map((image) => uploadImage(image)));

          const input: PartnerCreateAccessaryInput = {
            ...rest,
            avatarId: media?.id,
            descriptionImageIds: descriptionImages.map((image) => image?.id),
            isActive: true,
            type: ProductTypeEnum.ACCESSARY,
            isFixedCost: price.isFixedCost as boolean,
            unitPrice: price.isFixedCost ? parseFloat(price.unitPrice || '') : undefined,
            quantity: parseFloat(quantity || ''),
          };

          createAccessary({
            variables: {
              input,
            },
          });
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        showFullscreenLoading(false);
      }
    },
    [createAccessary, showFullscreenLoading, updateAccessary, uploadImage],
  );

  return {
    onSave,
  };
};
