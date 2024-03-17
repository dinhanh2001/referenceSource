import React, { memo, useEffect, useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { hitSlop } from '../../../helpers';
import { CloseCircleSVG, SearchNormalSvg } from '../../../svg';
import { TextInput, TextInputProps } from '../../text-input';
import { tw } from '../../tw';

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const SearchInput = memo(({ onChangeText, containerStyle, onPress, ...props }: Props) => {
  const [text, setText] = useState<string | undefined>(props?.value as string);
  function _onTextChange(value: string) {
    setText(value);
  }

  function clearText() {
    setText(undefined);
  }

  useEffect(() => {
    onChangeText?.(text as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const hasText = text != null && text.length > 0;

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <View pointerEvents="none">
        <TextInput
          {...props}
          value={text}
          onChangeText={_onTextChange}
          errorStyle={tw`hidden`}
          placeholderTextColor={tw.color('grayscale-gray')}
          inputContainerStyle={tw`border-0 border-b-0 bg-white rounded-4px shadow-md`}
          leftIcon={<SearchNormalSvg width={16} height={16} />}
          rightIcon={
            hasText ? (
              <Pressable onPress={clearText} hitSlop={hitSlop(4)}>
                <CloseCircleSVG fill="grey" />
              </Pressable>
            ) : undefined
          }
        />
      </View>
    </Pressable>
  );
});
