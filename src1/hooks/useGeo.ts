import axios, { CancelTokenSource } from 'axios';
import { useCallback, useRef } from 'react';
import Config from 'react-native-config';
import { API_ENDPOINT } from 'utils';

export const useGeo = () => {
  const onNameByLatLng = useCallback(
    ({ latitude, longitude }, callback?: (a: any) => void) => {
      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            latlng: `${latitude},${longitude}`,
            key: Config.GOOGLE_PLACES_KEY,
          },
        })
        .then(({ data }) => {
          const formattedAddress = data.results[0]?.formatted_address;
          console.log('Tom log  => formattedAddress', formattedAddress);
          callback?.(formattedAddress?.toString());
        });
      // axios
      //   .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.GEO_CODE}`, {
      //     params: {
      //       api_key: RSAPI_KEY,
      //       latlng: `${latitude},${longitude}`,
      //     },
      //   })
      //   .then(res => {
      //       console.log('Tom log  => res onNameByLatLng: ', JSON.stringify(res?.data?.results?.[0]?.formatted_address));
      //
      //     callback?.(res?.data?.results?.[0]?.formatted_address);
      //   })
      //   .catch(err => console.log('ERROR---', err));
    },
    [],
  );

  const searchDetail = useCallback(
    ({ place_id, options = {} }, callback?: (a: any) => void) => {
      axios
        .get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            placeid: place_id,
            key: Config.GOOGLE_PLACES_KEY,
            ...options,
          },
        })
        .then(({ data }) => {
          callback?.(data);
        });
    },
    [],
  );

  const searchAutoComplete = useCallback(
    ({ input, options }, callback?: (a: any) => void) => {
      axios
        .get(`${API_ENDPOINT.MAP.AUTOCOMPLEATE}`, {
          params: {
            input,
            key: Config.GOOGLE_PLACES_KEY,
            radius: 10,
            language: 'vi',
            ...options,
          },
        })
        .then(({ data }) => {
          callback?.(data.predictions);
        });
    },
    [],
  );

  let cancelToken = useRef<CancelTokenSource | null>(null);

  const searchDirection = useCallback(
    (
      data: {
        origin: string;
        destination: string;
        alternatives?: boolean;
        vehicle?: 'car' | 'bike' | 'taxi' | 'truck';
      },
      callback?: (a: any) => void,
    ) => {
      if (cancelToken.current) {
        // If there is a previous request, cancel it
        cancelToken.current.cancel('New request made');
      }

      cancelToken.current = axios.CancelToken.source();
      axios
        .get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            ...data,
            key: Config.GOOGLE_PLACES_KEY,
            mode: data?.vehicle,
          },
          cancelToken: cancelToken.current.token, // Pass the cancel token to the request
        })
        .then(res => {
          callback?.(res);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // Request was canceled
          } else {
            // Handle other errors
          }
        });
      // axios
      //   .get(`${GOONG_URI}/${API_ENDPOINT.GOONG.DIRECTION}`, {
      //     params: { ...data, api_key: RSAPI_KEY },
      //     cancelToken: cancelToken.current.token, // Pass the cancel token to the request
      //   })
      //   .then(res => {
      //     console.log('Tom log  => res searchDirection: ', res);
      //     callback?.(res);
      //   })
      //   .catch(error => {
      //     if (axios.isCancel(error)) {
      //       // Request was canceled
      //       console.log('Request canceled:', error.message);
      //     } else {
      //       // Handle other errors
      //       console.log('Error:', error.message);
      //     }
      //   });
    },
    [],
  );

  const searchDistanceMatrix = useCallback(
    (
      {
        vehicle = 'bike',
        ...data
      }: {
        origin: string;
        destination: string;
        alternatives?: boolean;
        vehicle?: 'car' | 'bike' | 'taxi' | 'truck';
      },
      callback?: (a: any) => void,
    ) => {
      axios
        .get(`${Config.GOONG_URI}/${API_ENDPOINT.GOONG.DISTANCE_MATRIX}`, {
          params: { ...data, vehicle, api_key: Config.RSAPI_KEY },
        })
        .then(res => {
          callback?.(res);
        })
        .catch(error => {
          console.log('error', error);
        });
    },
    [],
  );

  return {
    onNameByLatLng,
    searchDetail,
    searchAutoComplete,
    searchDirection,
    searchDistanceMatrix,
  };
};
