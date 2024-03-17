import { PropsWithChildren, memo, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type Props = PropsWithChildren<ViewProps>;
export const KeyboardAwareScrollViewComponent = memo(({ children, style: defaultStyle, ...props }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [keyboardBottomPadding, setKeyboardBottomPadding] = useState(0);

  return (
    <View
      {...props}
      style={[defaultStyle, { paddingBottom: keyboardBottomPadding > 0 ? keyboardBottomPadding + 16 : bottom }]}
    >
      <KeyboardAwareScrollView
        scrollIndicatorInsets={{ right: 1 }}
        keyboardShouldPersistTaps={'handled'}
        onKeyboardDidShow={(frames: any) => {
          setKeyboardBottomPadding(frames.endCoordinates.height);
        }}
        onKeyboardDidHide={() => {
          setKeyboardBottomPadding(0);
        }}
      />
      {children}
    </View>
  );
});
