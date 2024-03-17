import { memo, useEffect, useState } from 'react';
import { InteractionManager, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { SwitchIcon } from '../../svg';
import { tw } from '../tw';

type Props = {
  value?: boolean;
  onChange?(val: boolean): void;
};

export const Switch = memo(({ value, onChange }: Props) => {
  const isControlled = onChange != null;

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (internalValue !== value) setInternalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (value !== internalValue) onChange?.(internalValue === true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  const left = internalValue ? 20 : -1;

  return (
    <Pressable
      style={tw.style('w-44px h-22px')}
      onPress={() => (isControlled ? onChange(!value) : setInternalValue(!internalValue))}
    >
      <Animatable.View
        style={tw.style('flex-1 relative rounded-full justify-center', internalValue ? 'bg-[#FFC42C]' : 'bg-[#A6ABAD]')}
        transition={['backgroundColor']}
      >
        <Animatable.View style={[tw`absolute justify-center top-0px`, { left }]} transition={['left']}>
          {/* Icon switch */}
          <SwitchIcon />
          {/* <View style={tw`icon-switch w-18px h-18px bg-white rounded-full`} /> */}
        </Animatable.View>
      </Animatable.View>
    </Pressable>
  );
});

Switch.displayName = 'Switch';
