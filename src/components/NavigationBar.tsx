import * as React from 'react';
import * as NavBar from 'react-bootstrap/lib/Navbar';
import * as Nav from 'react-bootstrap/lib/Nav';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { UserNavItems } from './UserNavItems';

export class NavigationBar extends React.Component<{}, {}> {
  render() {
    return (
      <NavBar>
        <NavBar.Header>
          <NavBar.Brand>
            <Link to="/">Galabal Ons Hageland</Link>
          </NavBar.Brand>
          <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Collapse>
          <Nav>
            <LinkContainer to="/welkom"><NavItem>Welkom</NavItem></LinkContainer>
            <LinkContainer to="/diner"><NavItem>Diner</NavItem></LinkContainer>
            <LinkContainer to="/avondfeest"><NavItem>Avondfeest</NavItem></LinkContainer>
            <LinkContainer to="/locatie"><NavItem>Locatie</NavItem></LinkContainer>
            <LinkContainer to="/bus"><NavItem>Bus</NavItem></LinkContainer>
            <UserNavItems />
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    );
  }
}