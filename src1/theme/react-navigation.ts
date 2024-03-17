import { DefaultTheme, Theme } from '@react-navigation/native';

import { tw } from '../components';

export const reactNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: tw.color('primary')!, background: tw.color('white')! },
};
