import { StackNavigationOptions } from '@react-navigation/stack';

import { ArrowLeftSVG } from '../svg';
import { tw } from '../components';

export const defaultStackNavigationOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerBackImage: () => <ArrowLeftSVG style={tw`ml-18px`} fill={tw.color('black')} />,
};

export const withHeader: StackNavigationOptions = {
  headerShown: true,
  headerTransparent: false,
  headerStyle: {
    borderBottomColor: tw.color('transparent'),
    shadowOpacity: 0,
  },
  headerBackgroundContainerStyle: {
    borderColor: tw.color('transparent'),
  },
  ...defaultStackNavigationOptions,
};
