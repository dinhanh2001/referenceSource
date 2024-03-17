import { Text } from '@rneui/themed';
import { memo } from 'react';

import { tw } from '../tw';

type Prop = {
  children: string;
};

export const Trans = memo(({ children }: Prop) => {
  const arrays = children.split(/<bold>|<\/bold>/);

  return arrays.length === 1 ? (
    <Text>
      <TransByPrimaryColor>{children}</TransByPrimaryColor>
    </Text>
  ) : (
    <Text>
      <TransByPrimaryColor>{arrays[0]}</TransByPrimaryColor>
      <Text style={tw`font-bold`}>
        <TransByPrimaryColor>{arrays[1]}</TransByPrimaryColor>
      </Text>
      <Trans>{arrays[2]}</Trans>
    </Text>
  );
});

const TransByPrimaryColor = memo(({ children }: Prop) => {
  const arrays = children.split(/<primary>|<\/primary>/);

  return arrays.length === 1 ? (
    <Text>{children}</Text>
  ) : (
    <Text>
      {arrays[0]}
      <Text style={tw`text-primary`}>{arrays[1]}</Text>
      <Trans>{arrays[2]}</Trans>
    </Text>
  );
});
