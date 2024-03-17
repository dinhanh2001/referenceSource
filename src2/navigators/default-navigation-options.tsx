import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { ArrowLeftSVG } from '../svg';

export const defaultStackNavigationOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerBackImage: () => <ArrowLeftSVG style={styles.backIcon} />,
};

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: 18,
  },
});
