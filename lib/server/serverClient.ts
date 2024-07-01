import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const serverClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // Replace with your GrapQL endpoint
    headers: {
      Authorization: `APIKey ${process.env.GRAPHQL_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default serverClient;
