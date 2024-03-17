import { Button } from '@rneui/themed';
import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { AppleSVG, FacebookSVG, GoogleSVG } from '../../../svg';
import { tw } from '../../../components';
import { SocialAccountTypeEnum } from '../../../graphql/type.interface';
import { useAppleSignIn, useErrorHandler, useFacebookSignIn, useGoogleSignIn } from '../../../hooks';
import { useAuth, useFullScreenLoading, useOverlay } from '../../../contexts';
import { SocialLoginMutationResponse, useSocialLoginMutation } from '../../../graphql/mutations/socialLogin.generated';

type Props = {
  onLogin(data: SocialLoginMutationResponse): void;
};

export const SocialAuthOptions = memo(({ onLogin }: Props) => {
  const authenticationTypes: {
    type: SocialAccountTypeEnum;
    title: string;
    icon: FC<SvgProps>;
  }[] = useMemo(
    () => [
      {
        type: SocialAccountTypeEnum.GOOGLE,
        title: 'Tài khoản Google',
        icon: GoogleSVG,
      },
      {
        type: SocialAccountTypeEnum.FACEBOOK,
        title: 'Tài khoản Facebook',
        icon: FacebookSVG,
      },
      ...(Platform.OS === 'ios'
        ? [
            {
              type: SocialAccountTypeEnum.APPLE,
              title: 'Tài khoản Apple',
              icon: AppleSVG,
            },
          ]
        : []),
    ],
    [],
  );

  const { deviceId } = useAuth();

  const { showErrorDialog } = useErrorHandler();

  const [socialLogin, { loading: isLogging }] = useSocialLoginMutation({
    onCompleted: onLogin,
    onError: showErrorDialog(),
  });

  const { showDialog } = useOverlay();

  const showSocialConnectError = useCallback(() => {
    setTimeout(() => {
      showDialog({
        type: 'ALERT',
        title: 'Đăng nhập thất bại',
        message: 'Đăng nhập thất bại, vui lòng thử lại sau.',
      });
    }, 1000);
  }, [showDialog]);

  const { signInWithGoogle, isLoading: isGoogleSigning } = useGoogleSignIn({
    onSuccess: (socialToken) =>
      socialLogin({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.GOOGLE,
            deviceId,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { signInWithFacebook, isLoading: isFacebookSigning } = useFacebookSignIn({
    onSuccess: (socialToken) =>
      socialLogin({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.FACEBOOK,
            deviceId,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { signInWithApple, isLoading: isAppleSigning } = useAppleSignIn({
    onSuccess: (socialToken) =>
      socialLogin({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.APPLE,
            deviceId,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(isFacebookSigning || isGoogleSigning || isAppleSigning || isLogging);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFacebookSigning, isGoogleSigning, isAppleSigning, isLogging]);

  const handleLogin = useCallback(
    async (type: SocialAccountTypeEnum) => {
      switch (type) {
        case SocialAccountTypeEnum.GOOGLE:
          await signInWithGoogle();
          break;
        case SocialAccountTypeEnum.FACEBOOK:
          await signInWithFacebook();
          break;
        case SocialAccountTypeEnum.APPLE:
          await signInWithApple();
          break;
        default:
          break;
      }
    },
    [signInWithApple, signInWithFacebook, signInWithGoogle],
  );

  return (
    <View style={styles.root}>
      {authenticationTypes.map(({ type, icon: Icon }) => (
        <View key={type}>
          <Button
            buttonStyle={styles.loginButtonOption}
            type="outline"
            title={<Icon />}
            onPress={() => handleLogin(type)}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  loginButtonOption: {
    borderColor: tw.color('grayscale-border'),
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
