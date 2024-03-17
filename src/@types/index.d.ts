declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const ReactComponent: React.FC<SvgProps>;
  // eslint-disable-next-line import/no-default-export
  export default ReactComponent;
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  // eslint-disable-next-line import/no-default-export
  export default value;
}
