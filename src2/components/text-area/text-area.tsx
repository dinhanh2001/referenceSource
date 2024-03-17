import { View, StyleSheet, TextInputFocusEventData, NativeSyntheticEvent } from 'react-native';
import React, { useCallback } from 'react';
import { Text } from '@rneui/themed';

import { tw } from '../tw';
import { TextInput, TextInputProps } from '../text-input';

type TextAreaProps = TextInputProps & {
  showMaxLength?: boolean;
};

export const TextArea = React.memo(({ showMaxLength = true, onBlur, ...props }: TextAreaProps) => {
  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
    },
    [onBlur],
  );

  return (
    <View>
      <TextInput
        inputStyle={[styles.input, tw`py-16px`]}
        inputContainerStyle={styles.input}
        renderErrorMessage={!!props.errorMessage}
        placeholderTextColor={tw.color('text-grayscale-gray')}
        onBlur={handleBlur}
        {...props}
      />
      {!!props.maxLength && showMaxLength && (
        <View style={tw`absolute bottom-0 right-0 p-4px`}>
          <Text style={tw`text-12px text-grayscale-gray`}>
            {props.value?.length || 0}/{props.maxLength}
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 120,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
});
