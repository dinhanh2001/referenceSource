import { memo } from 'react';
import { Text } from 'react-native';

import { tw } from '../tw';

type Props = {
  message: string;
};

export const FieldError = memo(({ message }: Props) => {
  return <Text style={tw`text-12px text-error mt-8px`}>{message}</Text>;
});
