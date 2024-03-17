import React, { Suspense, useMemo } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { CartProvider } from 'context';
import { Navigator } from 'navigation';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import codePush from 'react-native-code-push';
import { Provider as PaperProvider } from 'react-native-paper';

import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { BaseStyle } from 'theme';
import { FemaleTheme, LgbtTheme, MainTheme, MaleTheme } from 'theme/AppTheme';
import { UserSelectors } from 'store/user';
import { IUserInfo } from 'types';
import i18n from './i18n';

const Root = () => {
  const { gender } = useSelector(
    UserSelectors.getAttrByKey('userInfo') || {},
  ) as IUserInfo;

  const theme = useMemo(() => {
    if (gender === 'MALE') {
      return MaleTheme;
    }
    if (gender === 'FEMALE') {
      return FemaleTheme;
    }
    if (gender === 'UNKNOWN') {
      return LgbtTheme;
    }

    return MainTheme;
  }, [gender]);

  return (
    <PaperProvider theme={theme}>
      <BottomSheetModalProvider>
        <GestureHandlerRootView style={BaseStyle.flex1}>
          <PortalProvider>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback={null}>
                <CartProvider>
                  <Navigator />
                  <Toast />
                </CartProvider>
                {/* <BottomSheetAlert ref={modalAlert} /> */}
              </Suspense>
            </I18nextProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </BottomSheetModalProvider>
    </PaperProvider>
  );
};

export default Root;
