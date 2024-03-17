import * as zod from 'zod';
import { ZodType } from 'zod';
import dayjs from 'dayjs';

import { validationMessage } from '../../constants';
import { PeriodTypeEnum } from '../../graphql/type.interface';

import { RevenueFilterData } from './type';

export const validationSchema: ZodType<RevenueFilterData> = zod
  .object({
    periodType: zod
      .string({ required_error: validationMessage.required })
      .nonempty({ message: validationMessage.required }),
    startDate: zod.string().optional(),
    endDate: zod.string().optional(),
  })
  .refine(
    ({ periodType, startDate }) => {
      if (periodType === PeriodTypeEnum.RANGE) {
        return startDate != null && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
      }

      return true;
    },
    {
      message: validationMessage.invalidDateFormat,
      path: ['startDate'],
    },
  )
  .refine(
    ({ periodType, endDate }) => {
      if (periodType === PeriodTypeEnum.RANGE) {
        return endDate != null && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;
      }

      return true;
    },
    {
      message: validationMessage.invalidDateFormat,
      path: ['endDate'],
    },
  )
  .refine(
    ({ periodType, startDate, endDate }) => {
      if (periodType === PeriodTypeEnum.RANGE) {
        const isValidStart = !!startDate && dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === startDate;
        const isValidEnd = !!endDate && dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY') === endDate;

        return isValidStart && isValidEnd
          ? dayjs(startDate, 'DD/MM/YYYY').isSameOrBefore(dayjs(endDate, 'DD/MM/YYYY'), 'd')
          : true;
      }

      return true;
    },
    {
      message: 'Ngày bắt đầu phải trước ngày kết thúc',
      path: ['startDate'],
    },
  );
