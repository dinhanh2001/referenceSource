import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './colors';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors extends MD3Colors {
      primary: string;
      secondary: string;
      secondaryDark: string;
    }
    interface MD3Theme {
      colors: ThemeColors;
    }
  }
}

const MainTheme: ReactNativePaper.MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.main,
    secondary: Colors.main,
    secondaryDark: '#EE0405',
  },
};

const MaleTheme: ReactNativePaper.MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.main,
    secondary: '#31BDF4',
    secondaryDark: '#84D0F5',
  },
};

const FemaleTheme: ReactNativePaper.MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.main,
    secondary: '#FB9FA9',
    secondaryDark: '#EE0405',
  },
};

const LgbtTheme: ReactNativePaper.MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.main,
    secondary: '#C9AAF9',
    secondaryDark: '#7F4AD9',
  },
};

export { MainTheme, MaleTheme, FemaleTheme, LgbtTheme };

export const headerNoBorderStyle = {
  borderBottomWidth: 0,
  shadowColor: 'transparent',
};

export const headerTitleStyle = ({ tintColor }: { tintColor: string }) => ({
  color: tintColor,
});
