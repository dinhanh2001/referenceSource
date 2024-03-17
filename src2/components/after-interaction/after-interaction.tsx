import React, { useState, useEffect, useMemo } from 'react';
import { InteractionManager, View } from 'react-native';

import { tw } from '../tw';
import { ActivityIndicator } from '../loading-indicator';

type Props = {
  children?: React.ReactNode;
  skeleton?: React.ReactNode;
  forceShow?: boolean;
};

export const AfterInteraction = ({ children, forceShow, skeleton }: Props) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinished(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinished(true);
    });
  }, []);

  const renderSkeleton = useMemo(() => {
    if (skeleton) {
      return skeleton;
    }

    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  }, [skeleton]);

  return <View style={tw`flex-1`}>{(finished && !forceShow && children) || renderSkeleton}</View>;
};
