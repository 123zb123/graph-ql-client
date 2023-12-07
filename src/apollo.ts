import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import Cookies from 'js-cookie';

const removeTypenameLink = removeTypenameFromVariables();
const BASE_URI = import.meta.env.VITE_SERVER_HOST || "http://localhost:4000";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: BASE_URI,
});
const linka = from([removeTypenameLink, httpLink]);

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = Cookies.get('token');
  operation.setContext({
    headers: {
        Authorization : token , // Add the token as 'Bearer <token>'
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(linka), 
  cache: new InMemoryCache(),
});
export default client;