import * as React from 'react';
import * as firebase from 'firebase';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
import { b64DecodeUnicode } from '../util';

interface UserDisplayState {
  user: firebase.User | null;
  isLoading: boolean;
  isAdmin: boolean;
}

export class UserNavItems extends React.Component<{}, UserDisplayState> {

  constructor(props: {}) {
    super(props);
    this.state = {user: null, isLoading: true, isAdmin: false};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        this.setState({user, isLoading: false, isAdmin: false});
        return;
      }
      user.getIdToken().then(idToken => {
        const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
        const isAdmin = !!payload.admin;
        this.setState({...this.state, user, isLoading: false, isAdmin});
      });
    });
  }

  render() {
    const {user, isLoading, isAdmin} = this.state;
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
    ].concat(isAdmin ? [(<LinkContainer to={'/admin'} key="navAdmin"><NavItem>Admin</NavItem></LinkContainer>)] : []);
  }

}