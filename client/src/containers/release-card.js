import React from 'react';
import styled from '@emotion/styled';
import { colors, mq } from '../styles';

const ReleaseCard = ({ branchOrTag, releaseDateUnix, repo, release }) => {
  const {
    title,
    note,
    target: branch,
    publisher: {
      name: publisherName,
    }
  } = release;
  const { name: repoName, description: repoDescription, htmlUrl } = repo;
  const dateObject = new Date(releaseDateUnix * 1000)

  return (
    <CardContainer href={htmlUrl || null} target="_blank">
      <CardContent>
        <CardBody>
          <CardTitle>{repoName || ''}</CardTitle>
          <CardTitle>{repoDescription || ''}</CardTitle>

          <table style={{ width:"100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Version</th>
                <th style={{ textAlign: 'left' }}>Tag</th>
                <th style={{ textAlign: 'left' }}>Branch</th>
                <th style={{ textAlign: 'left' }}>Publisher</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{title}</td>
                <td>{branchOrTag}</td>
                <td>{branch}</td>
                <td>{publisherName}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <div style={{ fontWeight: 'bold' }}>Note:</div>
          <p>{note}</p>
          <CardFooter>
            <AuthorAndTrack>
              <AuthorName>Release Date: {dateObject.toLocaleString()}</AuthorName>
            </AuthorAndTrack>
          </CardFooter>
        </CardBody>
      </CardContent>
    </CardContainer>
  );
};

export default ReleaseCard;

/** Track Card styled components */
const CardContainer = styled.a({
  wordWrap: 'break-word',
  borderRadius: 6,
  textDecoration: 'none',
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  boxSizing: 'border-box',
  backgroundPosition: 'center',
  padding:10,
  [mq[0]]: {
    width: '90%',
  },
  [mq[1]]: {
    width: '47%',
  },
  [mq[2]]: {
    width: '31%',
  },

  margin: 10,
  overflowY: 'auto',
  position: 'relative',
  ':hover': {
    backgroundColor: colors.blue.lightest,
  },
  cursor: 'pointer',
  zIndex: 1,
});

const CardContent = styled.div({

});

const CardTitle = styled.h3({
  textAlign: 'left',
  fontSize: '1.4em',
  lineHeight: '1em',
  marginBottom:15,
  fontWeight: 700,
  color: colors.text,
  flex: 0,
});

const CardBody = styled.div({
  padding: 18,
  color: colors.textSecondary,
});

const CardFooter = styled.div({
  display: 'flex',
  flexDirection: 'Row',
});

const AuthorAndTrack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AuthorName = styled.div({
  lineHeight: '1em',
  fontSize: '1.1em',
});

