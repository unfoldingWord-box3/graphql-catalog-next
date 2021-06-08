import React, { useState } from 'react';
import Search from './search';
import { useLazyQuery, gql } from '@apollo/client';
import RepoCard from '../containers/repo-card';
import UserCard from '../containers/user-card';
import styled from '@emotion/styled';
import { Alert } from '../components/alert';
import TeamsCard from '../containers/teams-card'
import MembersCard from '../containers/members-card'

const ORGS = gql`
  query getOrgs($key: String!) {
    orgsSearch(name: $key) {
      id
      name
      avatarUrl
      members {
        avatarUrl
        name
        id
      }
      teams{
        id
        name
        teamRepos{
          name
          id
        }
        members {
          avatarUrl
          name
          id
        }
      }
      repos{
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

      <MainContainer>

        <OrgContainer>

          {org ? <UserCard user={org}></UserCard> : null}
          <GridContainer>

            {repos && repos.length ? repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo}/>
              )) : (org ? <Alert>"No matching repositories found."</Alert> : null)}

          </GridContainer>

        </OrgContainer>

        {org ? <OrgDetailsContainer><TeamsCard org={org}/><MembersCard org={org}></MembersCard></OrgDetailsContainer>: null}

      </MainContainer>
    </>
  );
};

export default Organizations;


const MainContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
})

const OrgDetailsContainer = styled.div({

})

const OrgContainer = styled.div({

})

const GridContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: null,
  width: '100%',
}));
