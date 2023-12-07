import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from "./state/store.ts"
import { ApolloProvider } from '@apollo/client'
import client from './apollo.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)
