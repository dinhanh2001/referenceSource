import { createContext } from 'react';

type SearchContextProps = {
  search?: string;
};

export const SearchContext = createContext<SearchContextProps>({});
