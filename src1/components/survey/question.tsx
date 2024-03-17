import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo } from 'react';

import { AnswerType, QuestionEntity } from '../../graphql/type.interface';
import { tw } from '../tw';
import { TextInput } from '../text-input';

type Props = {
  item: QuestionEntity;
  index: number;
  containerStyle?: StyleProp<ViewStyle>;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
};

export const QuestionSurvey = ({ item, index, containerStyle, value, onChange, disabled }: Props) => {
  const { question, answerType, answers, isRequired } = item || {};

  const onPressAnswer = useCallback(
    (ans: string) => () => {
      if (answerType === AnswerType.CHECKBOX) {
        if (value?.includes?.(ans)) {
          onChange?.((value as string[])?.filter?.((it) => it !== ans));
        } else {
          onChange?.([...(value as string[]), ans]);
        }
      } else {
        onChange?.(ans);
      }
    },
    [answerType, onChange, value],
  );

  const renderAnswer = useCallback(
    (it: string, idx: number) => {
      const selected = answerType === AnswerType.CHECKBOX ? (value as string[])?.includes?.(it) : value === it;
      const color = selected ? 'black' : 'gray';

      return (
        <TouchableOpacity
          disabled={disabled}
          style={tw`flex-row mt-2 border p-3 border-${selected ? 'primary' : '[#EEE]'} rounded-1`}
          key={idx}
          onPress={onPressAnswer(it)}
        >
          <Text style={tw`text-grayscale-${color} font-semibold`}>{String.fromCharCode(65 + idx)}. </Text>
          <Text style={tw`text-grayscale-${color}`}>{it}</Text>
        </TouchableOpacity>
      );
    },
    [answerType, disabled, onPressAnswer, value],
  );

  const renderAnswers = useMemo(() => {
    if (answerType === AnswerType.SHORT_ANSWER) {
      return (
        <TextInput
          editable={!disabled}
          containerStyle={tw`mt-2`}
          placeholder="Nhập..."
          value={value as string}
          onChangeText={onChange}
        />
      );
    }

    return <View style={tw`mt-1`}>{answers?.map?.(renderAnswer)}</View>;
  }, [answerType, answers, renderAnswer, disabled, value, onChange]);

  return (
    <View style={[tw`mt-4 mx-4`, containerStyle]}>
      <View style={tw`flex-row`}>
        <Text style={tw`font-semibold`}>{index}.</Text>
        <Text style={tw`ml-1.5 font-semibold`}>
          {question} {isRequired && <Text style={tw`text-error`}>*</Text>}
        </Text>
      </View>
      {renderAnswers}
    </View>
  );
};
