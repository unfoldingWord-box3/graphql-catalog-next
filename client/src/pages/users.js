import React, { useState } from 'react';
import Search from './search';
import { useLazyQuery, gql } from '@apollo/client';
import RepoCard from '../containers/repo-card';
import UserCard from '../containers/user-card';
import styled from '@emotion/styled';
import { Alert } from '../components/alert';

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
      name
      email
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
  const [getUsers, { error, data }] = useLazyQuery(
    USERS, 
    {
      onCompleted: (data) => { 
        console.log("resultado", data)
        console.log(document.activeElement)
        document.dispatchEvent(new KeyboardEvent('keypdown', {'key': 'H'}));
      }
    }
  )

  if(error){
    console.error( error)
  }
  
  return (
    <>
      <Search 
        getResults={getUsers}
        searchKey="name"
        data={data}
        getSelected={(user) => {
          console.log("user", user)
          setRepos(user.repos)
          setUser(user)
        }}
      />

      {error ? <Alert>{error.message}</Alert> : null}

      {user ? <UserCard user={user}></UserCard> : null}

      <GridContainer>
          
          {repos && repos.length ? repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo}/>
            )) : (user ? <Alert>"No matching repositories found."</Alert> : null)}

      </GridContainer>
    </>
  );
};

export default Users;
