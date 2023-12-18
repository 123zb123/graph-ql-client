import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import Cookies from 'js-cookie';

const removeTypenameLink = removeTypenameFromVariables();
const BASE_URI = import.meta.env.VITE_BASE_URL

// Create an HTTP link
const httpLink = createHttpLink({
  uri: BASE_URI,
});
const linka = from([removeTypenameLink, httpLink]);

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get('token');
  console.log(token);

  operation.setContext({
    headers: {
      Authorization: token,
    },
  });
  return forward(operation);
});
const apiUrl = import.meta.env.VITE_BASE_URL;

const client = new ApolloClient({
  uri: apiUrl,
  link: authMiddleware.concat(linka),
  cache: new InMemoryCache(),
});
export default client;