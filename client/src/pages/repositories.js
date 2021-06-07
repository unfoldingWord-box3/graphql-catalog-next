import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import RepoCard from '../containers/repo-card';
import styled from '@emotion/styled';
import { Alert } from '../components/alert';
import { Formik, Field, Form } from 'formik';

const GridContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: null,
  width: '100%',
}));

const REPOS = gql`
  query getReposByName($key: String!) {
    reposByName(name: $key) {
      id
      name
      title
      description
      originalUrl
      sshUrl
      htmlUrl
      cloneUrl
      avatarUrl
      language
      books
      repoLanguages {
        language
      }
      repoSubjects {
        name
      }
    }
  }
`;

const Releases = () => {
  const [getRepos, { error, data }] = useLazyQuery(REPOS)
  const repos = data && data.reposByName ? data.reposByName : null;

  console.log({ data, repos })

  return (
    <>
      <h1>Search repositories by name:</h1>
      <br/>

      <Formik
        initialValues={{ repoName: null }}
        onSubmit={async (values) => {
          getRepos({ variables: { key: values.repoName } })
        }}
      >
        <Form>
          <label htmlFor="repoName">Repository Name:</label>
          <Field id="repoName" name="repoName" placeholder="" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      {error ? <Alert>{error.message}</Alert> : null}

      <GridContainer>
        {repos && repos.length ? repos.map((repo, i) => (
            <RepoCard
              key={i + repo.id}
              repo={repo}
            />
          ))
          : <Alert>"No matching repositories found."</Alert>
        }
      </GridContainer>
    </>
  );
};

export default Releases;
