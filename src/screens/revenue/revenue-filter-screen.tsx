import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DateInput, Space, tw } from '../../components';
import { PeriodTypeEnum } from '../../graphql/type.interface';

import { RevenueFilterData, RevenueFilterNavigationProp, RevenueFilterRouteProp } from './type';
import { validationSchema } from './validation';

export const RevenueFilterScreen = () => {
  const {
    params: { onChange, currentFilter },
  } = useRoute<RevenueFilterRouteProp>();
  const navigation = useNavigation<RevenueFilterNavigationProp>();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<RevenueFilterData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      periodType: currentFilter?.periodType,
      startDate:
        currentFilter?.periodType === PeriodTypeEnum.RANGE && currentFilter?.startDate
          ? dayjs(currentFilter?.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : undefined,
      endDate:
        currentFilter?.periodType === PeriodTypeEnum.RANGE && currentFilter?.endDate
          ? dayjs(currentFilter?.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : undefined,
    },
  });

  const periodTypeWatch = watch('periodType');

  const onReset = useCallback(() => {
    setValue('periodType', '');
    setValue('startDate', '');
    setValue('endDate', '');

    trigger('periodType');
  }, [setValue, trigger]);

  const onSubmit = useCallback(
    (data: RevenueFilterData) => {
      onChange(data);
      navigation.goBack();
    },
    [navigation, onChange],
  );

  const renderItem = useCallback(
    (item: OptionProps, index: number) => {
      const { label, value } = item;
      const selected = periodTypeWatch === value;
      const isRange = value === PeriodTypeEnum.RANGE;

      return (
        <View key={value}>
          <Controller
            control={control}
            name="periodType"
            render={({ field: { onChange: onChangePeriodType } }) => (
              <TouchableOpacity
                style={[
                  tw`flex-row items-center py-3 mx-4 border-b-[#EEE]`,
                  index < OPTIONS_FILTER.length - 1 && tw`border-b`,
                ]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  onChangePeriodType(value);
                  if (isRange) {
                    trigger('startDate');
                    trigger('endDate');
                  }
                }}
              >
                <Text style={tw`flex-1`}>{label}</Text>
                <View
                  style={tw`items-center justify-center border rounded-full w-5 h-5 border-${
                    selected ? 'primary' : 'grayscale-gray'
                  }`}
                >
                  {selected && <View style={tw`w-10px h-10px bg-primary rounded-full`} />}
                </View>
              </TouchableOpacity>
            )}
          />
          {selected && isRange && (
            <View style={tw`mx-4 flex-row `}>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange: onChangeDate, value: date, onBlur } }) => (
                  <DateInput
                    containerStyle={tw`flex-1`}
                    value={date}
                    onDateChange={(val) => {
                      onChangeDate(val);
                      trigger('startDate');
                    }}
                    onBlur={onBlur}
                  />
                )}
              />
              <Space horizontal size={16} />
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange: onChangeDate, value: date, onBlur } }) => (
                  <DateInput
                    containerStyle={tw`flex-1`}
                    value={date}
                    onDateChange={(val) => {
                      onChangeDate(val);
                      trigger('endDate');
                    }}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          )}
        </View>
      );
    },
    [control, periodTypeWatch, trigger],
  );

  return (
    <SafeAreaView style={tw`flex-1`} edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>{OPTIONS_FILTER.map(renderItem)}</ScrollView>
      <View style={tw`flex-row m-4 mt-2`}>
        <Button title={'Làm lại'} buttonStyle={tw``} containerStyle={tw`flex-1`} type="outline" onPress={onReset} />
        <Space horizontal size={16} />
        <Button
          title={'Xem kết quả'}
          buttonStyle={tw``}
          containerStyle={tw`flex-1`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>
    </SafeAreaView>
  );
};

type OptionProps = {
  label: string;
  value: PeriodTypeEnum;
};

const OPTIONS_FILTER = [
  {
    label: 'Tuần này',
    value: PeriodTypeEnum.WEEKLY,
  },
  {
    label: 'Tháng này',
    value: PeriodTypeEnum.MONTHLY,
  },
  {
    label: 'Năm nay',
    value: PeriodTypeEnum.YEARLY,
  },
  {
    label: 'Khoảng thời gian',
    value: PeriodTypeEnum.RANGE,
  },
];
