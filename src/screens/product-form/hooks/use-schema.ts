import * as zod from 'zod';
import { ZodType } from 'zod';
import { useMemo } from 'react';

import { FormVehicleData } from '../add-vehicle-screen/type';
import { FormAccessoryData, ProductDeviceType } from '../add-accessory-screen/type';
import { isLessThanTheMB } from '../../../helpers';
import { useCheckVinExistLazyQuery } from '../../../graphql/queries/checkVinExist.generated';
import { useCheckVehicleRegistrationPlateExistLazyQuery } from '../../../graphql/queries/checkVehicleRegistrationPlateExist.generated';
import { useCheckSerialExistLazyQuery } from '../../../graphql/queries/checkSerialExist.generated';
import { validationMessage } from '../../../constants';

const MAX_LEN = 255;
const MAX_FILES = 10;
const MIN_PRICE = 1000;

export const useSchemaVehicle = () => {
  const [checkVin, { loading: vinLoading }] = useCheckVinExistLazyQuery();
  const [checkRegistration, { loading: registrationLoading }] = useCheckVehicleRegistrationPlateExistLazyQuery();
  const [checkSerial, { loading: serialLoading }] = useCheckSerialExistLazyQuery();

  const validationSchema: ZodType<FormVehicleData> = useMemo(
    () =>
      zod.object({
        avatarId: zod
          .string({ required_error: 'Ảnh đại diện là trường bắt buộc' })
          .nonempty({ message: 'Ảnh đại diện không được để trống' }),
        avatar: zod.any().optional(),
        descriptionImageIds: zod
          .array(zod.any(), { required_error: 'Ảnh mô tả là trường bắt buộc' })
          // .min(1, 'Ảnh mô tả là trường bắt buộc')
          .refine((data) => {
            return data == null || data.length <= MAX_FILES;
          }, `Số lượng ảnh không được vượt quá ${MAX_FILES} tệp`)
          .refine((data) => {
            return !data?.filter?.((it) => it.duration == null).some((it) => !isLessThanTheMB(it?.fileSize || 0, 5));
          }, 'Ảnh không được vượt quá 5MB'),
        name: zod
          .string({ required_error: 'Tên máy là trường bắt buộc' })
          .nonempty({ message: 'Tên máy không được để trống' })
          .max(MAX_LEN, `Tên máy không quá ${MAX_LEN} ký tự`),
        vehicleRegistrationPlate: zod
          .string()
          .max(MAX_LEN, `Biển số xe không quá ${MAX_LEN} ký tự`)
          .refine(async (data) => {
            return (
              data == null ||
              data.length === 0 ||
              !(
                await checkRegistration({
                  variables: {
                    vehicleRegistrationPlate: data,
                  },
                })
              ).data?.checkVehicleRegistrationPlateExist
            );
          }, 'Biển số đã tồn tại')
          .optional(),
        ordinalNumber: zod.string().max(MAX_LEN, `Số thứ tự không quá ${MAX_LEN} ký tự`).optional(),
        vehicleTypeId: zod.string({ required_error: 'Chủng loại máy là trường bắt buộc' }).nonempty({
          message: 'Chủng loại máy không được để trống',
        }),
        manufacturerId: zod.string({ required_error: 'Hãng sản xuất là trường bắt buộc' }).nonempty({
          message: 'Hãng sản xuất không được để trống',
        }),
        modelId: zod.string({ required_error: 'Model là trường bắt buộc' }).nonempty({
          message: 'Model không được để trống',
        }),
        serialNumber: zod
          .string()
          .max(MAX_LEN, `Số serial không quá ${MAX_LEN} ký tự`)
          .refine(async (data) => {
            return (
              data == null ||
              data.length === 0 ||
              !(
                await checkSerial({
                  variables: {
                    serialNumber: data,
                  },
                })
              ).data?.checkSerialExist
            );
          }, 'Số serial đã tồn tại')
          .optional(),
        vinNumber: zod
          .string({ required_error: 'Số VIN là trường bắt buộc' })
          .nonempty({ message: 'Số VIN không được để trống' })
          .max(MAX_LEN, `Số VIN không quá ${MAX_LEN} ký tự`)
          .refine(
            async (data) =>
              data == null ||
              data.length === 0 ||
              !(await checkVin({ variables: { serialNumber: data } })).data?.checkVinExist,
            'Số VIN đã tồn tại',
          ),
        originId: zod.string().optional(),
        yearOfManufacture: zod.string().optional(),
        status: zod
          .object({
            isNew: zod.boolean().optional(),
            operatingNumber: zod.string().optional(),
            operatingUnit: zod.string().optional(),
          })
          // .partial()
          .refine(
            ({ isNew, operatingNumber, operatingUnit }) =>
              (isNew === false && operatingNumber && operatingUnit) || isNew,
            {
              message: 'Tình trạng là trường bắt buộc',
              path: ['operatingUnit'],
            },
          ),
        detail: zod.string({ required_error: 'Chi tiết là trường bắt buộc' }).nonempty({
          message: 'Chi tiết không được để trống',
        }),
        price: zod
          .object({
            isFixedCost: zod.boolean().optional(),
            unitPrice: zod.string().optional(),
          })
          .partial()
          .refine(({ isFixedCost, unitPrice }) => (isFixedCost && unitPrice) || isFixedCost === false, {
            message: 'Giá sản phẩm là trường bắt buộc',
            path: ['unitPrice'],
          })
          .refine(
            ({ isFixedCost, unitPrice }) => {
              if (isFixedCost) {
                return (
                  unitPrice && Math.floor(parseInt(unitPrice, 10) / MIN_PRICE) === parseInt(unitPrice, 10) / MIN_PRICE
                );
              }

              return true;
            },
            {
              message: `Giá sản phẩm phải là bội số của ${MIN_PRICE}`,
              path: ['unitPrice'],
            },
          ),
        quantity: zod.string({ required_error: 'Tồn kho là trường bắt buộc' }).nonempty({
          message: 'Tồn kho không được để trống',
        }),
        productUnitId: zod.string({ required_error: 'Đơn vị là trường bắt buộc' }).nonempty({
          message: 'Đơn vị không được để trống',
        }),
      }),
    [checkRegistration, checkSerial, checkVin],
  );

  return {
    validationSchema,
    vinLoading,
    registrationLoading,
    serialLoading,
  };
};

export const useSchemaAccessory = () => {
  const productDeviceSchema: ZodType<ProductDeviceType> = useMemo(() => {
    return zod.object({
      modelId: zod.string(),
      manufacturerId: zod.string(),
      vehicleTypeId: zod.string(),
    });
  }, []);

  const validationSchema: ZodType<FormAccessoryData> = useMemo(
    () =>
      zod.object({
        avatarId: zod
          .string({ required_error: 'Ảnh đại diện là trường bắt buộc' })
          .nonempty({ message: 'Ảnh đại diện không được để trống' }),
        avatar: zod.any().optional(),
        descriptionImageIds: zod
          .array(zod.any(), { required_error: 'Ảnh mô tả là trường bắt buộc' })
          // .min(1, 'Ảnh mô tả là trường bắt buộc')
          .refine((data) => {
            return data == null || data.length <= MAX_FILES;
          }, `Số lượng ảnh không được vượt quá ${MAX_FILES} tệp`)
          .refine((data) => {
            return !data.filter((it) => it.duration == null).some((it) => !isLessThanTheMB(it?.fileSize || 0, 5));
          }, 'Ảnh không được vượt quá 5MB'),
        name: zod
          .string({ required_error: 'Tên phụ tùng là trường bắt buộc' })
          .nonempty({ message: 'Tên phụ tùng không được để trống' })
          .max(MAX_LEN, `Tên phụ tùng không quá ${MAX_LEN} ký tự`),
        serialNumber: zod.string().optional(),
        partNumber: zod.string().optional(),
        isNew: zod.boolean({ required_error: 'Tình trạng là trường bắt buộc' }),
        originId: zod.string().optional(),
        partId: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required }),
        detail: zod.string({ required_error: 'Chi tiết là trường bắt buộc' }).nonempty({
          message: 'Chi tiết không được để trống',
        }),
        productDevices: zod.array(productDeviceSchema).optional(),
        price: zod
          .object({
            isFixedCost: zod.boolean().optional(),
            unitPrice: zod.string().optional(),
          })
          .partial()
          .refine(({ isFixedCost, unitPrice }) => (isFixedCost && unitPrice) || isFixedCost === false, {
            message: 'Giá sản phẩm là trường bắt buộc',
            path: ['unitPrice'],
          })
          .refine(
            ({ isFixedCost, unitPrice }) => {
              if (isFixedCost) {
                return (
                  unitPrice && Math.floor(parseInt(unitPrice, 10) / MIN_PRICE) === parseInt(unitPrice, 10) / MIN_PRICE
                );
              }

              return true;
            },
            {
              message: `Giá sản phẩm phải là bội số của ${MIN_PRICE}`,
              path: ['unitPrice'],
            },
          ),
        quantity: zod.string({ required_error: 'Tồn kho là trường bắt buộc' }).nonempty({
          message: 'Tồn kho không được để trống',
        }),
        productUnitId: zod.string({ required_error: 'Đơn vị là trường bắt buộc' }).nonempty({
          message: 'Đơn vị không được để trống',
        }),
      }),
    [productDeviceSchema],
  );

  return { validationSchema, productDeviceSchema };
};
