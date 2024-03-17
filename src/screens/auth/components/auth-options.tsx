import { Button } from '@rneui/themed';
import { FC, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { AppleSVG, FacebookSVG, GoogleSVG } from '../../../svg';
import { tw } from '../../../components';

export type AuthType = 'PHONE' | 'EMAIL' | 'GOOGLE' | 'FACEBOOK' | 'APPLE';

type Props = {};

export const AuthOptions = memo((_props: Props) => {
  const authenticationTypes: {
    type: AuthType;
    title: string;
    icon: FC<SvgProps>;
  }[] = useMemo(
    () => [
      {
        type: 'GOOGLE',
        title: 'Tài khoản Google',
        icon: GoogleSVG,
      },
      {
        type: 'FACEBOOK',
        title: 'Tài khoản Facebook',
        icon: FacebookSVG,
      },
      {
        type: 'APPLE',
        title: 'Tài khoản Facebook',
        icon: AppleSVG,
      },
    ],
    [],
  );

  return (
    <View style={styles.root}>
      {authenticationTypes.map(({ type, icon: Icon }) => (
        <View key={type}>
          <Button
            buttonStyle={[styles.loginButtonOption, tw`border-grayscale-border`]}
            type="outline"
            title={<Icon />}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  loginButtonOption: {
    borderRadius: 100,
    height: 48,
    marginLeft: 12,
    width: 48,
  },
  loginButtonTitle: {
    fontWeight: '400',
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
