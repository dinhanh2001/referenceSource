import { Input, InputProps, Text } from '@rneui/themed';
import { forwardRef, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as RNTextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { ArrowDownSVG } from '../../svg';
import { tw } from '../tw';

export type TextInputProps = InputProps & {
  isLoading?: boolean;
  toggleSecureTextIcon?: boolean;
  borderVisibleIfValue?: boolean;
  type?: 'select' | 'input';
  label?: string;
  isRequiredField?: boolean;
  trimWhenBlur?: boolean;
};

export const TextInput = forwardRef<RNTextInput | null, TextInputProps>(
  (
    {
      onFocus,
      onBlur,
      inputContainerStyle,
      errorMessage,
      labelStyle,
      isLoading,
      rightIcon,
      secureTextEntry,
      toggleSecureTextIcon,
      borderVisibleIfValue = true,
      type = 'input',
      label,
      isRequiredField,
      trimWhenBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

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
        if (trimWhenBlur) {
          props.onChangeText?.(props?.value?.trim?.() || '');
        }
      },
      [onBlur, props, trimWhenBlur],
    );

    return (
      <>
        {label != null && (
          <Text style={labelStyle}>
            {isRequiredField && <Text style={tw`text-error`}>* </Text>}
            {label}
          </Text>
        )}
        <Input
          ref={ref as any}
          onFocus={handleFocus}
          onBlur={handleBlur}
          errorMessage={errorMessage}
          editable={type !== 'select'}
          label={null}
          placeholderTextColor={tw.color('text-grayscale-gray')}
          secureTextEntry={secureTextEntry && !isSecureTextVisible}
          inputContainerStyle={[
            {
              borderColor:
                errorMessage != null
                  ? tw.color('error')
                  : isFocused || (borderVisibleIfValue && props.value)
                  ? tw.color('text')
                  : tw.color('grayscale-border'),
            },
            inputContainerStyle,
          ]}
          {...props}
          rightIcon={
            toggleSecureTextIcon ? (
              <Pressable onPress={() => setIsSecureTextVisible(!isSecureTextVisible)}>
                <Text style={tw`text-14px font-normal text-grayscale-gray`}>{isSecureTextVisible ? 'Ẩn' : 'Hiện'}</Text>
              </Pressable>
            ) : isLoading ? (
              <ActivityIndicator />
            ) : type === 'select' ? (
              <ArrowDownSVG />
            ) : (
              rightIcon
            )
          }
        />
      </>
    );
  },
);
