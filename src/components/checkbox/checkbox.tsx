import { PropsWithChildren, memo, useState, useEffect } from 'react';
import { CheckBox as RnCheckBox, CheckBoxProps } from '@rneui/themed';
import { View } from 'react-native';

import { CheckSVG } from '../../svg';
import { tw } from '../tw';

type Props = Omit<PropsWithChildren<CheckBoxProps>, 'checked'> & {
  defaultValue?: boolean;
  value?: boolean;
  onChange?(value: boolean): void;
};

export const Checkbox = memo(({ defaultValue, value, onChange, ...props }: Props) => {
  const [checked, setChecked] = useState((value == null ? defaultValue : value) ?? false);

  useEffect(() => {
    onChange?.(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    value !== undefined && setChecked(value);
  }, [value]);

  return (
    <RnCheckBox
      checked={checked}
      onPress={() => setChecked(!checked)}
      checkedIcon={
        <View style={tw`w-24px h-24px rounded-2px flex justify-center items-center bg-primary`}>
          <CheckSVG />
        </View>
      }
      titleProps={{
        style: tw`font-normal ml-12px`,
      }}
      uncheckedIcon={<View style={tw`w-24px h-24px rounded-2px border border-grayscale-border`} />}
      containerStyle={tw`m-0 p-0`}
      {...props}
    />
  );
});
