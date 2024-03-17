import * as zod from 'zod';
import { ZodType } from 'zod';
import { useMemo } from 'react';
import dayjs from 'dayjs';

import { validationMessage } from '../../constants';

import { AdditionalFee, Diagnostics, FormAccessory, FormCheckAndQuote } from './type';

const MAX_LENGTH_NOTE = 1000;

export const useSchemaQuotationForm = () => {
  const accessorySchema: ZodType<FormAccessory> = useMemo(
    () =>
      zod.object({
        accessoryName: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        accessoryUnit: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        accessoryQuantity: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required),
        accessoryAvailable: zod.boolean(),
        accessoryUnitPrice: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required),
      }),
    [],
  );

  const additionalSchema: ZodType<AdditionalFee> = useMemo(
    () =>
      zod.object({
        additionalFeeName: zod.string().optional(),
        additionalFeeAmount: zod.string().optional(),
      }),
    [],
  );

  const diagnosticsSchema: ZodType<Diagnostics> = useMemo(
    () =>
      zod
        .object({
          quotationPriceListId: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required),
          workingHour: zod.string().optional(),
          expense: zod.string().optional(),
          description: zod.string().optional(),
          fixable: zod.boolean().optional(),
        })
        .refine(
          ({ fixable, expense }) => {
            return (!!fixable && !!expense) || !fixable;
          },
          {
            message: validationMessage.required,
            path: ['expense'],
          },
        )
        .refine(
          ({ fixable, workingHour }) => {
            return (!!fixable && !!workingHour) || !fixable;
          },
          {
            message: validationMessage.required,
            path: ['workingHour'],
          },
        )
        .refine(
          ({ fixable, description }) => {
            return (!!fixable && !!description) || !fixable;
          },
          {
            message: validationMessage.required,
            path: ['description'],
          },
        ),
    [],
  );

  const validationSchema: ZodType<FormCheckAndQuote> = useMemo(
    () =>
      zod.object({
        operatingNumber: zod.string().optional(),
        operatingUnit: zod.string().optional(),
        diagnosisNote: zod.string().max(MAX_LENGTH_NOTE, `Ghi chú không được vượt quá ${MAX_LENGTH_NOTE}`).optional(),
        estimatedCompleteAt: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .refine((value: string) => {
            return (
              value == null || value.trim().length === 0 || dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
            );
          }, 'Ngày dự kiến thời gian chưa đúng định dạng. DD/MM/YYYY')
          .refine((val) => {
            return val != null && dayjs().isSameOrBefore(dayjs(val, 'DD/MM/YYYY'), 'd');
          }, validationMessage.notChoosePastDate),
        accessory: zod.array(accessorySchema),
        transportFee: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        diagnosticFee: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        repairFee: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        additional: zod.array(additionalSchema),
        diagnostics: zod.array(diagnosticsSchema),
      }),
    [accessorySchema, additionalSchema, diagnosticsSchema],
  );

  return { validationSchema };
};
