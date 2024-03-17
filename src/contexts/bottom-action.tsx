import { Text } from '@rneui/themed';
import { createContext, Fragment, memo, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { tw } from '../components/tw';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../utils';

type DialogOption = {
  title: string;
  actions?: Array<{ key: string; title: string }>;
};

type Overlay = {
  showActionDialog(option: DialogOption): Promise<string | boolean>;
};

const BottomContext = createContext<Overlay>({
  showActionDialog() {
    throw new Error('not yet ready');
  },
});

type Props = PropsWithChildren;

export const BottomActionProvider = memo(({ children }: Props) => {
  const [dialog, setDialog] = useState<DialogOption | undefined>();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const dialogResolveRef = useRef<(val: string | boolean) => void>();

  const showActionDialog = useCallback(function (dialogOption: DialogOption) {
    if (dialogResolveRef.current != null) dialogResolveRef.current = undefined;

    setDialog(dialogOption);
    setDialogVisible(true);
    return new Promise<string | boolean>((resolve) => {
      dialogResolveRef.current = resolve;
    });
  }, []);

  const resolveDialog = useCallback((val: string | boolean) => {
    dialogResolveRef.current?.(val);
    dialogResolveRef.current = undefined;
    setDialogVisible(false);
  }, []);

  return (
    <BottomContext.Provider value={{ showActionDialog }}>
      {children}
      <Modal
        isVisible={dialogVisible}
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        animationIn="slideInUp"
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={false}
        deviceHeight={DEVICE_HEIGHT}
        deviceWidth={DEVICE_WIDTH}
        style={tw`flex-1 m-0`}
      >
        <View style={tw`flex-1 justify-end mb-32px mx-16px`}>
          <View style={tw``}>
            <View style={tw`mb-8px bg-white rounded-xl overflow-hidden`}>
              <Text style={tw`text-center my-12px text-grayscale-light`}>{dialog?.title}</Text>
              <View style={tw`h-0.5px bg-grayscale-border`} />
              {dialog &&
                dialog.actions?.map((act, index) => (
                  <Fragment key={act.key}>
                    <TouchableOpacity onPress={() => resolveDialog(act.key)} style={tw`items-center py-18px`}>
                      <Text style={tw`text-20px text-systemblue`}>{act.title}</Text>
                    </TouchableOpacity>
                    {dialog.actions && index !== dialog.actions?.length - 1 && (
                      <View style={tw`h-0.5px bg-grayscale-border`} />
                    )}
                  </Fragment>
                ))}
            </View>
            <TouchableOpacity onPress={() => resolveDialog(false)} style={tw`items-center py-18px rounded-xl bg-white`}>
              <Text style={tw`text-20px text-systemblue font-semibold`}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BottomContext.Provider>
  );
});

export const useBottomAction = () => useContext(BottomContext);
