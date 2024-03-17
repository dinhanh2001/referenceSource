import { Input, InputProps, Text } from '@rneui/themed';
import { forwardRef, useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputFocusEventData } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AddSVG, MinusSVG } from '../../svg';
import { tw } from '../tw';

export type NumberInputProps = InputProps & {
  isLoading?: boolean;
  toggleSecureTextIcon?: boolean;
  isRequiredField?: boolean;
  onChange: (value: string) => void;
  onChangeText?: (value: string) => void;
  zeroToEmpty?: boolean;
};

export const NumberInput = forwardRef<RNTextInput | null, NumberInputProps>(
  (
    {
      onFocus,
      onBlur,
      inputContainerStyle,
      errorMessage,
      labelStyle,
      isRequiredField,
      label,
      onChange,
      onChangeText,
      zeroToEmpty,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState<string>(props?.value || '');

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

    const onInc = () => {
      setValue((p) => {
        const val = (parseInt(p, 10) || 0) + 1;
        const newValue = `${val}`;

        if (zeroToEmpty && !val) {
          onChangeText?.('');
          return '';
        }

        onChange(newValue);
        return newValue;
      });
    };
    const onDec = () => {
      if (parseInt(value, 10) > 0) {
        setValue((p) => {
          const val = (parseInt(p, 10) || 0) - 1;
          const newValue = `${val}`;
          console.log('newValue', newValue);

          if (zeroToEmpty && !val) {
            onChangeText?.('');
            return '';
          }

          onChange(newValue);
          return newValue;
        });
      }
    };

    const handleChangeText = useCallback(
      (text: string) => {
        const num = parseInt(text, 10);
        if (zeroToEmpty && !num) {
          setValue('');
          onChangeText?.('');
          return;
        }

        setValue(text);
        onChangeText?.(text);
      },
      [onChangeText, zeroToEmpty],
    );

    return (
      <>
        {label !== undefined && (
          <Text style={labelStyle}>
            {isRequiredField === true && <Text style={tw`text-rose-600`}>*</Text>} {label}
          </Text>
        )}
        <Input
          ref={ref as any}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={null}
          textAlign="center"
          placeholderTextColor="#676773"
          errorMessage={errorMessage}
          onChangeText={handleChangeText}
          inputContainerStyle={[
            {
              borderColor:
                errorMessage != null
                  ? tw.color('error')
                  : isFocused || value
                  ? tw.color('text')
                  : tw.color('grayscale-border'),
            },
            inputContainerStyle,
          ]}
          {...props}
          rightIcon={
            <TouchableOpacity onPress={onInc}>
              <AddSVG />
            </TouchableOpacity>
          }
          leftIcon={
            <TouchableOpacity onPress={onDec}>
              <MinusSVG />
            </TouchableOpacity>
          }
          value={value}
        />
      </>
    );
  },
);
