import React from 'react';
import Search from './search';
import { useLazyQuery, gql } from '@apollo/client';
import ReleaseCard from '../containers/release-card';
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

const USERS = gql`
  query getUsers($key: String!) {
    userSearch(name: $key) {
      id
      fullName
      name
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

const CATALOGS = gql`
  query catalogsByOwner($key: String!) {
    catalogsByOwner(userName: $key) {
      stage
      branchOrTag
      releaseDateUnix
      repo {
        id
        name
        description
        repoLanguages {
          language
        }
        owner {
          name
          fullName
          email
          avatarUrl
        }
      }
      release {
        title
        target
        note
        publisher {
          name
        }
        originalAuthor {
          name
        }
      }
    }
  }
`;

const Releases = () => {
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
  const [getUserCatalogs, { error: catalogError, data: catalogData }] = useLazyQuery(CATALOGS)

  const releases = catalogData && catalogData?.catalogsByOwner ? catalogData.catalogsByOwner.filter(({ release }) => release) : []

  return (
    <>
      <h1>Search Releases by Owner:</h1>
      <br/>

      <Search
        getResults={getUsers}
        searchKey="name"
        data={data}
        getSelected={(user) => {
          getUserCatalogs({ variables: { key: user.name } })
        }}
      />

      {error || catalogError ? <Alert>{error.message || catalogError.message}</Alert> : null}

      <GridContainer>
        {releases && releases.length ? releases.map((catalog, i) => (
            <ReleaseCard
              key={i + catalog.repo.id}
              repo={catalog.repo}
              release={catalog.release}
              branchOrTag={catalog.branchOrTag}
              releaseDateUnix={catalog.releaseDateUnix}
            />
          ))
          : <Alert>"No matching repositories found."</Alert>
        }
      </GridContainer>
    </>
  );
};

export default Releases;
