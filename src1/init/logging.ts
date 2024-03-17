import { LogBox } from 'react-native';

const IGNORED_LOGS = [
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
  'source.uri should not be an empty string',
  'You are not currently signed in to Expo on your development machine',
];

LogBox.ignoreLogs(IGNORED_LOGS);

if (__DEV__) {
  const withoutIgnored =
    (logger: any) =>
    (...args: any) => {
      const output = args.join(' ');

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}
