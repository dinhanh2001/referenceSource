import { PropsWithChildren, memo, useState, useEffect, useMemo } from 'react';
import { CheckBox as RnCheckBox, CheckBoxProps } from '@rneui/themed';
import { View } from 'react-native';

import { CheckSVG } from '../../svg';
import { tw } from '../tw';
import { PartialBy } from '../../@types/utility';

type Props = PartialBy<PropsWithChildren<CheckBoxProps>, 'checked' | 'onPress'> & {
  defaultValue?: boolean;
  value?: boolean;
  onChange?(value: boolean): void;
  controlled?: boolean;
  isRadioCheckbox?: boolean;
  isNormal?: boolean;
  colorUnChecked?: string;
  colorChecked?: string;
  size?: number;
};

export const Checkbox = memo(
  ({
    defaultValue,
    value,
    onChange,
    controlled,
    isRadioCheckbox,
    isNormal,
    colorChecked = 'primary',
    colorUnChecked = 'grayscale-border',
    size = 24,
    ...props
  }: Props) => {
    const [checked, setChecked] = useState((value == null ? defaultValue : value) ?? false);

    useEffect(() => {
      if (value !== checked) setChecked(value === true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
      onChange?.(checked);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const renderCheckedIcon = useMemo(() => {
      if (isNormal) {
        return (
          <View
            style={[
              tw`w-${size}px h-${size}px rounded-2px flex justify-center items-center border border-${colorChecked}`,
              isRadioCheckbox ? tw`rounded-full` : undefined,
            ]}
          >
            <View style={[tw`w-10px h-10px bg-${colorChecked}`, isRadioCheckbox ? tw`rounded-full` : undefined]} />
          </View>
        );
      }

      return (
        <View
          style={[
            tw`w-${size}px h-${size}px rounded-2px flex justify-center items-center bg-${colorChecked}`,
            isRadioCheckbox ? tw`rounded-full` : undefined,
          ]}
        >
          <CheckSVG />
        </View>
      );
    }, [colorChecked, isNormal, isRadioCheckbox, size]);

    return (
      <RnCheckBox
        checked={checked}
        onPress={() => !controlled && setChecked(!checked)}
        pointerEvents={controlled ? 'none' : undefined}
        checkedIcon={renderCheckedIcon}
        titleProps={{
          style: tw`font-normal ml-12px border-b-2`,
        }}
        uncheckedIcon={
          <View
            style={[
              tw`w-${size}px h-${size}px rounded-2px border border-${colorUnChecked}`,
              isRadioCheckbox ? tw`rounded-full` : undefined,
            ]}
          />
        }
        containerStyle={tw`m-0 p-0`}
        {...props}
      />
    );
  },
);
