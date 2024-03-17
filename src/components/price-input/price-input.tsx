import React, { useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';

import { tw } from '../tw';

type Props = TextInputProps & {
  value?: string;
  onChange?(value: string): void;
  label?: string;
  isRequiredField?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  borderVisibleIfValue?: boolean;
  placeholder?: string;
  prefix?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export const PriceInput = ({
  value,
  onChange,
  label,
  isRequiredField,
  labelStyle,
  containerStyle,
  errorMessage,
  onFocus,
  onBlur,
  borderVisibleIfValue = true,
  placeholder,
  prefix = 'đ',
  inputContainerStyle,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = useMemo(() => {
    if (errorMessage) {
      return tw.color('error');
    }

    if (isFocused || (borderVisibleIfValue && value)) {
      return tw.color('text');
    }

    return tw.color('grayscale-border');
  }, [borderVisibleIfValue, value, errorMessage, isFocused]);

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

  const onChangeText = useCallback(
    (_text: string, noneMask: string) => {
      onChange?.(noneMask);
    },
    [onChange],
  );

  return (
    <View style={[tw``, containerStyle]}>
      {label != null && (
        <Text style={[tw`text-grayscale-black font-medium mb-8px`, labelStyle]}>
          {isRequiredField && <Text style={tw`text-error`}>* </Text>}
          {label}
        </Text>
      )}
      <View style={[tw` flex-row border py-14px px-16px rounded-4px`, { borderColor }, inputContainerStyle]}>
        <MaskInput
          mask={createNumberMask({ precision: 0 })}
          keyboardType="number-pad"
          value={value}
          style={tw`flex-1 text-14px text-[#242424]`}
          maskAutoComplete
          onChangeText={onChangeText}
          maxLength={undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={tw.color('text-grayscale-gray')}
          placeholder={placeholder ?? ''}
          {...props}
        />
        <Text>{prefix}</Text>
      </View>
      {errorMessage != null && <Text style={tw`text-error text-12px mt-8px`}>{errorMessage}</Text>}
    </View>
  );
};
