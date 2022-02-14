import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';

const Nav = styled.nav`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
  font-weight: 500;
  font-size: 18px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #2a363b;
  &.active {
    color: #2196f3;
  }
`;

const Container = styled.div`
  /* background-color: #f8f2cc; */
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Layout = () => {
  return (
    <Container>
      <GlobalStyle />
      <Nav>
        {/* разметка линков */}
        <Link to="/">HOMEPAGE</Link>
        <Link to="/movies">MOVIES</Link>
      </Nav>
      <hr />
      {/* рэндер роутов */}
      <div>
        <Outlet />
      </div>

      <Toaster />
    </Container>
  );
};
