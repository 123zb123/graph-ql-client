import ReactDOM from 'react-dom/client'
// import './index.css'
// import { Provider } from 'react-redux'
// import { store } from "./state/store.ts"
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { split, HttpLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';


// const httpLink = new HttpLink({
//     uri: 'http://localhost:4000/graphql'
//   });
//   const wsLink = new GraphQLWsLink(createClient({
//     url: 'ws://localhost:4000/subscriptions',
//   }));
  
//   const splitLink = split(
//     ({ query }) => {
//       const definition = getMainDefinition(query);
//       return (
//         definition.kind === 'OperationDefinition' &&
//         definition.operation === 'subscription'
//       );
//     },
//     wsLink,
//     httpLink,
//   );
  
// const client = new ApolloClient({
//     link:splitLink,
//     cache: new InMemoryCache(),
//   });


// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <ApolloProvider client={client}>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </ApolloProvider>
// )



import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import App from "./App";

//websocketsוהן ב httpכדי לאפשר תקשורת הן ב
//לצורך כך ניצור שני חיבורים - אחד לכל פרוטוקול
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

//ניצור חיבור חכם המאחד את שניהם
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//אותו נעביר לאובייקט הלקוח לצרוך האזנה לכל סוגי הבקשרות
const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')!).render(

    <>

      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </>)
 
