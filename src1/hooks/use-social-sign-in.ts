import { useCallback, useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

type SocialSignInOptions = {
  onSuccess?(accessToken: string): void;
  onError?(error: any): void;
};

export const useGoogleSignIn = (options: SocialSignInOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.GOOGLE_AUTH_ANDROID_CLIENT_ID,
    iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
    expoClientId: process.env.RELEASE_STAGE === 'development' ? '' : undefined,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      response.authentication?.accessToken && options.onSuccess?.(response.authentication?.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);

    try {
      await promptAsync();
    } catch (error: any) {
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptAsync]);

  return { signInWithGoogle, isLoading };
};

export const useFacebookSignIn = (options: SocialSignInOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const [, response, promptAsync] = Facebook.useAuthRequest({
    clientId: process.env.FACEBOOK_AUTH_CLIENT_ID ?? '',
  });

  useEffect(() => {
    if (response?.type === 'success')
      response.authentication?.accessToken && options.onSuccess?.(response.authentication?.accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const signInWithFacebook = useCallback(async () => {
    setIsLoading(true);

    try {
      await promptAsync();
    } catch (error: any) {
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptAsync]);

  return { signInWithFacebook, isLoading };
};

export const useAppleSignIn = (options: SocialSignInOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithApple = useCallback(async () => {
    setIsLoading(true);

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      credential.identityToken && options.onSuccess?.(credential.identityToken);
    } catch (error: any) {
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { signInWithApple, isLoading };
};
