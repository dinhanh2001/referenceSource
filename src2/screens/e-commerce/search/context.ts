import { createContext } from 'react';

import { FormSearchCommerce } from './filter';

type FilterContextProps = {
  filter?: FormSearchCommerce;
  setFilter?: (val: FormSearchCommerce) => void;
};

export const FilterContext = createContext<FilterContextProps>({});
