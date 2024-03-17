import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppHeader, Screen, tw } from '../../components';
import { OTP_SIGN_UP_BLOCKED_TIME } from '../../constants';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { useResendOtpMutation } from '../../graphql/mutations/resendOtp.generated';
import { useVerifyOtpMutation } from '../../graphql/mutations/verifyOtp.generated';
import { ActiveCodeEnum, ActorTypeEnum } from '../../graphql/type.interface';
import { useCountdown } from '../../hooks';
import { RootNavigatorParamList } from '../../navigator-params';

type ScreenRouteProp = RouteProp<RootNavigatorParamList, 'verifyOtp'>;
type ScreenNavigationProp = NavigationProp<RootNavigatorParamList, 'verifyOtp'>;

export const VerifyOtpScreen = memo(() => {
  const [attemptLeft, setAttemptLeft] = useState(5);
  const [isFormError, setIsFormError] = useState(false);
  const [code, setCode] = useState<string>();
  const [targetDate, setTargetDate] = useState(dayjs().add(60, 'seconds'));

  const { params: routeParams } = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const { showDialog } = useOverlay();

  const handleOTPVerificationFailure = useCallback(async () => {
    if (attemptLeft === 1) {
      await AsyncStorage.setItem(OTP_SIGN_UP_BLOCKED_TIME, dayjs().add(2, 'minutes').toISOString());
      setTimeout(async () => {
        await showDialog({
          type: 'ALERT',
          title: 'Thông báo',
          message: 'Bạn đã nhập sai quá 5 lần. Vui lòng thử lại',
        });
        navigation.goBack();
      }, 600);
    } else {
      setIsFormError(true);
      setAttemptLeft((val) => val - 1);
    }
    setCode('');
  }, [attemptLeft, navigation, showDialog]);

  const [resendOTP, { loading: isSendingOtp }] = useResendOtpMutation({
    update: () => {
      setTargetDate(dayjs().add(60, 'seconds'));
    },
  });

  const [verifyOtp, { loading: verifyingOTP }] = useVerifyOtpMutation({
    onError: async () => {
      await handleOTPVerificationFailure();
      setCode('');
    },
    onCompleted: async (resp) => {
      if (!resp.verifyOtp) {
        await handleOTPVerificationFailure();
        return;
      }

      if (code && routeParams.type === ActiveCodeEnum.ACTIVATE) {
        navigation.navigate('auth', {
          screen: 'passwordCreation',
          params: {
            phone: routeParams.phone,
          },
        });
      }
    },
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(verifyingOTP);

    return () => {
      showFullscreenLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyingOTP]);

  const handleCodeFilled = useCallback(
    async (value: string) => {
      await verifyOtp({
        variables: {
          input: {
            otpCode: value,
            phone: routeParams.phone,
            deviceId: routeParams.deviceId,
            type: routeParams.type,
          },
        },
      });
    },
    [routeParams.deviceId, routeParams.phone, routeParams.type, verifyOtp],
  );

  const [countdown, { minutes, seconds }] = useCountdown({
    targetDate,
  });

  const handleResendOTP = useCallback(() => {
    resendOTP({
      variables: {
        input: {
          actor: ActorTypeEnum.USER,
          type: routeParams.type,
          phone: routeParams.phone,
        },
      },
    });
  }, [resendOTP, routeParams.phone, routeParams.type]);

  return (
    <Screen style={tw`flex-1`}>
      <AppHeader title="Nhập mã xác nhận" titlePosition="center" />
      <Text style={tw`text-center px-35px mt-16px`}>
        Mã xác nhận gồm 6 chữ số đã được gửi tới số điện thoại <Text style={tw`font-bold`}>{routeParams.phone}</Text>
      </Text>

      <View style={tw`mt-24px px-30px`}>
        <OTPInputView
          style={tw`h-60px`}
          pinCount={6}
          code={code}
          autoFocusOnLoad
          onCodeChanged={(val) => {
            setIsFormError(false);
            setCode(val);
          }}
          codeInputFieldStyle={[
            tw`w-40px h-42px rounded-8px border-solid text-19px mx-0 ml-0 mr-0`,
            isFormError ? tw`border-error text-error` : tw`border-grayscale-border text-grayscale-black`,
            styles.borderHalf,
          ]}
          codeInputHighlightStyle={tw`border-grayscale-black`}
          onCodeFilled={handleCodeFilled}
        />
        {isFormError && <Text style={tw`text-error`}>Mã xác thực không đúng. Bạn còn {attemptLeft} lần để nhập</Text>}
      </View>
      <View style={tw`mt-24px mx-auto`}>
        <Text style={tw`text-center`}>
          {countdown === 0 ? (
            <Button type="clear" onPress={handleResendOTP} disabled={isSendingOtp} loading={isSendingOtp}>
              <View style={tw`border-b border-solid border-primary`}>
                <Text style={tw`text-primary font-semibold leading-20px`}>Gửi lại mã</Text>
              </View>
            </Button>
          ) : (
            <Text>
              Gửi lại mã sau <Text style={tw`text-primary`}>{`${minutes}:${`0${seconds}`.slice(-2)}`}</Text>
            </Text>
          )}
        </Text>
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  borderHalf: {
    borderWidth: 0.5,
  },
});
