import React, { memo, useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';

import { tw } from '../tw';
import { ArrowLeftSVG, CloseCircleSVG } from '../../svg';
import { hitSlop } from '../../helpers';

import { TextInput, TextInputProps } from './text-input';

type Props = TextInputProps & {
  onTapLeftIcon?: () => void;
  inputHeight?: number;
};

export const SearchInputHeader = memo(({ onTapLeftIcon, inputHeight = 44, onChangeText, ...props }: Props) => {
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
    <View style={tw`flex flex-row gap-2 items-center px-16px`}>
      <TouchableOpacity onPress={onTapLeftIcon} hitSlop={hitSlop(4)}>
        <ArrowLeftSVG />
      </TouchableOpacity>
      <View style={tw`flex-1`}>
        <TextInput
          {...props}
          value={text}
          onChangeText={_onTextChange}
          errorStyle={tw`hidden`}
          placeholderTextColor="#A6ABAD"
          inputContainerStyle={[tw`border border-grayscale-border bg-grayscale-bg`, { height: inputHeight }]}
          rightIcon={
            hasText ? (
              <Pressable onPress={clearText} hitSlop={hitSlop(4)}>
                <CloseCircleSVG fill="grey" />
              </Pressable>
            ) : undefined
          }
        />
      </View>
    </View>
  );
});
