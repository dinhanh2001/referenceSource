import { memo, useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker as RnDatePicker } from 'react-native-common-date-picker';
import Color from 'color';
import { Button, Text } from '@rneui/themed';

import { tw } from '../tw';
import { TextInput, TextInputProps } from '../text-input';
import { CalendarSVG } from '../../svg';

const DATE_FORMAT = 'DD/MM/YYYY';

type Props = Omit<TextInputProps, 'editable'> & {
  onDateChange?(date?: string): void;
};

export const DatePicker = memo(({ value, onDateChange, ...props }: Props) => {
  const [defaultDate, setDefaultDate] = useState<Dayjs>(dayjs(value));
  const [draftDate, setDraftDate] = useState(dayjs(value).toDate());

  const [date, setDate] = useState<Dayjs | undefined>(value ? dayjs(value) : undefined);

  useEffect(() => {
    if (value !== date?.toISOString()) onDateChange?.(date?.toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const [visible, setVisible] = useState(false);

  const handleCancelDate = useCallback(() => {
    setDraftDate(dayjs(date).toDate());
    setVisible(false);
  }, [date]);

  const handleConfirmDate = useCallback(() => {
    setVisible(false);
    setDefaultDate(dayjs(draftDate));
    setDate(dayjs(draftDate));
  }, [draftDate]);

  const handleOpenSelectDate = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <>
      <Pressable onPress={handleOpenSelectDate} style={tw`relative`}>
        <View pointerEvents="none">
          <TextInput
            editable={false}
            placeholder={DATE_FORMAT}
            {...props}
            value={date ? dayjs(date).format(DATE_FORMAT) : undefined}
            rightIcon={<CalendarSVG width={14} height={14} />}
          />
        </View>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <View style={tw`bg-black bg-opacity-20 flex-1 justify-center items-center`}>
          <View style={tw`w-320px bg-white p-16px rounded relative`}>
            <Text style={tw`mb-16px font-bold`}>Select Date</Text>

            <View style={tw`h-180px`}>
              {visible && (
                <RnDatePicker
                  onValueChange={(val: string) => {
                    setDraftDate(dayjs(val).toDate());
                  }}
                  minDate="1920-01-01" // Consider this value
                  type="DD-MM-YYYY"
                  defaultDate={defaultDate.format('YYYY-MM-DD')}
                  rows={5}
                  width={320}
                  showToolBar={false}
                  selectedBorderLineColor={tw.color('primary')}
                  selectedTextColor={tw.color('primary')}
                  selectedRowBackgroundColor={Color(tw.color('primary')).alpha(0.05).toString()}
                  selectedBorderLineWidth={1}
                  selectedBorderLineMarginHorizontal={1}
                  selectedTextFontSize={16}
                  textComponent={Text}
                />
              )}
            </View>

            <View style={tw`flex-row mt-16px`}>
              <View style={tw`mr-4px flex-1`}>
                <Button size="sm" type="outline" onPress={handleCancelDate} buttonStyle={tw`h-40px`}>
                  Cancel
                </Button>
              </View>
              <View style={tw`ml-4px flex-1`}>
                <Button size="sm" onPress={handleConfirmDate} buttonStyle={tw`h-40px`}>
                  Confirm
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
});

DatePicker.displayName = 'DatePicker';
