import React, { useState } from 'react';
import { Layout, QueryResult } from '../components';
import Search from './search';
import { useLazyQuery, gql } from '@apollo/client';
import RepoCard from '../containers/repo-card';
import UserCard from '../containers/user-card';
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
    userSearch(name: $key) {
      id
      fullName
      login
      repos {
        id
        name
        description
        avatarUrl
        htmlUrl
      }
    }
  }
`;

const Users = () => {
  const [repos, setRepos] = useState(null)
  const [user, setUser] = useState(null)
  const [getUsers, { loading, error, data }] = useLazyQuery(USERS, {
    onCompleted: (data) => { console.log("resultado", data)}
  })
  
  return (
    <Layout>
      <Search 
        getResults={getUsers}
        searchKey="login"
        data={data}
        getSelected={(user) => {
          console.log("user", user)
          setRepos(user.repos)
          setUser(user)
        }}
      />

      {user ? <UserCard user={user}></UserCard> : null}

      <GridContainer>

          {repos && repos.length ? repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo}/>
            )) : (user ? "No matching repositories found." : null)}

      </GridContainer>
    </Layout>
  );
};

export default Users;
