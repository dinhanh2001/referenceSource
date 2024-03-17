import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SurveyEntity } from '../../graphql/type.interface';
import { ArrowRight } from '../../svg';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: SurveyEntity;
  onPress: (id: string) => void;
};

export const SurveyItem = ({ containerStyle, item, onPress }: Props) => {
  const { name, userIsSubmitSurvey } = item || {};

  const onPressItem = () => {
    onPress(item.id);
  };

  return (
    <TouchableOpacity
      style={[
        tw`flex-row border mt-4 border-${userIsSubmitSurvey ? 'primary' : '[#EEE]'} p-4 rounded-1`,
        userIsSubmitSurvey && tw`bg-[#FFFAEC]`,
        containerStyle,
      ]}
      onPress={onPressItem}
    >
      <View style={tw`flex-1 ml-1 mr-4`}>
        <Text style={tw`font-semibold`}>{name}</Text>
      </View>
      <View style={tw`self-center`}>
        <ArrowRight />
      </View>
    </TouchableOpacity>
  );
};
