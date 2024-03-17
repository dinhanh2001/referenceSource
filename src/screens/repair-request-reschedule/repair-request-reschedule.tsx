import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import * as zod from 'zod';
import { ZodType } from 'zod';

import { DateInput, Space, TextArea, tw } from '../../components';
import { validationMessage } from '../../constants';
import { usePartnerRescheduleBookingMutation } from '../../graphql/mutations/partnerRescheduleBooking.generated';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { showFlashMessageError } from '../../helpers';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

import { PropsType, ScheduleFormData } from './type';

type TimeBox = {
  [key: string]: string[];
};

const timeBox: TimeBox = {
  MORNING: ['7:00', '8:00', '9:00', '10:00', '11:00'],
  AFTERNOON: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  EVENING: ['17:00', '18:00', '19:00', '20:00', '21:00'],
};

const suggestMessage = 'Xin lỗi, Tôi có thể hẹn lại ngày đến được không?';

export const RepairRequestRescheduleScreen: React.FC<PropsType> = memo(() => {
  const [timePeriod, setTimePeriod] = useState<string>(Object.keys(timeBox)[0].toString());

  const {
    params: { bookingId, onCompleted },
  } = useRoute<RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST>>();

  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const { data } = usePartnerBookingQuery({
    variables: {
      id: bookingId,
    },
  });

  const validationSchema: ZodType<ScheduleFormData> = useMemo(
    () =>
      zod
        .object({
          scheduleDate: zod
            .string({
              required_error: validationMessage.required,
            })
            .min(1, validationMessage.required)
            .refine((val) => {
              return val != null && dayjs(val, 'DD/MM/YYYY').format('DD/MM/YYYY') === val;
            }, validationMessage.invalidDateFormat)
            .refine((val) => {
              return val != null && dayjs().isSameOrBefore(dayjs(val, 'DD/MM/YYYY'), 'd');
            }, validationMessage.notChoosePastDate),
          scheduleTime: zod.string({
            required_error: validationMessage.required,
          }),
          scheduleReason: zod.string({
            required_error: validationMessage.required,
          }),
        })
        .refine(
          ({ scheduleDate, scheduleTime }) => {
            return dayjs(`${scheduleDate} ${scheduleTime}`, 'DD/MM/YYYY HH:mm').isSameOrAfter(dayjs(), 'minute');
          },
          {
            message: validationMessage.notChoosePastDate,
            path: ['scheduleTime'],
          },
        ),
    [],
  );

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors: formErrors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const handleTimePeriod = useCallback((period: string) => {
    setTimePeriod(period);
  }, []);

  const [rescheduleAsync, { loading }] = usePartnerRescheduleBookingMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      navigation.goBack();
      onCompleted?.();
    },
  });

  const onSubmit = useCallback(
    (formData: ScheduleFormData) => {
      rescheduleAsync({
        variables: {
          input: {
            bookingId,
            scheduleTime: dayjs(`${formData.scheduleDate} ${formData.scheduleTime}`, 'DD/MM/YYYY HH:mm').toISOString(),
            scheduleReason: formData.scheduleReason,
          },
        },
      });
    },
    [bookingId, rescheduleAsync],
  );

  const renderTimeBox = useCallback(
    (item: string, index: number) => (
      <TouchableOpacity
        key={item}
        style={[
          tw`py-8px border border-grayscale-border rounded-4px flex-1 justify-center items-center ${
            index === timeBox[timePeriod].length - 1 ? '' : 'mr-8px'
          }`,
          item === watch('scheduleTime') && tw`bg-primary`,
        ]}
        onPress={() => {
          setValue('scheduleTime', item);
          trigger('scheduleTime');
        }}
      >
        <Text style={[tw`text-grayscale-gray`, item === watch('scheduleTime') && tw`text-black`]}>{item}</Text>
      </TouchableOpacity>
    ),
    [setValue, timePeriod, trigger, watch],
  );

  return (
    <View style={tw`flex-1`}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={tw`justify-center items-center mt-8px mb-16px`}>
          <Text style={tw`text-16px font-semibold`}>{data?.partnerBooking.code}</Text>
          <Text style={tw`text-12px text-grayscale-gray`}>
            Đặt lúc: {dayjs(data?.partnerBooking.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
        <Space style={tw`bg-grayscale-border`} size={6} />
        <View style={tw`p-16px`}>
          {/* <Controller
            control={control}
            name="scheduleDate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                value={value}
                pointerEvents="none"
                isRequiredField
                onDateChange={onChange}
                label={'Thời gian đến hẹn sửa chữa'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                errorMessage={formErrors.scheduleDate?.message}
              />
            )}
          /> */}
          <Controller
            control={control}
            name="scheduleDate"
            render={({ field: { value, onChange } }) => (
              <DateInput
                value={value}
                isRequiredField
                onDateChange={onChange}
                label={'Thời gian đến hẹn sửa chữa'}
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="DD/MM/YYYY"
                errorMessage={formErrors.scheduleDate?.message}
                containerStyle={tw`mb-18px`}
              />
            )}
          />

          <View style={tw`flex-row relative bg-grayscale-bg`}>
            <TouchableOpacity
              style={tw`flex-1 items-center justify-center ${
                timePeriod === 'MORNING' ? 'bg-primary' : ''
              } py-16px rounded-4px`}
              onPress={() => handleTimePeriod('MORNING')}
            >
              <Text style={tw`font-semibold ${timePeriod === 'MORNING' ? 'text-black' : 'text-grayscale-gray'}`}>
                Sáng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 items-center justify-center ${
                timePeriod === 'AFTERNOON' ? 'bg-primary' : ''
              } py-16px rounded-4px`}
              onPress={() => handleTimePeriod('AFTERNOON')}
            >
              <Text style={tw`font-semibold ${timePeriod === 'AFTERNOON' ? 'text-black' : 'text-grayscale-gray'}`}>
                Chiều
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 items-center justify-center ${
                timePeriod === 'EVENING' ? 'bg-primary' : ''
              } py-16px rounded-4px`}
              onPress={() => handleTimePeriod('EVENING')}
            >
              <Text style={tw`font-semibold ${timePeriod === 'EVENING' ? 'text-black' : 'text-grayscale-gray'}`}>
                Tối
              </Text>
            </TouchableOpacity>
          </View>

          <Space />
          <View style={tw`flex-row`}>{timeBox[timePeriod].map(renderTimeBox)}</View>
          {formErrors.scheduleTime?.message && (
            <Text style={tw`text-error text-12px mt-4px`}>{formErrors.scheduleTime?.message}</Text>
          )}
          <Space />

          <Controller
            control={control}
            name="scheduleReason"
            render={({ field: { value, onChange } }) => (
              <TextArea
                value={value}
                isRequiredField
                onChangeText={onChange}
                label="Lý do"
                labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                placeholder="Nhập lý do..."
                multiline={true}
                errorMessage={formErrors.scheduleReason?.message}
              />
            )}
          />

          <Space />
          <TouchableOpacity
            style={tw`px-12px py-8px border border-grayscale-border rounded-full justify-center items-center `}
            onPress={() => setValue('scheduleReason', suggestMessage)}
          >
            <Text style={tw`text-grayscale-gray`}>{suggestMessage}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={tw` pt-10px pb-40px px-16px border border-grayscale-border`}>
        <Button title={'Xác nhận'} onPress={handleSubmit(onSubmit)} loading={loading} disabled={loading} />
      </View>
    </View>
  );
});
