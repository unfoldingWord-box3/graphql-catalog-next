import React from 'react';
import { colors, widths } from '../styles';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

/**
 * Header renders the top navigation
 * for this particular tutorial level, it only holds the home button
 */
const Header = ({ children }) => {
  return (
    <HeaderBar>
      <Container>
        <HomeButtonContainer>
          <HomeLink to="/">
            <HomeButton>
              <Title>
                <h3>Catalog Next</h3>
                <div>Powered by Apollo</div>
              </Title>
            </HomeButton>
          </HomeLink>
        </HomeButtonContainer>
        <LinksContainer>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/organizations">Organizations</NavLink>
          <NavLink to="/repositories">Repositories</NavLink>
        </LinksContainer>
        {children}
      </Container>
    </HeaderBar>
  );
};

export default Header;

/** Header styled components */
const HeaderBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `solid 1px ${colors.blue.light}`,
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  padding: '5px 30px',
  minHeight: 80,
  backgroundColor: 'white',
});

const Container = styled.div({
  width: `${widths.regularPageWidth}px`,
  display: "grid",
  gridTemplateColumns: "auto 1fr",
});

const HomeLink = styled(Link)({
  textDecoration: 'none',
});

const HomeButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
});

const HomeButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  color: colors.accent,
  alignItems: 'center',
  ':hover': {
    color: colors.blue.base,
  },
});

const LinksContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const NavLink = styled(Link)({
  textDecoration: 'none',
  color: colors.blue.dark,
  marginLeft:20,
  fontWeight: 400,
  ':hover': {
    color: colors.blue.base,
  },
})

const Title = styled.div({
  display: 'flex',
  flexDirection: 'column',
  h3: {
    lineHeight: '1em',
    marginBottom: 0,
  },
  div: {
    fontSize: '0.9em',
    lineHeight: '0.8em',
    paddingLeft: 2,
  },
});
