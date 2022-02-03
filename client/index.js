import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { webSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache, ApolloClient } from '@apollo/client';

//http link for the site; queries and mutations
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/'
});

//WebSocket Link for messages
const wsLink = new webSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true,
        lazy: true,
        inactivityTimeout: 30000,
    }
})

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//ApolloProvider connects to our GraphQL Server