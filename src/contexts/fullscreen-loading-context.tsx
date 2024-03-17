import { Text } from '@rneui/themed';
import { PropsWithChildren, createContext, memo, useCallback, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '../components/loading-indicator';
import { tw } from '../components/tw';
import { CloseCircleSVG } from '../svg';

type FullScreenLoading = {
  showFullscreenLoading(visible: boolean): Promise<boolean>;
  setHelpText(text: string): void;
};

export const FullScreenLoadingContext = createContext<FullScreenLoading>({
  showFullscreenLoading() {
    throw new Error('not yet ready');
  },
  setHelpText() {
    throw new Error();
  },
});

export const FullScreenLoadingProvider = memo(({ children }: PropsWithChildren) => {
  const [helpText, setHelpText] = useState<string>();
  const { top } = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  const showFullscreenLoading = useCallback(async (val: boolean) => {
    if (val === true) {
      setVisible(true);
      return true;
    }

    if (val === false) {
      return new Promise<boolean>((res) => {
        setHelpText(undefined);
        setVisible(false);
        setTimeout(() => {
          return res(true);
        }, 500);
      });
    }

    return false;
  }, []);

  return (
    <FullScreenLoadingContext.Provider value={{ showFullscreenLoading, setHelpText }}>
      {children}
      {visible && (
        <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
          <SafeAreaView style={tw`flex-1 justify-center items-center relative`}>
            {helpText != null && helpText.length !== 0 && (
              <Text style={tw`text-white mb-1 text-center`}>{helpText}</Text>
            )}
            <TouchableOpacity style={[tw`absolute right-20px`, { top }]} onPress={() => showFullscreenLoading(false)}>
              <CloseCircleSVG />
            </TouchableOpacity>
            <ActivityIndicator />
          </SafeAreaView>
        </Modal>
      )}
    </FullScreenLoadingContext.Provider>
  );
});

export const useFullScreenLoading = () => useContext(FullScreenLoadingContext);
