import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const API_URL = apiUrl || "http://localhost:1337";
// console.log(API_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
});

export default client;
