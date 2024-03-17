import { memo, useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Text } from '@rneui/themed';

import { AppleSVG, FacebookSVG, GoogleSVG } from '../../svg';
import { ActivityIndicator, Switch, tw } from '../../components';
import { useGetConnectedSocialAccountsQuery } from '../../graphql/queries/getConnectedSocialAccounts.generated';
import { SocialAccountTypeEnum } from '../../graphql/type.interface';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { useAppleSignIn, useErrorHandler, useFacebookSignIn, useGoogleSignIn } from '../../hooks';
import { useConnectSocialAccountMutation } from '../../graphql/mutations/connectSocialAccount.generated';
import { useDisconnectSocialAccountMutation } from '../../graphql/mutations/disconnectSocialAccount.generated';

export const ConnectSocialAccount = memo(() => {
  const [google, setGoogle] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [apple, setApple] = useState(false);

  const { loading } = useGetConnectedSocialAccountsQuery({
    onCompleted: (res) => {
      setGoogle(res.getConnectedSocialAccounts.some((it) => it.type === SocialAccountTypeEnum.GOOGLE));
      setFacebook(res.getConnectedSocialAccounts.some((it) => it.type === SocialAccountTypeEnum.FACEBOOK));
      setApple(res.getConnectedSocialAccounts.some((it) => it.type === SocialAccountTypeEnum.APPLE));
    },
    fetchPolicy: 'cache-and-network',
  });

  const { showErrorDialog } = useErrorHandler();

  const [connect, { loading: connecting }] = useConnectSocialAccountMutation({
    onError: showErrorDialog(),
    onCompleted: (res) => {
      if (res.connectSocialAccount.type === SocialAccountTypeEnum.GOOGLE) setGoogle(true);
      if (res.connectSocialAccount.type === SocialAccountTypeEnum.FACEBOOK) setFacebook(true);
      if (res.connectSocialAccount.type === SocialAccountTypeEnum.APPLE) setApple(true);
    },
  });

  const [disconnect, { loading: disconnecting }] = useDisconnectSocialAccountMutation({
    onError: showErrorDialog(),
  });

  const { showDialog } = useOverlay();

  const showSocialConnectError = useCallback(() => {
    setTimeout(() => {
      showDialog({
        type: 'ALERT',
        title: 'Đăng nhập thất bại',
        message: 'Liên kết tài khoản thất bại, vui lòng thử lại sau.',
      });
    }, 1000);
  }, [showDialog]);

  const { signInWithGoogle, isLoading: isGoogleSigning } = useGoogleSignIn({
    onSuccess: (socialToken) =>
      connect({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.GOOGLE,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { signInWithFacebook, isLoading: isFacebookSigning } = useFacebookSignIn({
    onSuccess: (socialToken) =>
      connect({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.FACEBOOK,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { signInWithApple, isLoading: isAppleSigning } = useAppleSignIn({
    onSuccess: (socialToken) =>
      connect({
        variables: {
          input: {
            socialToken,
            socialType: SocialAccountTypeEnum.APPLE,
          },
        },
      }),
    onError: showSocialConnectError,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(isFacebookSigning || isGoogleSigning || isAppleSigning || connecting || disconnecting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFacebookSigning, isGoogleSigning, isAppleSigning, connecting, disconnecting]);

  const handleConnect = useCallback(
    async (type: SocialAccountTypeEnum) => {
      switch (type) {
        case SocialAccountTypeEnum.GOOGLE:
          !google
            ? await signInWithGoogle()
            : disconnect({
                variables: {
                  input: {
                    socialType: SocialAccountTypeEnum.GOOGLE,
                  },
                },
                onCompleted: () => setGoogle(false),
              });
          break;
        case SocialAccountTypeEnum.FACEBOOK:
          !facebook
            ? await signInWithFacebook()
            : disconnect({
                variables: {
                  input: {
                    socialType: SocialAccountTypeEnum.FACEBOOK,
                  },
                },
                onCompleted: () => setFacebook(false),
              });
          break;
        case SocialAccountTypeEnum.APPLE:
          !apple
            ? await signInWithApple()
            : disconnect({
                variables: {
                  input: {
                    socialType: SocialAccountTypeEnum.APPLE,
                  },
                },
                onCompleted: () => setApple(false),
              });
          break;
        default:
          break;
      }
    },
    [apple, disconnect, facebook, google, signInWithApple, signInWithFacebook, signInWithGoogle],
  );

  if (loading) return <ActivityIndicator />;

  return (
    <>
      <View style={tw`flex-row items-end justify-between mt-12px pb-12px`}>
        <GoogleSVG width={20} height={20} />
        <Text style={tw`text-14px flex-1 ml-16px`}>Google</Text>
        <Switch value={google} onChange={() => handleConnect(SocialAccountTypeEnum.GOOGLE)} />
        <View style={tw`absolute bottom-0 right-0 left-0 border-b bg-primary ml-36px border-grayscale-border`} />
      </View>

      <View style={tw`flex-row items-end justify-between mt-12px pb-12px`}>
        <FacebookSVG width={20} height={20} />
        <Text style={tw`text-14px flex-1 ml-16px`}>Facebook</Text>
        <Switch value={facebook} onChange={() => handleConnect(SocialAccountTypeEnum.FACEBOOK)} />
        <View style={tw`absolute bottom-0 right-0 left-0 border-b bg-primary ml-36px border-grayscale-border`} />
      </View>

      {Platform.OS === 'ios' && (
        <View style={tw`flex-row items-end justify-between mt-12px pb-12px`}>
          <AppleSVG width={20} height={20} />
          <Text style={tw`text-14px flex-1 ml-16px`}>Apple</Text>
          <Switch value={apple} onChange={() => handleConnect(SocialAccountTypeEnum.APPLE)} />
          <View style={tw`absolute bottom-0 right-0 left-0 border-b bg-primary ml-36px border-grayscale-border`} />
        </View>
      )}
    </>
  );
});
