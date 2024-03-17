import * as zod from 'zod';
import dayjs from 'dayjs';

import { validationMessage } from '../../constants';
import { DiscountCodeUnitEnum } from '../../graphql/type.interface';

import { VoucherAddFormData } from './type';

const MAX_LEN_NAME = 255;
const MIN_PRICE = 1000;

export const validationSchema: zod.ZodType<VoucherAddFormData> = zod.object({
  voucherName: zod
    .string({
      required_error: 'Tên chương trình khuyến mãi là trường bắt buộc',
    })
    .nonempty('Tên chương trình khuyến mãi là trường bắt buộc')
    .max(MAX_LEN_NAME, `Tên chương trình khuyến mãi không vượt ${MAX_LEN_NAME} ký tự`),
  products: zod
    .object({
      productIds: zod.array(zod.string()).optional(),
      isAllProducts: zod.boolean().optional(),
    })
    .optional()
    .refine(
      (data) => {
        return data != null && ((data.productIds?.length != null && data.productIds.length > 0) || data.isAllProducts);
      },
      {
        message: 'Vui lòng chọn ít nhất 1 sản phẩm',
        path: ['productIds'],
      },
    ),
  limitTime: zod
    .string()
    .refine(
      (val) => (parseInt(val, 10)?.toString?.() === val && parseInt(val, 10) >= 0) || !val,
      'Giá trị phải là số nguyên dương',
    )
    .optional(),
  limitTimePerAccount: zod
    .string()
    .refine(
      (val) => (parseInt(val, 10)?.toString?.() === val && parseInt(val, 10) >= 0) || !val,
      'Giá trị phải là số nguyên dương',
    )
    .optional(),
  date: zod
    .object({
      startDate: zod
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
      endDate: zod
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
        return isValidEnd && isValidStart
          ? dayjs(startDate, 'DD/MM/YYYY').isSameOrBefore(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      },
      {
        message: 'Ngày bắt đầu phải trước ngày kết thúc',
        path: ['endDate'],
      },
    ),
  discount: zod
    .object({
      unit: zod
        .string({
          required_error: validationMessage.required,
        })
        .nonempty(validationMessage.required),
      value: zod
        .string({
          required_error: validationMessage.required,
        })
        .nonempty(validationMessage.required),
    })
    .refine(
      ({ unit, value }) => {
        if (unit === DiscountCodeUnitEnum.PERCENTAGE) {
          return value && parseFloat(value) <= 100;
        }
        return true;
      },
      {
        message: 'Giá trị phải nhỏ hơn hoặc bằng 100',
        path: ['value'],
      },
    )
    .refine(
      ({ unit, value }) => {
        if (unit === DiscountCodeUnitEnum.VND) {
          return value && Math.floor(parseInt(value, 10) / MIN_PRICE) === parseInt(value, 10) / MIN_PRICE;
        }
        return true;
      },
      {
        message: `Giá trị phải là bội số của ${MIN_PRICE}`,
        path: ['value'],
      },
    ),

  minOrderValue: zod
    .string({
      required_error: validationMessage.required,
    })
    .nonempty(validationMessage.required)
    .refine((unitPrice) => {
      return unitPrice && Math.floor(parseInt(unitPrice, 10) / MIN_PRICE) === parseInt(unitPrice, 10) / MIN_PRICE;
    }, `Giá trị đơn hàng tối thiểu phải là bội số của ${MIN_PRICE}`),
  isActive: zod.boolean().optional(),
});
