import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://develop.door43.org:4000',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);
