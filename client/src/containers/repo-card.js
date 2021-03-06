import React from 'react';
import styled from '@emotion/styled';
import { colors, mq } from '../styles';

const RepoCard = ({ repo }) => {
  const { name, description, avatarUrl, htmlUrl } = repo;

  return (
    <CardContainer href={`https://${htmlUrl}`} target="_blank">
      <CardContent>
        { <CardImageContainer>
          <CardImage src={avatarUrl ? `https://${avatarUrl}` : `https://ui-avatars.com/api/?name=${name}`} alt={name} />
        </CardImageContainer> }
        <CardBody>
          <CardTitle>{name || ''}</CardTitle>
          <CardFooter>
            <AuthorAndTrack>
              <AuthorName>{description}</AuthorName>
            </AuthorAndTrack>
          </CardFooter>
        </CardBody>
      </CardContent>
    </CardContainer>
  );
};

export default RepoCard;

/** Track Card styled components */
const CardContainer = styled.a({
  borderRadius: 6,
  textDecoration: 'none',
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
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
  overflow: 'hidden',
  position: 'relative',
  ':hover': {
    backgroundColor: colors.blue.lightest,
  },
  cursor: 'pointer',
  zIndex: 1,
});

const CardContent = styled.div({
  display: 'grid',

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

const CardImageContainer = styled.div({
  position: 'relative',
  paddingTop:18,
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const CardImage = styled.img({
  width: '100%',
});

const CardBody = styled.div({
  padding: 18,


  color: colors.textSecondary,

});

const CardFooter = styled.div({

});

const AuthorAndTrack = styled.div({

});

const AuthorName = styled.div({
  lineHeight: '1em',
  fontSize: '1.1em',
});

