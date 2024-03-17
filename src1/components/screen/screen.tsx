import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView as RnSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

type Props = PropsWithChildren<SafeAreaViewProps>;

export const Screen = memo(({ children, ...props }: Props) => {
  return (
    <RnSafeAreaView {...props} style={[styles.root, props.style]} edges={props.edges ?? ['top']}>
      {children}
    </RnSafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
