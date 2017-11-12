import * as React from 'react';
import * as firebase from 'firebase';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

interface UserDisplayState {
  user: firebase.User | null;
  isLoading: boolean;
}

export class UserNavItems extends React.Component<{}, UserDisplayState> {

  constructor(props: {}) {
    super(props);
    this.state = {user: null, isLoading: true};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({...this.state, user, isLoading: false});
    });
  }

  render() {
    const {user, isLoading} = this.state;
    if (isLoading) {
      return null;
    }
    if (!user) {
      return [
        <LinkContainer to="/login" key="navLogin"><NavItem>Aanmelden</NavItem></LinkContainer>,
        <LinkContainer to="/registreer" key="navRegister"><NavItem>Registreren</NavItem></LinkContainer>
      ];
    }
    return [
      <LinkContainer to="/reservaties" key="navReservation"><NavItem>Mijn reservaties</NavItem></LinkContainer>,
      <NavItem onSelect={() => firebase.auth().signOut()} key="navLogout">Afmelden</NavItem>
    ];
  }

}