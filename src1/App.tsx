import { CallPhone, LocationPermission, SafeAreaStatusBar } from 'components';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useRef } from 'react';
// import codePush from 'react-native-code-push';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { configStore } from 'store/createStore';
import { momentConfig } from 'utils';
import Root from './Root';

const { store } = configStore();
moment.updateLocale('vi', momentConfig);

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESUME,
// };

const App = () => {
  const modalCallPhone = useRef(null);
  useEffect(() => {
    // codePush.sync();
    LocationPermission();
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaStatusBar backgroundColor="transparent" />
      <Provider store={store}>
        <Root />
      </Provider>

      <CallPhone ref={modalCallPhone} />
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default App;
