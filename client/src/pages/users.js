import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Layout } from '../components';
import Search from './search';
import { useLazyQuery, gql, ApolloProvider } from '@apollo/client';

/** TRACKS query to retrieve all tracks */
const USERS = gql`
  query getUsers($key: String!) {
    allUsers(name: $key) {
      id
      name
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Users = () => {
  const [getUsers, { loading, error, data }] = useLazyQuery(USERS)      
  return (
    <Layout grid>
                    
          <Search getResults={getUsers} loading={loading} error={error} data={data} />

    </Layout>
  );
};

export default Users;
