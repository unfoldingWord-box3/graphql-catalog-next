import React, { useState } from 'react';
import { Layout, QueryResult } from '../components';
import Search from './search';
import { useLazyQuery, gql } from '@apollo/client';
import RepoCard from '../containers/repo-card';
import styled from '@emotion/styled';

const GridContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: null,
  width: '100%',
}));

/** TRACKS query to retrieve all tracks */
const USERS = gql`
  query getUsers($key: String!) {
    allUsers(name: $key) {
      id
      name
      repos {
        id
        name
        description
        avatar_url
        html_url
      }
    }
  }
`;

const Users = () => {
  const [repos, setRepos] = useState(null)
  const [getUsers, { loading, error, data }] = useLazyQuery(USERS)

  console.log({ loading, error, data })

  return (
    <Layout>
      <Search 
        getResults={getUsers}
        data={data}
        getSelected={({ repos }) => setRepos(repos)}
      />
      <GridContainer>
        <QueryResult
          loading={loading}
          error={error}
          data={repos}
        >
          {repos && repos.length ? repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo}/>
        )) : null}
        </QueryResult>
      </GridContainer>
    </Layout>
  );
};

export default Users;
