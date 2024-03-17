import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle, View } from 'react-native';

import { SurveyEntity } from '../../graphql/type.interface';
import { tw } from '../tw';
import { ArrowRightSVG } from '../../svg';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: SurveyEntity;
  onPress: (id: string) => void;
};

export const SurveyItem = ({ containerStyle, item, onPress }: Props) => {
  const { name, partnerIsSubmitSurvey } = item || {};

  const onPressItem = () => {
    onPress(item.id);
  };

  return (
    <TouchableOpacity
      style={[
        tw`flex-row border mt-4 border-${partnerIsSubmitSurvey ? 'primary' : '[#EEE]'} p-4 rounded-1`,
        partnerIsSubmitSurvey && tw`bg-[#FFFAEC]`,
        containerStyle,
      ]}
      onPress={onPressItem}
    >
      <View style={tw`flex-1 ml-1 mr-4`}>
        <Text style={tw`font-semibold`}>{name}</Text>
      </View>
      <View style={tw`self-center`}>
        <ArrowRightSVG />
      </View>
    </TouchableOpacity>
  );
};
