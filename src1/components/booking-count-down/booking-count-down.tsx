import { memo, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import dayjs from 'dayjs';

import { tw } from '../tw';
import { TimerSvg } from '../../svg';
import { useCountdown } from '../../hooks';

type Props = {
  startFrom: string;
};

export const BookingCountDown = memo(({ startFrom }: Props) => {
  const [targetDate] = useState(dayjs(startFrom).add(15, 'minutes'));

  const [, { minutes, seconds }] = useCountdown({
    targetDate,
  });

  return (
    <View
      style={tw`flex-row border border-primary rounded-lg w-[70px] h-[26px] justify-center items-center px-1 bg-[#FFEFC4]`}
    >
      <TimerSvg />
      <Text style={tw`text-[13px] ml-1`}>
        {`0${minutes}`.slice(-2)}:{`0${seconds}`.slice(-2)}
      </Text>
    </View>
  );
});
