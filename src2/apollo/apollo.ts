import { ApolloClient, InMemoryCache, HttpLink, from, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { ACCESS_TOKEN } from '../constants';

const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/graphql`,
  includeExtensions: true,
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(`${process.env.API_URL.replace(/http|https/, 'ws')}/graphql`, {
    connectionParams: async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);

      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  }),
);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from firebase if it exists
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  from([authLink, httpLink]),
);

const client = new ApolloClient({
  name: 'mobile',
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
});

export { client };
