import { Button, Text } from '@rneui/themed';
import { createContext, memo, PropsWithChildren, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { tw } from '../components/tw';

export type DialogOption = {
  title: string | ReactNode;
  message: ReactNode;
  confirmText?: string;
  icon?: ReactNode;
  columnAction?: boolean;
  onOk?: () => void;
} & (
  | {
      type: 'CONFIRM';
      cancelText?: string;
      hiddenButtonCancel?: boolean;
    }
  | {
      type: 'ALERT';
    }
);

type Overlay = {
  showDialog(option: DialogOption): Promise<boolean>;
};

const OverlayContext = createContext<Overlay>({
  showDialog() {
    throw new Error('not yet ready');
  },
});

type Props = PropsWithChildren;

export const OverlayProvider = memo(({ children }: Props) => {
  const [dialog, setDialog] = useState<DialogOption | undefined>();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const dialogResolveRef = useRef<(val: boolean) => void>();

  const showDialog = useCallback(function (dialogOption: DialogOption) {
    if (dialogResolveRef.current != null) dialogResolveRef.current = undefined;

    setDialog(dialogOption);
    setDialogVisible(true);

    return new Promise<boolean>((resolve) => {
      dialogResolveRef.current = resolve;
    });
  }, []);

  const resolveDialog = useCallback((val: boolean) => {
    setDialogVisible(false);

    setTimeout(() => {
      dialogResolveRef.current?.(val);
      dialogResolveRef.current = undefined;
    }, 500);
  }, []);

  return (
    <OverlayContext.Provider value={{ showDialog }}>
      {children}
      <Modal isVisible={dialogVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`w-full rounded-4px bg-white p-20px`}>
            {dialog?.icon && <View style={tw`items-center mb-20px`}>{dialog.icon}</View>}
            {typeof dialog?.title === 'string' ? (
              <Text style={tw.style(`text-17px font-semibold`, dialog?.type === 'ALERT' && 'text-center')}>
                {dialog?.title}
              </Text>
            ) : (
              dialog?.title
            )}
            {typeof dialog?.message === 'string' ? (
              <Text style={tw.style(`mt-12px text-grayscale-gray`, dialog?.type === 'ALERT' && 'text-center')}>
                {dialog?.message}
              </Text>
            ) : (
              dialog?.message
            )}
            <View style={tw`flex-row justify-center mt-20px ${dialog?.columnAction ? 'flex-wrap' : ''}`}>
              {dialog?.type === 'CONFIRM' && !dialog?.hiddenButtonCancel && (
                <View style={tw`${dialog?.columnAction ? 'w-full' : 'pr-8px w-1/2'}`}>
                  <Button
                    type="outline"
                    title={dialog.cancelText ?? 'Huỷ'}
                    onPress={() => resolveDialog(false)}
                    buttonStyle={tw`h-40px border-grayscale-disabled`}
                    titleStyle={tw`text-13px`}
                  />
                </View>
              )}
              <View
                style={tw.style(
                  dialog?.type === 'CONFIRM' ? (dialog?.columnAction ? 'w-full mt-3' : 'pl-8px w-1/2') : 'w-[200px]',
                )}
              >
                <Button
                  title={dialog?.confirmText ?? 'Xác nhận'}
                  onPress={() => {
                    if (dialog?.onOk) {
                      dialog.onOk();
                    }
                    resolveDialog(true);
                  }}
                  buttonStyle={tw`h-40px`}
                  titleStyle={tw`text-13px`}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </OverlayContext.Provider>
  );
});

export const useOverlay = () => useContext(OverlayContext);
