import { z } from 'zod';
import dayjs from 'dayjs';

import { MaintenanceLevelEnum, QuickAddVehicleInput } from '../../../graphql/type.interface';
import { validationMessage } from '../../../constants';

const MAX_LEN_ADDRESS_DETAIL = 255;

type LevelField = {
  maintenanceLevel: string;
  vehicleTypeCategoryId?: string;
};

type DateField = {
  startDate: string;
  endDate: string;
};

type AddressField = {
  lat?: number;
  lng?: number;
  mapAddress?: string;
};

export type CreateMaintenanceForm = {
  vehicleId: string;
  address?: AddressField;
  addressDetail: string;
  quickAddVehicleData?: QuickAddVehicleInput;
  date: DateField;
  level: LevelField;
  note?: string;
};

export const schemaCreateMaintenance: z.ZodType<CreateMaintenanceForm> = z.object({
  vehicleId: z.string({
    required_error: 'Tên xe là trường bắt buộc',
  }),
  quickAddVehicleData: z
    .object({
      addressMoreInfo: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      mapAddress: z.string(),
      name: z.string(),
      hidden: z.boolean(),
    })
    .optional(),
  address: z.object(
    {
      lat: z.number(),
      lng: z.number(),
      mapAddress: z.string(),
    },
    { required_error: 'Vị trí xe là trường bắt buộc' },
  ),
  addressDetail: z
    .string({ required_error: 'Địa chỉ chi tiết là trường bắt buộc' })
    .trim()
    .nonempty('Địa chỉ chi tiết là trường bắt buộc')
    .max(MAX_LEN_ADDRESS_DETAIL, `Địa chỉ chi tiết không được quá ${MAX_LEN_ADDRESS_DETAIL} ký tự`),
  date: z
    .object({
      startDate: z
        .string({
          required_error: 'Ngày bắt đầu là trường bắt buộc',
        })
        .nonempty('Ngày bắt đầu là trường bắt buộc')
        .refine((val) => {
          return !!val && dayjs(val, 'DD/MM/YYYY').format('DD/MM/YYYY') === val;
        }, validationMessage.invalidDateFormat)
        .refine((val) => {
          return !!val && dayjs().isSameOrBefore(dayjs(val, 'DD/MM/YYYY'), 'd');
        }, validationMessage.notChoosePastDate),
      endDate: z
        .string({
          required_error: 'Ngày kết thúc là trường bắt buộc',
        })
        .nonempty('Ngày kết thúc là trường bắt buộc')
        .refine((val) => {
          return !!val && dayjs(val, 'DD/MM/YYYY').format('DD/MM/YYYY') === val;
        }, validationMessage.invalidDateFormat)
        .refine((val) => {
          return !!val && dayjs().isSameOrBefore(dayjs(val, 'DD/MM/YYYY'), 'd');
        }, validationMessage.notChoosePastDate),
    })
    .refine(
      ({ startDate, endDate }) => {
        const isValidStart = !!startDate && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
        const isValidEnd = !!endDate && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;

        return isValidStart && isValidEnd
          ? dayjs(startDate, 'DD/MM/YYYY').isSameOrBefore(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      },
      {
        message: 'Ngày bắt đầu phải trước ngày kết thúc',
        path: ['startDate'],
      },
    )
    .refine(
      ({ startDate, endDate }) => {
        const isValidStart = !!startDate && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
        const isValidEnd = !!endDate && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;

        return isValidStart && isValidEnd
          ? dayjs(startDate, 'DD/MM/YYYY').add(1, 'w').isSameOrAfter(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      },
      {
        message: 'Ngày bắt đầu phải trước ngày kết thúc tối đa 7 ngày',
        path: ['startDate'],
      },
    )
    .refine(
      ({ startDate, endDate }) => {
        const isValidStart = !!startDate && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
        const isValidEnd = !!endDate && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;
        return isValidEnd && isValidStart
          ? dayjs(startDate, 'DD/MM/YYYY').isSameOrBefore(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      },
      {
        message: 'Ngày bắt đầu phải trước ngày kết thúc',
        path: ['endDate'],
      },
    )
    .refine(
      ({ startDate, endDate }) => {
        const isValidStart = !!startDate && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
        const isValidEnd = !!endDate && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;
        return isValidEnd && isValidStart
          ? dayjs(startDate, 'DD/MM/YYYY').add(1, 'w').isSameOrAfter(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      },
      {
        message: 'Ngày bắt đầu phải trước ngày kết thúc tối đa 7 ngày',
        path: ['endDate'],
      },
    ),
  level: z
    .object({
      maintenanceLevel: z.string({
        required_error: 'Mốc bảo dưỡng là trường bắt buộc',
      }),
      vehicleTypeCategoryId: z.string().optional(),
    })
    .refine(
      ({ vehicleTypeCategoryId, maintenanceLevel }) => {
        if (maintenanceLevel === MaintenanceLevelEnum.ROUTINE) {
          return !!vehicleTypeCategoryId;
        }
        return true;
      },
      {
        message: 'Bảo dưỡng định kì là trường bắt buộc',
        path: ['vehicleTypeCategoryId'],
      },
    ),
  note: z.string().optional(),
});
