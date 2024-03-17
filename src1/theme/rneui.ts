import { createTheme } from '@rneui/themed';

import { tw } from '../components';

export const rneui = createTheme({
  lightColors: {
    primary: tw.color('primary'),
    error: tw.color('error'),
  },
  components: {
    Input: {
      inputStyle: {
        fontSize: 14,
      },
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        height: 48,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 16,
        borderColor: tw.color('grayscale-border'),
        backgroundColor: tw.color('white'),
      },
    },
    Text: {
      style: {
        color: tw.color('text'),
        fontSize: 14,
        lineHeight: 20,
      },
    },
    Button: {
      buttonStyle: {
        height: 48,
        borderRadius: 4,
      },
      titleStyle: {
        color: tw.color('text'),
        fontWeight: '600',
        fontSize: 14,
      },
      disabledStyle: {
        backgroundColor: tw.color('primary-light'),
      },
    },
  },

  mode: 'light',
});
