import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export function useAsyncStorage<T = {}>(key: string, initialValue?: T): [T | undefined, (val: T) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>();

  const getStoredItem = useCallback(async (k: string, initValue: T) => {
    try {
      const item = await AsyncStorage.getItem(k);
      const value = item ? JSON.parse(item) : initValue;
      setStoredValue(value as T);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getStoredItem(key, initialValue as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = useCallback(
    async (value: T) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore as T);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}
