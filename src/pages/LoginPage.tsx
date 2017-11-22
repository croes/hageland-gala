import * as React from 'react';
import { EmailLogin } from '../components/EmailLogin';
import { FacebookLoginButton } from '../components/FacebookLoginButton';
import * as Button from 'react-bootstrap/lib/Button';
import * as Glyphicon from 'react-bootstrap/lib/Glyphicon';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

interface LoginPageState {
  showLoginForm: boolean;
  isLoading: boolean;
  user: firebase.User | null;
  loginError: firebase.auth.Error | null;
}

export class LoginPage extends React.Component<{}, LoginPageState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      showLoginForm: false,
      isLoading: true,
      user: null,
      loginError: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => { this.setState({...this.state, isLoading: false, user}); },
      (error) => { this.setState({...this.state, loginError: error}); }
      );
  }

  handleEmailLoginButtonClick = () => {
    this.setState({...this.state, showLoginForm: true});
  }

  handleLogoutLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.setState({...this.state, isLoading: true});
  }

  render() {
    const {isLoading, user, loginError} = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (loginError) {
      return (
          <div>
            <h1>Oops, er is een fout opgetreden!</h1>
            Error code: {loginError.code}
            Error message: {loginError.message}
          </div>
      );
    }
    if (user) {
      return (
        <div>
          <p>Je bent al ingelod als {user.displayName}</p>
          <Link to="/reservaties">Ga naar Mijn Reservaties</Link> of
          <a href="#" onClick={this.handleLogoutLinkClick}>meld je af.</a>
        </div>
      );
    }
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Login</h1>
        <FacebookLoginButton/>
        <Button bsSize="large" bsStyle="primary" block={true} onClick={this.handleEmailLoginButtonClick}>
          <Glyphicon glyph="envelope"/> Login met email en wachtwoord
        </Button>
        <br/>
        {this.state.showLoginForm && <EmailLogin/>}
      </div>
    );
  }

}