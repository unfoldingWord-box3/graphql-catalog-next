import React, { useState } from 'react';
import { Layout } from '../components';
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
const ORGS = gql`
  query getOrgs($key: String!) {
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

const Organizations = () => {
  const [repos, setRepos] = useState(null)
  const [org, setOrg] = useState(null)
  const [getOrgs, { error, data }] = useLazyQuery(ORGS, {
    onCompleted: (data) => { 
      console.log("result", data)
    }
  })

  if(error){
    console.error( error)
  }

  return (
    <>
      <Search 
        getResults={getOrgs}
        searchKey="name"
        data={data}
        getSelected={(org) => {
          console.log("org", org)
          setRepos(org.repos)
          setOrg(org)
        }}
      />

      {error ? <Alert>{error.message}</Alert> : null}

      {org ? <UserCard user={org}></UserCard> : null}

      <GridContainer>
          
          {repos && repos.length ? repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo}/>
            )) : (org ? <Alert>"No matching repositories found."</Alert> : null)}

      </GridContainer>
    </>
  );
};

export default Organizations;
