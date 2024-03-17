import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TextInputFocusEventData,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import dayjs from 'dayjs';

import { tw } from '../tw';
import { CalendarSVG } from '../../svg';

type Props = {
  value?: string;
  onDateChange?(date?: string): void;
  label?: string;
  isRequiredField?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  borderVisibleIfValue?: boolean;
  placeholder?: string;
};

export const DateInput = ({
  value,
  onDateChange,
  label,
  isRequiredField,
  labelStyle,
  containerStyle,
  errorMessage,
  onFocus,
  onBlur,
  borderVisibleIfValue = true,
  placeholder,
}: Props) => {
  const [date, setDate] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = useMemo(() => {
    if (errorMessage) {
      return tw.color('error');
    }

    if (isFocused || (borderVisibleIfValue && date)) {
      return tw.color('text');
    }

    return tw.color('grayscale-border');
  }, [borderVisibleIfValue, date, errorMessage, isFocused]);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const onChangeText = useCallback((text: string) => {
    setDate(text);
  }, []);

  useEffect(() => {
    if (value !== date) {
      onDateChange?.(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (value !== date) {
      setDate(value ? dayjs(value).format('DD/MM/YYYY') : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={[tw``, containerStyle]}>
      {label != null && (
        <Text style={[tw`text-14px text-grayscale-black font-medium mb-2`, labelStyle]}>
          {isRequiredField && <Text style={tw`text-error`}>* </Text>}
          {label}
        </Text>
      )}
      <View style={[tw`border py-14px px-16px rounded-4px flex-row items-center`, { borderColor }]}>
        <View style={tw`flex-1`}>
          <MaskInput
            mask={Masks.DATE_DDMMYYYY}
            keyboardType="number-pad"
            value={date}
            style={tw`text-14px text-[#242424]`}
            maskAutoComplete
            onChangeText={onChangeText}
            maxLength={undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={tw.color('text-grayscale-gray')}
            placeholder={placeholder ?? 'DD/MM/YYYY'}
          />
        </View>
        <CalendarSVG />
      </View>
      {errorMessage != null && <Text style={tw`text-error text-12px mt-8px`}>{errorMessage}</Text>}
    </View>
  );
};
