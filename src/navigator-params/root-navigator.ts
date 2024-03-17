import { AddressStackNavigatorParamList } from './address-stack-navigator';
import { AppRoutes } from './app-routes';

export type RootNavigatorParamList = AddressStackNavigatorParamList & {
  [AppRoutes.AUTH]?: undefined;
  [AppRoutes.APP]?: undefined;

  [AppRoutes.SELECT]: {
    title: string;
    isSearchable?: boolean;
    options: {
      label: string;
      value: string;
    }[];
  } & (
    | {
        value: string;
        onSelect(val: string): void;
        multiple?: false;
      }
    | {
        value: string[];
        onSelect(val: string[]): void;
        multiple: true;
      }
  );
};
