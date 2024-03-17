import Icon from 'assets/svg/Icon';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform, Image } from 'react-native';
import {
  MapMarker,
  LatLng,
  AnimatedRegion,
  MarkerAnimated,
  MapMarkerProps,
} from 'react-native-maps';
import { Images } from 'assets';
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion';

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

interface MarkerBikerProps extends LatLng {
  durationAnimation?: number;
  marker?: string;
  type?: 'car' | 'bike' | 'driver';
  markerProps?: Omit<MapMarkerProps, 'coordinate'>;
  index?: number;
}

export const MarkerBikerRandom: React.FC<MarkerBikerProps> = ({
  durationAnimation = 5000,
  ...props
}) => {
  const [location] = useState({
    lat: props.latitude - getRandomFloat(-0.005, 0.003, 6),
    long: props.longitude - getRandomFloat(-0.003, 0.005, 6),
  });
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // intervalRef.current = setInterval(() => {
    //   const newLoc = {
    //     lat: props.latitude - getRandomFloat(-0.0028, 0.0028, 6),
    //     long: props.longitude - getRandomFloat(-0.0028, 0.0028, 6),
    //   };
    //   setLocation(newLoc);
    // }, 7000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props.longitude, props.latitude]);
  return (
    <MarkerBiker
      longitude={location.long}
      latitude={location.lat}
      durationAnimation={durationAnimation}
      type={props.type}
      marker={props.marker}
      index={props?.index ?? 1}
    />
  );
};

const MarkerBiker = React.forwardRef<any, MarkerBikerProps>(
  ({ durationAnimation = 5000, ...props }, ref) => {
    const duration = useMemo(() => durationAnimation, [durationAnimation]);
    const markerRef = useRef<MapMarker>(null);
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [coords] = useState<AnimatedRegion>(
      new AnimatedRegion({
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    );

    useImperativeHandle(ref, () => markerRef.current);

    useEffect(() => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      try {
        timeOutRef.current = setTimeout(() => {
          if (coords) {
            const newLoc = {
              latitude: props.latitude,
              longitude: props.longitude,
            };
            if (Platform.OS === 'android') {
              markerRef?.current?.animateMarkerToCoordinate?.(newLoc, duration);
            } else {
              coords
                .timing?.({
                  latitude: newLoc.latitude,
                  longitude: newLoc.longitude,
                  duration: duration,
                })
                .start();
            }
          }
        }, 300);
      } catch {}

      return () => {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
      };
    }, [coords, duration, props]);

    const getImageMakers = useCallback(() => {
      if (props?.marker === 'driver') {
        return Images.derviceCar;
      } else {
        return Images?.[props?.marker as string] || Images.derviceCar;
      }
    }, [props?.marker]);

    return (
      <MarkerAnimated
        ref={markerRef}
        coordinate={coords}
        anchor={{ x: 0.5, y: 0.5 }}
        title={'My Marker'}
        description={'My Marker'}
        {...props.markerProps}>
        {props.type === 'car' && (
          <Icon.CarMaker
            randomColor={(props?.index as number) ?? 1}
            width={40}
            height={150}
          />
        )}
        {props.type === 'bike' && (
          <Icon.DriverMakerRed
            randomColor={(props?.index as number) ?? 1}
            width={50}
            height={40}
          />
        )}
        {props.type === 'driver' && (
          <Image
            source={getImageMakers()}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        )}
      </MarkerAnimated>
    );
  },
);

export default MarkerBiker;
